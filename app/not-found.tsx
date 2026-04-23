"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );
  }, [pathname]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-background px-4">
      <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Visual Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-600 shadow-soft">
          <Coffee className="h-10 w-10" />
        </div>

        {/* Error Text */}
        <h1 className="mb-2 font-serif text-7xl font-bold text-slate-900">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-slate-800">
          Oops! Page not found
        </h2>
        <p className="mx-auto mb-8 max-w-md text-slate-500">
          The cafe you&apos;re looking for might have moved or the link is broken. 
          Let&apos;s get you back to a familiar spot.
        </p>

        {/* Navigation Button */}
        <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white px-8 h-12 rounded-xl font-bold shadow-lg shadow-amber-200 transition-all active:scale-95">
          <Link href="/">
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;