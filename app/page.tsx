"use client"
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Coffee, MapPin, Sparkles, Wifi, Users, Quote, Search, Bookmark } from "lucide-react";
import heroImg from "@/public/hero-cafe.jpg";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase"; 
import { collection, query, onSnapshot } from "firebase/firestore";
import SpotCard from "../components/SpotCard";
import { Loader2 } from "lucide-react";


interface Spot {
  id: string;
  name: string;
  image: string;
  rating: number;
  price: string;
  wifi: string;
  noise: string;
  plugs: boolean;
  tagline: string;
  area: string;
  city: string;
  [key: string]: unknown;
}

export default function HomePage() {


  const [featuredSpots, setFeaturedSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "spots"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Spot[];

      // Shuffle and pick 3
      const shuffled = allData.sort(() => 0.5 - Math.random());
      setFeaturedSpots(shuffled.slice(0, 3));
      
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
  
      {/* Hero Section */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <Image
          src={heroImg}
          alt="A cozy cafe with a laptop and steaming latte"
          fill
          priority
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 to-transparent" />
        
        <div className="container relative mx-auto px-4 py-24">
          <div className="max-w-2xl text-white animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-medium border border-white/20">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              Handpicked for remote workers
            </span>
            <h1 className="mt-6 font-serif text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] text-balance">
              Find your next <span className="text-amber-400 italic">favourite</span> cafe to work from.
            </h1>
            <p className="mt-6 text-lg text-white/85 max-w-xl leading-relaxed">
              Cozy corners, fast wifi, and coffee worth coming back for.
              Discover cafes loved by the people who actually work in them.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className=" bg-amber-600 text-white hover:bg-amber-700 shadow-md -200 rounded-xl px-6 h-12">
                <Link href="/items">
                  Explore spots <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className=" shadow-md rounded-xl px-6 h-12 bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Link href="/about">Our story</Link>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                { n: "120+", l: "Curated cafes" },
                { n: "12", l: "Cities" },
                { n: "4.8★", l: "Avg. rating" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-serif text-3xl font-semibold text-amber-300">{s.n}</div>
                  <div className="text-xs text-white/70 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-amber-600 font-bold">Why Remote Ready</span>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-semibold">
            More than coffee. A place to think.
          </h2>
          <p className="mt-4 text-slate-600">
            Every spot is reviewed by people who actually opened a laptop and stayed for hours.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { icon: Wifi, title: "Verified wifi", body: "Real speeds tested by real remote workers — not just promises on a chalkboard." },
            { icon: Users, title: "Vibe & noise", body: "We tell you if it's a quiet library hush or a buzzing brunch crowd before you go." },
            { icon: Coffee, title: "Worth the cup", body: "Only spots with coffee good enough to keep you ordering through the afternoon." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl bg-gradient-card p-7 border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
              <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-serif text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Spots Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-amber-600 font-bold">Featured</span>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-semibold">This week&apos;s picks</h2>
          </div>
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link href="/items">
              See all <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredSpots.map((s) => (
              <SpotCard key={s.id} spot={s} />
            ))}
          </div>
        )}
      </section>

      {/* How it works */}
     <section className="bg-muted/40 border-y border-border/60">
        <div className="container mx-auto px-6 py-16 md:py-24">
          {/* Header Section */}
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-amber-600 font-bold">
              How it works
            </span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-balance text-slate-900 leading-tight">
              From craving caffeine to deep work, in three steps.
            </h2>
          </div>

          {/* Steps Grid */}
          <div className="mt-16 grid gap-12 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:gap-12">
            {[
              { 
                icon: Search, 
                step: "01", 
                title: "Search your city", 
                body: "Browse curated cafes by city, vibe, or what you need to get done today." 
              },
              { 
                icon: Bookmark, 
                step: "02", 
                title: "Pick your spot", 
                body: "Check wifi speed, noise level, plug access, and real photos before you go." 
              },
              { 
                icon: Coffee, 
                step: "03", 
                title: "Settle in & ship", 
                body: "Order a flat white, open your laptop, and have your most productive afternoon." 
              },
            ].map((s) => (
              <div key={s.step} className="relative flex flex-col items-center text-center md:items-start md:text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Step Number Background */}
               <div className="font-serif text-5xl text-accent/20 font-semibold">{s.step}</div>
                
                {/* Icon Box */}
                <div className="relative z-10 mt-2 h-14 w-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shadow-sm">
                  <s.icon className="h-6 w-6" />
                </div>

                {/* Text Content */}
                <h3 className="mt-6 font-serif text-xl md:text-2xl font-bold text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-3 text-base text-slate-500 leading-relaxed max-w-70 md:max-w-none">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto py-20">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Loved by remote workers</span>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-semibold text-balance">
            Stories from the corner table.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { quote: "Found my new daily office in Banani. The wifi never drops and the cardamom latte is unreal.", name: "Tahmid R.", role: "Product Designer" },
            { quote: "I travel between cities every month. Remote Ready is the first place I check before booking a stay.", name: "Sara K.", role: "Software Engineer" },
            { quote: "The vibe ratings are spot on. No more walking into a place that turns out to be a noisy brunch spot.", name: "Imran H.", role: "Freelance Writer" },
          ].map((t) => (
            <figure key={t.name} className="rounded-2xl bg-gradient-card p-7 border border-border/60 shadow-soft transition-smooth hover:shadow-cozy">
              <Quote className="h-6 w-6 text-amber" />
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">
                &quot;{t.quote}&quot;
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-border/60">
                <div className="font-serif text-base font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-[#744728] text-white p-10 md:p-16 shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <MapPin className="h-8 w-8 text-amber-400" />
            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-semibold">
              Found a hidden gem? Share it with the community.
            </h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Help fellow remote workers discover the next great cafe. Add your favourite spot in under a minute.
            </p>
            <Button asChild size="lg" className="mt-7 bg-amber-600 text-white hover:bg-amber-700 shadow-md -200 rounded-xl px-6 h-12">
              <Link href="/items/add">Add a spot <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        </div>
      </section>
    </>
  );
}