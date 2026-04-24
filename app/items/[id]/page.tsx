"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, Clock, MapPin, Plug, Star, Users, 
  Volume2, Wifi, Heart, Loader2, Sparkles, Coffee, 
  Badge
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/lib/firebase";
import { 
  doc, setDoc, deleteDoc, onSnapshot, getDoc, 
  collection, query, where, limit, getDocs 
} from "firebase/firestore";
import { toast } from "react-hot-toast";

interface Spot {
  id: string;
  name: string;
  image: string;
  area: string;
  city: string;
  wifi: string;
  noise: string;
  seating: number;
  outlets: string;
  hours: string;
  price: string;
  rating: number;
  tagline: string;
  description: string;
  amenities: string[];
}

const SpotDetails = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { user } = useAuth();
  
  const [spot, setSpot] = useState<Spot | null>(null);
  const [relatedSpots, setRelatedSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);


  useEffect(() => {
    if (!id) return;

    const fetchFullData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "spots", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const mainSpot = { id: docSnap.id, ...docSnap.data() } as Spot;
          setSpot(mainSpot);

          const relatedQuery = query(
            collection(db, "spots"),
            where("city", "==", mainSpot.city),
            limit(4)
          );
          const relatedSnap = await getDocs(relatedQuery);
          const relatedData = relatedSnap.docs
            .map(d => ({ id: d.id, ...d.data() } as Spot))
            .filter(d => d.id !== id); 
          setRelatedSpots(relatedData);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to load details");
      } finally {
        setLoading(false);
      }
    };

    fetchFullData();
  }, [id]);

  useEffect(() => {
    if (!user || !id) return;
    const favDocRef = doc(db, "users", user.uid, "favorites", id);
    const unsubscribe = onSnapshot(favDocRef, (doc) => {
      setIsFavorite(doc.exists());
    });
    return () => unsubscribe();
  }, [user, id]);

  const toggleFavorite = async () => {
    if (!user) {
      toast.error("Please login to save favorites ☕");
      router.push("/login");
      return;
    }

    if (!spot) {
      toast.error("Spot data not loaded");
      return;
    }

    try {
      setActionLoading(true);
      const favDocRef = doc(db, "users", user.uid, "favorites", id);

      if (isFavorite) {
        await deleteDoc(favDocRef);
        toast.success("Removed from favorites");
      } else {
        await setDoc(favDocRef, {
          spotId: id,
          name: spot.name,
          image: spot.image,
          area: spot.area,
          city: spot.city,
          savedAt: new Date().toISOString(),
        });
        toast.success("Saved to favorites!");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <Loader2 className="h-10 w-10 animate-spin text-amber-600" />
        <p className="mt-4 text-slate-500 font-medium italic">Preparing your workspace...</p>
      </div>
    );
  }

  if (!spot) {
    return (
      <div className="container py-24 text-center mx-auto">
        <h1 className="font-serif text-3xl font-bold">Spot not found</h1>
        <Button asChild className="mt-6 bg-amber-600">
          <Link href="/items">Back to explore</Link>
        </Button>
      </div>
    );
  }

  const stats = [
    { icon: Wifi, label: "Wi-Fi Speed", value: spot.wifi },
    { icon: Volume2, label: "Noise Level", value: spot.noise },
    { icon: Users, label: "Capacity", value: `${spot.seating} seats` },
    { icon: Plug, label: "Power Outlets", value: spot.outlets },
    { icon: Clock, label: "Opening Hours", value: spot.hours },
  ];

  return (
    <main className="bg-background min-h-screen pb-20">
      {/* Top Nav */}
      <div className="container mx-auto px-4 pt-8">
        <Button variant="ghost" size="sm" asChild className="hover:text-amber-600">
          <Link href="/items"><ArrowLeft className="h-4 w-4 mr-1.5" /> Back to spots</Link>
        </Button>
      </div>

      {/* Hero Header */}
      <section className="container mx-auto px-4 pt-6">
        <div className="relative aspect-21/9 rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100">
          <Image src={spot.image} alt={spot.name} sizes="700" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent md:hidden" />
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 grid lg:grid-cols-3 gap-12">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-3 text-amber-600 font-bold text-xs uppercase tracking-widest">
              <Sparkles className="h-4 w-4" /> Recommended Spot
            </div>
            <h1 className="mt-3 font-serif text-4xl md:text-6xl font-bold text-slate-900">{spot.name}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                <MapPin className="h-4 w-4 text-amber-500" /> {spot.area}, {spot.city}
              </span>
              <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 border-none px-3 py-1">
                {spot.price}
              </Badge>
              <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-bold">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" /> {spot.rating}
              </div>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-xl text-slate-500 italic leading-relaxed font-serif">
              &quot;{spot.tagline}&quot;
            </p>
            <p className="mt-6 text-slate-600 leading-relaxed text-lg">
              {spot.description}
            </p>
          </div>

          {/* Specifications/Amenities Section */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Coffee className="h-6 w-6 text-amber-600" /> Amenities & Specs
            </h2>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {spot.amenities?.map((a: string) => (
                <div key={a} className="flex items-center gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 font-medium text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> {a}
                </div>
              ))}
            </div>
          </div>

          {/* Related Items Section */}
          {relatedSpots.length > 0 && (
            <div className="pt-10 border-t border-slate-100">
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-6">More spots in {spot.city}</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {relatedSpots.map((rs) => (
                  <Link key={rs.id} href={`/items/${rs.id}`} className="group flex gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-all">
                    <div className="relative h-20 w-20 shrink-0 rounded-xl overflow-hidden">
                      <Image src={rs.image} alt={rs.name} fill sizes="700" className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{rs.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{rs.area}</p>
                      <div className="mt-2 flex items-center gap-2 text-[10px] font-bold uppercase text-amber-600">
                        {rs.wifi} WiFi • {rs.noise}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Card */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="rounded-4xl bg-white border border-slate-100 shadow-xl p-8">
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-6 border-b border-slate-50 pb-4">Work Readiness</h3>
            <ul className="space-y-6">
              {stats.map((s) => (
                <li key={s.label} className="flex items-center gap-4">
                  <span className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold">{s.label}</div>
                    <div className="text-sm font-bold text-slate-700">{s.value}</div>
                  </div>
                </li>
              ))}
            </ul>

            <Button 
              onClick={toggleFavorite}
              disabled={actionLoading}
              className={`w-full mt-8 h-14 rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg ${
                isFavorite 
                ? "bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 shadow-rose-100" 
                : "bg-amber-600 text-white hover:bg-amber-700 shadow-amber-100"
              }`}
            >
              {actionLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : isFavorite ? <><Heart className="h-5 w-5 fill-current" /> Favorited</> : <><Heart className="h-5 w-5" /> Save to Favourites</>}
            </Button>
            {!user && <p className="text-[10px] text-center mt-4 text-slate-400 font-medium italic">Login required to save this spot</p>}
          </div>
        </aside>
      </section>
    </main>
  );
};

export default SpotDetails;