"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Next.js Image component import koro
import { Coffee, MapPin, Plus, Trash2, Loader2, Wifi, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/lib/firebase";
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  deleteDoc 
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import ProtectedRoute from "../../../components/ProtectedRoute";

type Listing = {
  id: string;
  name: string;
  city: string;
  area: string;
  tagline: string;
  description: string;
  wifi: string;
  hours: string;
  image?: string; // Image field add kora hoyeche
  ownerId?: string;
  createdAt: unknown;
};

const MyListings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "spots"),
      where("ownerId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Listing[];
      
      setListings(data);
      setFetching(false);
    }, (error) => {
      console.error("Fetch error:", error);
      toast.error("Failed to load your listings");
      setFetching(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this spot?")) return;

    try {
      await deleteDoc(doc(db, "spots", id));
      toast.success("Spot removed successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Could not delete the spot");
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
        <p className="mt-4 text-slate-500 font-medium">Loading your shared spots...</p>
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
            <Link href="items/add"><Plus className="h-4 w-4 mr-1.5" /> Add new spot</Link>
          </Button>
        </div>

        {listings.length === 0 ? (
          <div className="mt-12 rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-slate-50/50 p-16 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <Coffee className="h-8 w-8" />
            </div>
            <h2 className="mt-6 font-serif text-2xl font-bold text-slate-900">No shared spots yet</h2>
            <Button asChild className="mt-8 bg-amber-600 text-white hover:bg-amber-700 h-12 px-8 rounded-xl">
              <Link href="items/add">Add your first spot</Link>
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
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      onClick={() => handleDelete(l.id)}
                      className="h-9 w-9 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
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
      </section>
    </ProtectedRoute>
  );
};

export default MyListings;