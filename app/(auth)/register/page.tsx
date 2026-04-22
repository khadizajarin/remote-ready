"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/app/context/AuthContext"; // Path ensure koro
import { toast } from "react-hot-toast";

const Signup = () => {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      // AuthContext theke register function call
      await register(name, email, password);
      
      toast.success("Welcome to Remote Ready! Account created.");
      router.push("/");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered.");
      } else {
        toast.error("Failed to create account. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container mx-auto px-4 py-16 lg:py-24">
      <div className="max-w-md mx-auto">
        <div className="text-center animate-in fade-in slide-in-from-top-4 duration-700">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600 shadow-soft">
            <Coffee className="h-7 w-7" />
          </span>
          <h1 className="mt-6 font-serif text-3xl font-bold text-slate-900">Create your account</h1>
          <p className="mt-2 text-slate-500">Save favourites and share your own cozy spots.</p>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="mt-10 rounded-3xl bg-card border border-border shadow-cozy p-8 space-y-5 animate-in fade-in zoom-in-95 duration-500"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input 
              id="name" 
              placeholder="Aiman Hossain" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="h-12 bg-slate-50/50 border-slate-200 focus:ring-amber-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="you@cafe.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-slate-50/50 border-slate-200 focus:ring-amber-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="At least 6 characters" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-slate-50/50 border-slate-200 focus:ring-amber-500"
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 bg-amber-600 text-white hover:bg-amber-700 rounded-xl font-bold transition-smooth shadow-md shadow-amber-200"
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>

          <p className="text-center text-sm text-slate-500 pt-2">
            Already a member?{" "}
            <Link href="/login" className="text-amber-600 font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;