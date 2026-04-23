import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Wifi } from "lucide-react";

// প্রয়োজনীয় টাইপ ডিফিনিশন
interface Spot {
  id: string;
  name: string;
  image: string;
  rating: string | number;
  price: string;
  tagline: string;
  area: string;
  city: string;
  wifi: string;
}

const SpotCard = ({ spot }: { spot: Spot }) => {
  // ডেসট্রাকচারিং করে নিলে কোড আরও ক্লিন দেখায়
  const { id, name, image, rating, price, tagline, area, city, wifi } = spot;

  return (
    <Link
      href={`/items/${id}`} 
      className="group block rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 hover:border-amber-200"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-2.5 py-1 text-xs font-bold shadow-sm border border-white/20">
          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
          {rating}
        </div>

        <div className="absolute top-4 left-4 rounded-full bg-amber-600 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 shadow-lg">
          {price}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        <h3 className="font-serif text-xl font-bold leading-tight text-slate-900 group-hover:text-amber-600 transition-colors">
          {name}
        </h3>
        
        <p className="text-sm text-slate-500 mt-2 line-clamp-1 italic">
          &quot;{tagline}&quot;
        </p>

        <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-amber-500" /> 
            {area}
          </div>
          <div className="flex items-center gap-1.5">
            <Wifi className="h-3.5 w-3.5 text-amber-500" /> 
            {wifi}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SpotCard;