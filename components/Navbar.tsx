"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // App Router hooks
import { toast } from "react-hot-toast"; // react-hot-toast import
import { Coffee, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/about", label: "About" },
];

const Navbar = () => {
 const { user, logout } = useAuth();
  const router = useRouter(); // navigate er bodole router
  const pathname = usePathname(); // isActive logic er jonno
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("Signed out. See you soon!"); // react-hot-toast syntax same
    router.push("/"); 
  };

  
  const getLinkClass = (href: string) =>
    `text-sm font-medium transition-colors hover:text-amber-600 ${
      pathname === href ? "text-amber-600" : "text-slate-600"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent transition-smooth group-hover:bg-accent group-hover:text-accent-foreground">
            <Coffee className="h-5 w-5" />
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight">
            Remote Ready
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link key={l.to} href={l.to} className={getLinkClass(l.to)}>
              {l.label}
            </Link>
          ))}
          {user && (
            <>
              <Link href="/my-listings" className={getLinkClass("/my-listings")}>
                My Listings
              </Link>
              <Link href="/add-spot" className={getLinkClass("/add-spot")}>
                Add Spot
              </Link>
            </>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">
                Hi, <span className="text-foreground font-medium">{user.displayName}</span>
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1.5" /> Sign out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background animate-fade-in">
          <nav className="container flex flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                href={l.to}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === l.to ? "bg-secondary text-accent" : "text-foreground/80"
                }`}
              >
                {l.label}
              </Link>
            ))}
            {user && (
              <>
                <Link
                  href="/my-listings"
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80"
                >
                  My Listings
                </Link>
                <Link
                  href="/add-spot"
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80"
                >
                  Add Spot
                </Link>
              </>
            )}
            <div className="border-t border-border/60 mt-2 pt-3 flex gap-2">
              {user ? (
                <Button variant="outline" size="sm" className="w-full" onClick={() => { handleLogout(); setOpen(false); }}>
                  Sign out
                </Button>
              ) : (
                <>
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
                  </Button>
                  <Button size="sm" className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                    <Link href="/signup" onClick={() => setOpen(false)}>Sign up</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;