"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Coffee, MapPin, Plus, Trash2, Loader2, Wifi, Clock, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/lib/firebase";
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  deleteDoc,
  orderBy 
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import ProtectedRoute from "../../../components/ProtectedRoute";

// Types
type Listing = {
  id: string;
  name: string;
  city: string;
  area: string;
  tagline: string;
  wifi: string;
  hours: string;
  image?: string;
  ownerId?: string;
};

type Favorite = {
  id: string; 
  name: string;
  image: string;
  area: string;
  city: string;
  savedAt: string;
};

const MyAccount = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!user) return;

    // ১. Shared Spots Fetching
    const qListings = query(collection(db, "spots"), where("ownerId", "==", user.uid));
    const unsubListings = onSnapshot(qListings, (snapshot) => {
      setListings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Listing[]);
    });

    // ২. Favorites Fetching (Sub-collection logic)
    const favRef = collection(db, "users", user.uid, "favorites");
    const qFavs = query(favRef, orderBy("savedAt", "desc"));
    
    const unsubFavs = onSnapshot(qFavs, (snapshot) => {
      setFavorites(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Favorite[]);
      setFetching(false);
    }, (error) => {
      console.error(error);
      setFetching(false);
    });

    return () => {
      unsubListings();
      unsubFavs();
    };
  }, [user]);

  // Shared Spot Delete
  const handleDeleteListing = async (id: string) => {
    if (!confirm("Remove this spot from the platform?")) return;
    try {
      await deleteDoc(doc(db, "spots", id));
      toast.success("Spot deleted");
    } catch (error) { toast.error("Failed to delete"); }
  };

  // Favorite Remove
  const handleRemoveFavorite = async (id: string) => {
    try {
      await deleteDoc(doc(db, "users", user!.uid, "favorites", id));
      toast.success("Removed from favorites");
    } catch (error) { toast.error("Failed to remove"); }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-end justify-between gap-4 flex-wrap animate-in fade-in slide-in-from-bottom-4 duration-700 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-amber-600 font-bold">Manage</span>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl font-bold text-slate-900">Cafes you&apos;ve shared</h1>
            <p className="mt-2 text-slate-500 text-lg">Manage your contributed spots.</p>
          </div>
          <Button asChild className="bg-amber-600 text-white hover:bg-amber-700 shadow-md shadow-amber-200 rounded-xl px-6 h-12">
            <Link href="/items/add"><Plus className="h-4 w-4 mr-1.5" /> Add new spot</Link>
          </Button>
        </div>

        {listings.length === 0 ? (
          <div className="mt-12 rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-slate-50/50 p-16 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <Coffee className="h-8 w-8" />
            </div>
            <h2 className="mt-6 font-serif text-2xl font-bold text-slate-900">No shared spots yet</h2>
            <Button asChild className="mt-8 bg-amber-600 text-white hover:bg-amber-700 h-12 px-8 rounded-xl">
              <Link href="/items/add">Add your first spot</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((l) => (
              <div 
                key={l.id} 
                className="group overflow-hidden rounded-4xl bg-white border border-slate-100 shadow-soft transition-all duration-300 hover:shadow-cozy hover:-translate-y-1"
              >
                {/* Image Section */}
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={l.image || "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000"} 
                    alt={l.name}
                    fill
                    sizes="600"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      onClick={() => handleDeleteListing(l.id)}
                      className="h-9 w-9 shadow-lg opacity-0 group-hover:opacity-100 
                      absolute top-3 right-3 p-2 bg-white/90 text-rose-600 rounded-full hover:bg-rose-600 hover:text-white transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-800">
                      {l.city}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-xl font-bold text-slate-900">{l.name}</h3>
                  </div>
                  
                  <div className="flex items-center gap-1 text-slate-500 mb-4">
                    <MapPin className="h-3 w-3" />
                    <span className="text-xs">{l.area || "Area unset"}</span>
                  </div>

                  <p className="text-slate-600 text-sm italic mb-4 line-clamp-1">
                    &quot;{l.tagline}&quot;
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-1.5">
                      <Wifi className="h-3.5 w-3.5 text-amber-600" />
                      <span className="text-[11px] font-medium text-slate-600">{l.wifi || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-amber-600" />
                      <span className="text-[11px] font-medium text-slate-600">{l.hours || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* --- Favorites Section --- */}
        <div>
          <div className="mb-10 mt-20">
            <span className="text-xs uppercase tracking-[0.2em] text-rose-500 font-bold">Personal</span>
            <h2 className="mt-3 font-serif text-4xl font-bold text-slate-900 flex items-center gap-3">
              Favorite Spots <Heart className="h-8 w-8 text-rose-500 fill-rose-500" />
            </h2>
          </div>

          {favorites.length === 0 ? (
            <div className="p-10 border-2 border-dashed rounded-4xl text-center text-slate-400">
              You haven&apos;t saved any favorites yet.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {favorites.map((f) => (
                <div key={f.id} className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="relative h-40">
                    <Image src={f.image} alt={f.name} fill className="object-cover" />
                    <button 
                      onClick={() => handleRemoveFavorite(f.id)}
                      className="absolute top-2 right-2 p-2 bg-rose-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-slate-900 line-clamp-1">{f.name}</h4>
                    <p className="text-[11px] text-slate-500 mb-3">{f.area}, {f.city}</p>
                    <Button variant="outline" size="sm" asChild className="w-full rounded-lg text-xs h-8">
                      <Link href={`/items/${f.id}`}>
                        View Details <ArrowRight className="ml-1.5 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </section>
    </ProtectedRoute>
  );
};

export default MyAccount;