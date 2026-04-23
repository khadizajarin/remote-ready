// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { ArrowLeft, Clock, MapPin, Plug, Star, Users, Volume2, Wifi } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { spots } from "@/app/data/spots"; 

// const SpotDetails = () => {
//   const params = useParams();
//   const id = params?.id;

//   const spot = spots.find((s) => s.id === id);

//   if (!spot) {
//     return (
//       <div className="container py-24 text-center">
//         <h1 className="font-serif text-3xl font-semibold text-slate-900">Spot not found</h1>
//         <p className="mt-3 text-muted-foreground">We couldn&apos;t find that cafe.</p>
//         <Button asChild className="mt-6 bg-amber-600 hover:bg-amber-700">
//           <Link href="/explore">Back to explore</Link>
//         </Button>
//       </div>
//     );
//   }

//   const stats = [
//     { icon: Wifi, label: "Wi-Fi", value: spot.wifi },
//     { icon: Volume2, label: "Noise", value: spot.noise },
//     { icon: Users, label: "Seating", value: `${spot.seating} seats` },
//     { icon: Plug, label: "Outlets", value: spot.outlets },
//     { icon: Clock, label: "Hours", value: spot.hours },
//   ];

//   return (
//     <main className="bg-background min-h-screen ">
//       {/* Navigation */}
//       <div className="container  mx-auto pt-8">
//         <Button variant="ghost" size="sm" asChild className="hover:text-amber-600 transition-colors">
//           <Link href="/items">
//             <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to spots
//           </Link>
//         </Button>
//       </div>

//       {/* Hero Image Section */}
//       <section className="container  mx-auto pt-6">
//         <div className="rounded-[2.5rem] overflow-hidden relative aspect-16/8 bg-muted shadow-cozy border border-slate-100">
//           <Image
//             src={spot.image}
//             alt={spot.name}
//             fill
//             priority
//             className="object-cover"
//           />
//         </div>
//       </section>

//       {/* Content Section */}
//       <section className="container  mx-auto py-12 grid lg:grid-cols-3 gap-12">
//         <div className="lg:col-span-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
//           <div className="flex items-center gap-3 text-sm text-muted-foreground">
//             <span className="inline-flex items-center gap-1">
//               <MapPin className="h-3.5 w-3.5" /> {spot.area}, {spot.city}
//             </span>
//             <span>•</span>
//             <span className="font-medium text-slate-700">{spot.price}</span>
//           </div>
          
//           <h1 className="mt-3 font-serif text-4xl md:text-5xl font-bold text-slate-900">
//             {spot.name}
//           </h1>
//           <p className="mt-4 text-xl text-slate-500 italic leading-relaxed">
//             &quot;{spot.tagline}&quot;
//           </p>

//           <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-900 px-4 py-2 text-sm font-bold">
//             <Star className="h-4 w-4 fill-amber-500 text-amber-500" /> {spot.rating} rating
//           </div>

//           <div className="mt-10 space-y-6">
//             <p className="text-slate-600 leading-relaxed text-lg">
//               {spot.description}
//             </p>
//           </div>

//           <h2 className="mt-12 font-serif text-2xl font-bold text-slate-900">What&apos;s inside</h2>
//           <div className="mt-5 flex flex-wrap gap-3">
//             {spot.amenities.map((a) => (
//               <span 
//                 key={a} 
//                 className="rounded-xl bg-slate-100 text-slate-700 px-5 py-2 text-sm font-medium border border-slate-200"
//               >
//                 {a}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Sidebar Info */}
//         <aside className="lg:sticky lg:top-24 self-start animate-in fade-in zoom-in-95 duration-500">
//           <div className="rounded-3xl bg-white border border-slate-100 shadow-cozy p-8">
//             <h3 className="font-serif text-xl font-bold text-slate-900 mb-6 border-b pb-4">At a glance</h3>
//             <ul className="space-y-6">
//               {stats.map((s) => (
//                 <li key={s.label} className="flex items-center gap-4">
//                   <span className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
//                     <s.icon className="h-5 w-5" />
//                   </span>
//                   <div className="flex-1">
//                     <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">{s.label}</div>
//                     <div className="text-sm font-semibold text-slate-700">{s.value}</div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//             <Button className="w-full mt-8 h-14 bg-amber-600 text-white hover:bg-amber-700 rounded-xl font-bold shadow-lg shadow-amber-100 transition-all active:scale-95">
//               Save to favourites
//             </Button>
//           </div>
//         </aside>
//       </section>
//     </main>
//   );
// };

