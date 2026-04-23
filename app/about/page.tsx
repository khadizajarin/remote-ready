"use client";

import { Coffee, Heart, Leaf, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/AuthContext"; // AuthContext import করা হলো

const values = [
  { 
    icon: Heart, 
    title: "Built with love", 
    body: "We started Remote Ready because we kept losing hours hunting for a good cafe in every new city.",
    color: "text-rose-500",
    bg: "bg-rose-50"
  },
  { 
    icon: Leaf, 
    title: "Independent first", 
    body: "We feature independent, local cafes that put care into their craft — not big corporate chains.",
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  { 
    icon: Users, 
    title: "Community-led", 
    body: "Every listing is shaped by real reviews and insights from our community of remote workers.",
    color: "text-amber-600",
    bg: "bg-amber-50"
  },
];

const AboutPage = () => {
  const { user, loading } = useAuth(); 

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto text-center animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-700 px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
            <Coffee className="h-3.5 w-3.5" /> Our story
          </span>
          <h1 className="mt-6 font-serif text-4xl md:text-7xl font-bold leading-tight text-slate-900 tracking-tight">
            A love letter to the cafes <br className="hidden md:block" /> 
            that <span className="text-amber-600 italic">hold us up.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Remote Ready began with a simple frustration: every great idea we had
            happened in a cafe — and every great cafe was nearly impossible to find.
            So we started keeping a list. Then friends asked for it. Now it&apos;s here, for you.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((v) => (
            <div 
              key={v.title} 
              className="group rounded-3xl bg-[#fcfaf8] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`h-14 w-14 rounded-2xl ${v.bg} ${v.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-bold text-slate-900">{v.title}</h3>
              <p className="mt-3 text-slate-500 leading-relaxed">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="rounded-[3rem] bg-[#f0e9e0] p-10 md:p-20 text-center relative overflow-hidden">
          {/* Decorative Background Element */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
              We believe great work needs great places.
            </h2>
            <p className="mt-6 text-muted-foreground text-lg max-w-xl mx-auto">
              And great places deserve to be found. Whether you&apos;re a cafe owner or a wanderer, join our journey.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-amber-600 text-white hover:bg-amber-700 h-14 px-8 rounded-xl text-base font-bold transition-all">
                <Link href="/explore">Browse all spots</Link>
              </Button>

              {!loading && !user && (
                <Button asChild size="lg" variant="outline" className="border-slate-200 bg-white text-slate-900 hover:bg-slate-50 h-14 px-8 rounded-xl text-base font-bold transition-all">
                  <Link href="/register">Join the community</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;