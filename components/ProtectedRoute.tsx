"use client";

import { useAuth } from "@/app/context/AuthContext";
import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // current URL track korar jonno

  useEffect(() => {
    // loading shesh kintu user nei - erokom obosthay login-e pathaw
    if (!loading && !user) {
      toast.error("Please sign in to continue");
      
      // redirect korar shomoy current path-ta pathiye dao
      // jate login korar por abar ekhanei firte pare
      router.push(`/login?from=${pathname}`);
    }
  }, [loading, user, router, pathname]);

  // Loading state (Branded loader)
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-muted-foreground gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
        <p className="animate-pulse font-medium">Checking authorization...</p>
      </div>
    );
  }

  // User na thakle kisu dekhabo na (useEffect redirect korbe)
  if (!user) {
    return null;
  }

  // User login thakle page-er content dekhabo
  return <>{children}</>;
};

export default ProtectedRoute;