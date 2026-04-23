"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, Coffee, Loader2, CircleDollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SpotCard from "@/components/SpotCard";
import { db } from "@/lib/firebase"; 
import { collection, onSnapshot, query } from "firebase/firestore";

interface Spot {
  id: string;
  city: string;
  name: string;
  area: string;
  tagline: string;
  image: string;
  rating: number;
  price: string;
  wifi: string;
  [key: string]: unknown;
}

const ExplorePage = () => {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All"); // দ্বিতীয় ফিল্টার স্টেট

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
    const uniqueCities = Array.from(new Set(spots.map((s) => s.city)));
    return ["All", ...uniqueCities.sort()];
  }, [spots]);


  const priceLevels = useMemo(() => {
    const uniquePrices = Array.from(new Set(spots.map((s) => s.price)));
    return ["All", ...uniquePrices.sort()];
  }, [spots]);


  const filtered = useMemo(() => {
    return spots.filter((s) => {
      const matchesCity = selectedCity === "All" || s.city === selectedCity;
      const matchesPrice = selectedPrice === "All" || s.price === selectedPrice;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        s.name?.toLowerCase().includes(q) ||
        s.area?.toLowerCase().includes(q) ||
        s.tagline?.toLowerCase().includes(q);
      
      return matchesCity && matchesPrice && matchesQuery;
    });
  }, [searchQuery, selectedCity, selectedPrice, spots]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-amber-600" />
        <p className="mt-4 text-slate-500 animate-pulse">Finding the best cafes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-16 pb-8">
        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-px w-8 bg-amber-500" />
            <span className="text-xs uppercase tracking-[0.2em] text-amber-600 font-bold">
              Discovery
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            Every cafe, <span className="text-amber-600">ready</span> when you are.
          </h1>
          <p className="mt-4 text-slate-500 text-lg md:text-xl max-w-lg">
            Browse our full collection of warm, workable cafes designed for your best thinking.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="mt-12 flex flex-col gap-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-amber-600 transition-colors" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, area, or vibe…"
              className="pl-12 h-14 bg-white border-slate-200 rounded-xl shadow-sm focus:ring-amber-500 focus:border-amber-500 text-base w-full"
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* City Filter */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 w-full md:w-auto">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 shrink-0">
                 <SlidersHorizontal className="h-4 w-4" />
              </div>
              {cities.map((c) => (
                <Button
                  key={c}
                  size="sm"
                  variant={selectedCity === c ? "default" : "outline"}
                  onClick={() => setSelectedCity(c)}
                  className={`rounded-full px-6 h-10 transition-all whitespace-nowrap ${
                    selectedCity === c 
                      ? "bg-amber-600 text-white hover:bg-amber-700 shadow-md shadow-amber-200" 
                      : "bg-white text-slate-600 hover:border-amber-200 hover:bg-amber-50"
                  }`}
                >
                  {c}
                </Button>
              ))}
            </div>

            <div className="hidden md:block h-6 w-px bg-slate-200 mx-2" />

            {/* Price Filter (New Second Filter) */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 w-full md:w-auto">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 shrink-0">
                <CircleDollarSign className="h-4 w-4" />
              </div>
              {priceLevels.map((p, index) => ( // এখানে index যোগ করা হয়েছে
                <Button
                  key={`price-level-${p}-${index}`} // ইউনিক কি নিশ্চিত করতে প্রিফিক্স এবং ইনডেক্স ব্যবহার
                  size="sm"
                  variant={selectedPrice === p ? "secondary" : "outline"}
                  onClick={() => setSelectedPrice(p)}
                  className={`rounded-full px-6 h-10 transition-all whitespace-nowrap ${
                    selectedPrice === p 
                      ? "bg-amber-600 text-white hover:bg-amber-700 shadow-md shadow-amber-200" 
                      : "bg-white text-slate-600 hover:border-amber-200 hover:bg-amber-50"
                  }`}
                >
                  {p}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="container mx-auto px-4 pb-24">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm font-medium text-slate-500">
            Showing <span className="text-slate-900 font-bold">{filtered.length}</span> {filtered.length === 1 ? "cafe" : "cafes"}
          </p>
          {filtered.length > 0 && (
            <div className="h-px flex-1 bg-slate-100 mx-6 hidden sm:block" />
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 p-20 text-center animate-in zoom-in-95 duration-500">
            <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Coffee className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No spots found</h3>
            <p className="mt-2 text-slate-500 max-w-xs">
              Try a different city, price level, or keyword?
            </p>
            <Button 
              variant="link" 
              onClick={() => {setSearchQuery(""); setSelectedCity("All"); setSelectedPrice("All");}}
              className="mt-4 text-amber-600 font-semibold"
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <SpotCard key={s.id} spot={s} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ExplorePage;