// export default SpotDetails;

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, MapPin, Plug, Star, Users, Volume2, Wifi, Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { spots } from "@/app/data/spots"; 
import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, doc, setDoc, deleteDoc, onSnapshot, query, where } from "firebase/firestore";
import { toast } from "react-hot-toast";

const SpotDetails = () => {
  const params = useParams();
  const id = params?.id as string;
  const { user } = useAuth();
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const spot = spots.find((s) => s.id === id);

  // ১. ইউজার ফেভারিট করেছে কি না তা রিয়েলটাইম চেক করা
  useEffect(() => {
    if (!user || !id) return;

    const favDocRef = doc(db, "users", user.uid, "favorites", id);
    const unsubscribe = onSnapshot(favDocRef, (doc) => {
      setIsFavorite(doc.exists());
    });

    return () => unsubscribe();
  }, [user, id]);

  if (!spot) {
    return (
      <div className="container py-24 text-center mx-auto">
        <h1 className="font-serif text-3xl font-semibold text-slate-900">Spot not found</h1>
        <Button asChild className="mt-6 bg-amber-600 hover:bg-amber-700">
          <Link href="/items">Back to explore</Link>
        </Button>
      </div>
    );
  }

  // ২. ফেভারিট অ্যাড বা রিমুভ করার ফাংশন
  const toggleFavorite = async () => {
    if (!user) {
      toast.error("Please login to save favorites ☕");
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
      console.error("Favorite error:", error);
      toast.error("Something went wrong");
    } finally {
      setActionLoading(false);
    }
  };

  const stats = [
    { icon: Wifi, label: "Wi-Fi", value: spot.wifi },
    { icon: Volume2, label: "Noise", value: spot.noise },
    { icon: Users, label: "Seating", value: `${spot.seating} seats` },
    { icon: Plug, label: "Outlets", value: spot.outlets },
    { icon: Clock, label: "Hours", value: spot.hours },
  ];

  return (
    <main className="bg-background min-h-screen">
      <div className="container mx-auto px-4 pt-8">
        <Button variant="ghost" size="sm" asChild className="hover:text-amber-600 transition-colors">
          <Link href="/items">
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to spots
          </Link>
        </Button>
      </div>

      <section className="container mx-auto px-4 pt-6">
        <div className="rounded-[2.5rem] overflow-hidden relative aspect-[16/8] bg-muted shadow-cozy border border-slate-100">
          <Image src={spot.image} alt={spot.name} fill priority className="object-cover" />
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {spot.area}, {spot.city}
            </span>
            <span>•</span>
            <span className="font-medium text-slate-700">{spot.price}</span>
          </div>
          
          <h1 className="mt-3 font-serif text-4xl md:text-5xl font-bold text-slate-900">{spot.name}</h1>
          <p className="mt-4 text-xl text-slate-500 italic leading-relaxed">&quot;{spot.tagline}&quot;</p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-900 px-4 py-2 text-sm font-bold">
            <Star className="h-4 w-4 fill-amber-500 text-amber-500" /> {spot.rating} rating
          </div>

          <p className="mt-10 text-slate-600 leading-relaxed text-lg">{spot.description}</p>

          <h2 className="mt-12 font-serif text-2xl font-bold text-slate-900">What&apos;s inside</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {spot.amenities.map((a) => (
              <span key={a} className="rounded-xl bg-slate-100 text-slate-700 px-5 py-2 text-sm font-medium border border-slate-200">{a}</span>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 self-start">
          <div className="rounded-3xl bg-white border border-slate-100 shadow-cozy p-8">
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-6 border-b pb-4">At a glance</h3>
            <ul className="space-y-6">
              {stats.map((s) => (
                <li key={s.label} className="flex items-center gap-4">
                  <span className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">{s.label}</div>
                    <div className="text-sm font-semibold text-slate-700">{s.value}</div>
                  </div>
                </li>
              ))}
            </ul>

            {/* ৩. সাবমিট বাটন লজিক */}
            <Button 
              onClick={toggleFavorite}
              disabled={actionLoading}
              className={`w-full mt-8 h-14 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 ${
                isFavorite 
                ? "bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100" 
                : "bg-amber-600 text-white hover:bg-amber-700 shadow-lg shadow-amber-100"
              }`}
            >
              {actionLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : isFavorite ? (
                <>
                  <Heart className="h-5 w-5 fill-current" /> Saved to Favourites
                </>
              ) : (
                <>
                  <Heart className="h-5 w-5" /> Save to Favourites
                </>
              )}
            </Button>
            {!user && <p className="text-[10px] text-center mt-3 text-slate-400 italic">Login required to save</p>}
          </div>
        </aside>
      </section>
    </main>
  );
};

export default SpotDetails;