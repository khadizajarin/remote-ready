import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navlink";
import Footer from "../components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { Inter, Playfair_Display } from "next/font/google"; // Google Fonts
import { cn } from "@/lib/utils";


const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});


export const metadata: Metadata = {
  title: "Remote Ready | Find Your Perfect Workspace",
  description: "Find the best independent cafes to work from. Community-led insights for remote workers.",

  openGraph: {
    title: "Remote Ready",
    description: "Discover cozy cafes with great Wi-Fi and even better coffee.",
    url: "https://remote-ready-qxsx.vercel.app/", 
    siteName: "Remote Ready",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Remote Ready - Cafe Finder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      
      <body className={cn(
        "min-h-screen font-sans antialiased", 
        sans.variable, 
        serif.variable
      )}>
       <AuthProvider>
          <Toaster position="top-center" />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
