"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Coffee, MapPin, ArrowRight, Compass, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase"; 
import { collection, onSnapshot, query } from "firebase/firestore";

type CityGuide = {
  city: string;
  tagline: string;
  vibe: string;
  bestFor: string;
  neighborhoodTip: string;
};

type Spot = {
  id: string;
  city: string;
  name: string;
  image: string;
  price: string;
  area: string;
  tagline: string;
  noise: string;
  outlets: number;
};

const cityMeta: Record<string, Omit<CityGuide, "city">> = {
  Dhaka: {
    tagline: "Bustling capital with hidden quiet lofts",
    vibe: "Energetic streets, calm coffee corners tucked above the noise.",
    bestFor: "Long deep-work sessions with strong Wi-Fi and late hours.",
    neighborhoodTip: "Gulshan & Banani host most laptop-friendly cafes — go before 11am for the best seats.",
  },
  Chattogram: {
    tagline: "Coastal calm meets specialty coffee",
    vibe: "Sea breeze, slower mornings, cozy interiors with wood and warm light.",
    bestFor: "Creative work, journaling and afternoon calls by the window.",
    neighborhoodTip: "Try the Agrabad area for a mix of new roasters and quiet rooftops.",
  },
  Sylhet: {
    tagline: "Tea country with a coffee soul",
    vibe: "Green hills outside, warm wooden interiors inside — unhurried and inviting.",
    bestFor: "Weekend remote retreats and focus blocks far from city chaos.",
    neighborhoodTip: "Zindabazar has the densest cafe cluster — walk between three in one afternoon.",
  },
};

const CityGuides = () => {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "spots"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedSpots = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Spot[];
      setSpots(fetchedSpots);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching spots:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const cities = useMemo(() => {
    return Array.from(new Set(spots.map((s) => s.city))).sort();
  }, [spots]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-slate-100 bg-slate-50/50">
        <div className="container mx-auto px-4 py-16 md:py-24 text-center max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
            <Compass className="h-3.5 w-3.5" /> City Guides
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mt-6 tracking-tight text-slate-900">
            Curated cafe trails, <br className="hidden md:block" />  <span className="text-amber-600 italic">city by city</span>
          </h1>
          <p className="text-slate-500 mt-6 text-lg md:text-xl leading-relaxed">
            Hand-picked neighborhoods, the cafes worth a detour, and local tips
            to help you settle in like a regular — wherever you land next.
          </p>
        </div>
      </section>

      {/* City Sections */}
      <section className="container mx-auto px-4 py-14 md:py-20 space-y-24">
        {cities.map((city) => {
          const meta = cityMeta[city] ?? {
            tagline: "A new city to explore",
            vibe: "Cozy cafes, warm welcomes.",
            bestFor: "Remote workers looking for somewhere new.",
            neighborhoodTip: "Wander the central district — that's where the good ones hide.",
          };
          const citySpots = spots.filter((s) => s.city === city);

          return (
            <article key={city} className="grid lg:grid-cols-[340px_1fr] gap-12 lg:gap-16">
              {/* Left: City Overview */}
              <div className="lg:sticky lg:top-24 self-start">
                <div className="flex items-center gap-2 text-amber-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-widest font-bold">
                    {citySpots.length} curated spots
                  </span>
                </div>
                <h2 className="font-serif text-4xl font-bold mt-3 text-slate-900">{city}</h2>
                <p className="text-slate-500 mt-3 text-lg italic leading-snug">{meta.tagline}</p>

                <div className="mt-8 space-y-6">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-tighter text-slate-900">The vibe</h4>
                    <p className="text-slate-600 mt-1.5 leading-relaxed">{meta.vibe}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-tighter text-slate-900">Best for</h4>
                    <p className="text-slate-600 mt-1.5 leading-relaxed">{meta.bestFor}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                    <h4 className="text-sm font-bold uppercase tracking-tighter text-amber-800">Local tip</h4>
                    <p className="text-amber-700/80 mt-1.5 text-sm leading-relaxed">{meta.neighborhoodTip}</p>
                  </div>
                </div>

                <Button asChild variant="outline" className="mt-8 w-full md:w-auto border-slate-200 hover:bg-slate-50 rounded-xl transition-all">
                  <Link href={`/items?city=${encodeURIComponent(city)}`}>
                    Explore {city} <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Right: Spots Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                {citySpots.map((spot) => (
                  <Link key={spot.id} href={`/items/${spot.id}`} className="group">
                    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-slate-100 rounded-3xl pt-0">
                      <div className="relative aspect-video overflow-hidden bg-slate-100">
                        <Image
                          src={spot.image}
                          alt={spot.name}
                          fill
                          sizes="600"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-serif text-xl font-bold text-slate-900 leading-tight group-hover:text-amber-600 transition-colors">
                            {spot.name}
                          </h3>
                          <Badge variant="secondary" className="bg-[#d46535] text-white border-none">
                            {spot.price}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-400 mt-2 flex items-center gap-1 font-medium">
                          <MapPin className="h-3 w-3" /> {spot.area}
                        </p>
                        <p className="text-sm text-slate-600 mt-3 line-clamp-2">
                          {spot.tagline}
                        </p>
                        <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mt-4 pt-4 border-t border-slate-50">
                          <span className="flex items-center gap-1">
                            <Coffee className="h-3.5 w-3.5 text-amber-500" />
                            {spot.noise}
                          </span>
                          <span>{spot.outlets} outlets</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default CityGuides;