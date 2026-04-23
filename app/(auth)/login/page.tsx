"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Coffee, Eye, EyeOff } from "lucide-react"; // Eye icons import kora hoyeche
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/app/context/AuthContext"; 
import { toast } from "react-hot-toast";

const Login = () => {
  const { login } = useAuth(); 
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const from = searchParams.get("from") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Eye icon er state
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      await login(email, password); 
      toast.success("Welcome back! Brewing your experience...");
      router.push(from);
      router.refresh(); 
    } catch (error: any) {
      console.error(error);
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        toast.error("Invalid email or password");
      } else {
        toast.error("Something went wrong. Please try again.");
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
          <h1 className="mt-6 font-serif text-3xl font-bold text-slate-900">Welcome back</h1>
          <p className="mt-2 text-slate-500">Sign in to keep exploring cozy cafes.</p>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="mt-10 rounded-3xl bg-card border border-border shadow-cozy p-8 space-y-6 animate-in fade-in zoom-in-95 duration-500"
        >
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
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
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-xs text-amber-600 hover:underline">Forgot password?</Link>
            </div>
            
            {/* Password Field with Eye Icon */}
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} // Dynamic type change
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-slate-50/50 border-slate-200 focus:ring-amber-500 pr-10" // pr-10 jate icon er upore text na jay
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 bg-amber-600 text-white hover:bg-amber-700 rounded-xl font-bold transition-smooth shadow-md shadow-amber-200"
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-slate-400">Or continue with</span></div>
          </div>

          <p className="text-center text-sm text-slate-500">
            New here?{" "}
            <Link href="/register" className="text-amber-600 font-bold hover:underline transition-colors">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;