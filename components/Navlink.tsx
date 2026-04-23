"use client"; // Interactive hooks use korar jonno client component dorkar

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Coffee, LogOut, Menu, X, ChevronDown, PlusCircle, Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/items", label: "Explore" },
  { href: "/city-guides", label: "City Guides" },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Signed out. See you soon!");
      router.push("/");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-200 text-[#d46535] transition-all group-hover:bg-[#d46535] group-hover:text-white">
            <Coffee className="h-5 w-5" />
          </span>
          <span className="font-serif text-xl font-bold tracking-tight">
            Remote Ready
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                isActive(link.href) ? "text-[#d46535]" : "text-slate-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth / User Dropdown */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 hover:bg-slate-100">
                  <div className="h-7 w-7 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">{user.displayName || "User"}</span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                <DropdownMenuLabel>
                  <p className="text-xs font-normal text-slate-500">Logged in as</p>
                  <p className="text-sm font-semibold truncate">{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/items/add" className="cursor-pointer flex items-center">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Your Spots
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/items/manage" className="cursor-pointer flex items-center">
                    <Settings className="mr-2 h-4 w-4" /> Manage Spots
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="lg" asChild className="bg-[#d46535] text-white hover:bg-[#c0562c] shadow-sm">
                <Link href="/register">Sign up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white animate-in slide-in-from-top-2 duration-300">
          <nav className="container mx-auto px-4 flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-lg text-base font-medium ${
                  isActive(link.href) ? "bg-amber-50 text-amber-600" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {user && (
              <>
                <Link
                  href="/items/manage"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-50"
                >
                  Manage Products
                </Link>
                <Link
                  href="/items/add"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-50"
                >
                  Add Product
                </Link>
              </>
            )}

            <div className="border-t border-slate-100 mt-4 pt-4 flex flex-col gap-2">
              {user ? (
                <Button variant="destructive" size="lg" className="w-full" onClick={handleLogout}>
                  <LogOut className="mr-2 h-5 w-5" /> Sign out
                </Button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
                  </Button>
                  <Button size="lg" className="bg-[#d46535] text-white" asChild>
                    <Link href="/register" onClick={() => setOpen(false)}>Sign up</Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;