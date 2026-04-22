import Link from "next/link";
import { Coffee } from "lucide-react"; // Custom icons Lucide thekei thak
import { FaInstagram, FaTwitter, FaGithub } from "react-icons/fa"; // Brand icons react-icons theke

const Footer = () => {
  const socialLinks = [
    { icon: FaInstagram, label: "Instagram", href: "#" },
    { icon: FaTwitter, label: "Twitter", href: "#" },
    { icon: FaGithub, label: "Github", href: "#" },
  ];

  return (
    <footer className="border-t border-slate-200 bg-slate-50/50 mt-24">
      <div className="container mx-auto px-4 py-12 grid gap-10 md:grid-cols-4">
        {/* Brand Section */}
        <div className="md:col-span-2 max-w-sm">
          <Link href="/" className="flex items-center gap-2 mb-4 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white">
              <Coffee className="h-5 w-5" />
            </span>
            <span className="font-serif text-xl font-bold tracking-tight text-slate-900">Remote Ready</span>
          </Link>
          <p className="text-sm text-slate-500 leading-relaxed">
            A handpicked guide to the warmest, most workable cafes — for the
            freelancers, founders, and wanderers who do their best thinking with
            a coffee in hand.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif text-sm font-bold mb-4 uppercase tracking-wider text-slate-900">Explore</h4>
          <ul className="space-y-3 text-sm text-slate-500">
            <li><Link href="/items" className="hover:text-amber-600 transition-colors">All Spots</Link></li>
            <li><Link href="/about" className="hover:text-amber-600 transition-colors">About Us</Link></li>
            <li><Link href="/items/add" className="hover:text-amber-600 transition-colors">Add a Spot</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="font-serif text-sm font-bold mb-4 uppercase tracking-wider text-slate-900">Follow</h4>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="h-9 w-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-amber-600 hover:border-amber-600 transition-all shadow-sm"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-medium uppercase tracking-widest text-slate-400">
          <p>© {new Date().getFullYear()} Remote Ready. Brewed with care.</p>
          <p className="hidden sm:block">Crafted for remote workers, everywhere.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;