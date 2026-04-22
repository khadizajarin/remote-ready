import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Wifi } from "lucide-react";
import type { Spot } from "@/app/data/spots";

const SpotCard = ({ spot }: { spot: Spot }) => {
  return (
    <Link
      href={`/items/${spot.id}`} 
      className="group block rounded-2xl overflow-hidden bg-[#fcfaf8] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-amber-400/40"
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        <Image
          src={spot.image}
          alt={spot.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-xs font-bold shadow-sm">
          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
          {spot.rating}
        </div>

        {/* Price Badge */}
        <div className="absolute top-3 left-3 rounded-full bg-slate-900 text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 shadow-sm">
          {spot.price}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-lg font-semibold leading-tight group-hover:text-amber-600 transition-colors">
            {spot.name}
          </h3>
        </div>
        
        <p className="text-sm text-slate-500 mt-1 line-clamp-1">
          {spot.tagline}
        </p>

        <div className="mt-4 flex items-center gap-4 text-[11px] font-medium text-slate-400 uppercase tracking-tight">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-amber-500" /> {spot.area}, {spot.city}
          </span>
          <span className="inline-flex items-center gap-1">
            <Wifi className="h-3.5 w-3.5 text-amber-500" /> {spot.wifi}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SpotCard;