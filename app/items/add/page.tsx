"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-hot-toast";
import ProtectedRoute from "../../../components/ProtectedRoute";

const AddSpot = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // ১. এরর স্টেট ম্যানেজমেন্ট
  const [errors, setErrors] = useState<Record<string, string>>({});

  const initialState = {
    name: "",
    city: "",
    area: "",
    tagline: "",
    description: "",
    wifi: "",
    hours: "",
  };

  const [form, setForm] = useState(initialState);

  // ২. ভ্যালিডেশন লজিক
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Cafe name is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.tagline.trim()) newErrors.tagline = "Tagline is required";
    if (form.description.length > 0 && form.description.length < 20) {
      newErrors.description = "Description should be at least 20 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to share a spot");
      return;
    }

    // ভ্যালিডেশন চেক
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "spots"), {
        ...form,
        ownerEmail: user.email,
        ownerId: user.uid,
        image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000", 
        createdAt: serverTimestamp(),
        rating: 4.5, 
        noise: "Moderate",
        outlets: "Some",
        amenities: ["Free Wi-Fi", "Quiet zone"],
        random: Math.random(), // র‍্যান্ডমলি ডিসপ্লে করার জন্য
      });

      toast.success("Spot submitted! Thanks for sharing ☕");
      setForm(initialState); 
      router.push("/items");

    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="text-xs uppercase tracking-[0.2em] text-amber-600 font-bold">Add a spot</span>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Share your favourite <span className="text-amber-600 italic">cafe</span>
            </h1>
          </div>

          <form 
            onSubmit={handleSubmit} 
            className="mt-10 rounded-3xl bg-card border border-border shadow-cozy p-8 space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="name" className={`font-semibold ${errors.name ? 'text-rose-500' : 'text-slate-700'}`}>Cafe name *</Label>
                <Input 
                  id="name" 
                  placeholder="The Roastery" 
                  value={form.name} 
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    if (errors.name) setErrors({...errors, name: ""});
                  }} 
                  className={`h-12 bg-slate-50/50 ${errors.name ? 'border-rose-500 focus-visible:ring-rose-500' : ''}`}
                />
                {errors.name && <p className="text-xs font-medium text-rose-500 animate-in fade-in slide-in-from-top-1">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className={`font-semibold ${errors.city ? 'text-rose-500' : 'text-slate-700'}`}>City *</Label>
                <Input 
                  id="city" 
                  placeholder="Dhaka" 
                  value={form.city} 
                  onChange={(e) => {
                    setForm({ ...form, city: e.target.value });
                    if (errors.city) setErrors({...errors, city: ""});
                  }} 
                  className={`h-12 bg-slate-50/50 ${errors.city ? 'border-rose-500 focus-visible:ring-rose-500' : ''}`}
                />
                {errors.city && <p className="text-xs font-medium text-rose-500 animate-in fade-in slide-in-from-top-1">{errors.city}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="area" className="font-semibold text-slate-700">Area</Label>
                <Input 
                  id="area" 
                  placeholder="Gulshan 2" 
                  value={form.area} 
                  onChange={(e) => setForm({ ...form, area: e.target.value })} 
                  className="h-12 bg-slate-50/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline" className={`font-semibold ${errors.tagline ? 'text-rose-500' : 'text-slate-700'}`}>Tagline *</Label>
              <Input 
                id="tagline" 
                placeholder="A quiet corner with the best pour-over in town" 
                value={form.tagline} 
                onChange={(e) => {
                  setForm({ ...form, tagline: e.target.value });
                  if (errors.tagline) setErrors({...errors, tagline: ""});
                }} 
                className={`h-12 bg-slate-50/50 ${errors.tagline ? 'border-rose-500 focus-visible:ring-rose-500' : ''}`}
              />
              {errors.tagline && <p className="text-xs font-medium text-rose-500 animate-in fade-in slide-in-from-top-1">{errors.tagline}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="font-semibold text-slate-700">Description</Label>
              <Textarea 
                id="description" 
                rows={4} 
                placeholder="Tell us about the vibe, seating, what to order…" 
                value={form.description} 
                onChange={(e) => setForm({ ...form, description: e.target.value })} 
                className="bg-slate-50/50 resize-none"
              />
              {errors.description && <p className="text-xs font-medium text-rose-500">{errors.description}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="wifi" className="font-semibold text-slate-700">Wi-Fi Speed</Label>
                <Input 
                  id="wifi" 
                  placeholder="e.g. 80 Mbps" 
                  value={form.wifi} 
                  onChange={(e) => setForm({ ...form, wifi: e.target.value })} 
                  className="h-12 bg-slate-50/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hours" className="font-semibold text-slate-700">Hours</Label>
                <Input 
                  id="hours" 
                  placeholder="8:00 AM – 10:00 PM" 
                  value={form.hours} 
                  onChange={(e) => setForm({ ...form, hours: e.target.value })} 
                  className="h-12 bg-slate-50/50"
                />
              </div>
            </div>

            <div className="rounded-2xl border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center gap-3 bg-secondary/10 group hover:border-amber-400 transition-colors">
              <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
                <ImagePlus className="h-6 w-6 text-amber-600" />
              </div>
              <div className="text-sm text-slate-500">
                Photo upload coming soon. Using a <span className="font-bold text-slate-700">placeholder</span> for now.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                type="submit" 
                disabled={loading}
                className="lg:flex-1 h-14 bg-amber-600 text-white hover:bg-amber-700 rounded-xl font-bold shadow-md transition-all active:scale-95"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <><MapPin className="h-5 w-5 mr-2" /> Submit Spot</>}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.back()}
                className="h-14 px-8 border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-semibold"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </section>
    </ProtectedRoute>
  );
};

export default AddSpot;