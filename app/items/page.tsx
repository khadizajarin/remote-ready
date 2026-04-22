"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Coffee } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SpotCard from "@/components/SpotCard";
import { spots } from "@/app/data/spots";

const cities = ["All", ...Array.from(new Set(spots.map((s) => s.city)))];

const ExplorePage = () => {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All");

  const filtered = useMemo(() => {
    return spots.filter((s) => {
      const matchesCity = city === "All" || s.city === city;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.area.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q);
      return matchesCity && matchesQuery;
    });
  }, [query, city]);

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
        <div className="mt-12 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-amber-600 transition-colors" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, area, or vibe…"
              className="pl-12 h-14 bg-white border-slate-200 rounded-xl shadow-sm focus:ring-amber-500 focus:border-amber-500 text-base"
            />
          </div>
          
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 px-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 shrink-0">
               <SlidersHorizontal className="h-4 w-4" />
            </div>
            {cities.map((c) => (
              <Button
                key={c}
                size="sm"
                variant={city === c ? "default" : "outline"}
                onClick={() => setCity(c)}
                className={`rounded-full px-6 h-10 transition-all whitespace-nowrap ${
                  city === c 
                    ? "bg-amber-600 text-white hover:bg-amber-700 shadow-md shadow-amber-200" 
                    : "bg-white text-slate-600 hover:border-amber-200 hover:bg-amber-50"
                }`}
              >
                {c}
              </Button>
            ))}
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
              We couldn&apos;t find anything matching &quot;{query}&quot;. Maybe try a different city or keyword?
            </p>
            <Button 
              variant="link" 
              onClick={() => {setQuery(""); setCity("All");}}
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