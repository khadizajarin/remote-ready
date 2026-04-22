import spot1 from "@/public/spot-1.jpg";
import spot2 from "@/public/spot-2.jpg";
import spot3 from "@/public/spot-3.jpg";
import spot4 from "@/public/spot-4.jpg";
import spot5 from "@/public/spot-5.jpg";
import spot6 from "@/public/spot-6.jpg";
import { StaticImageData } from "next/image";

export type Spot = {
  id: string;
  name: string;
  city: string;
  area: string;
  image: string | StaticImageData;
  tagline: string;
  description: string;
  wifi: string;
  noise: "Quiet" | "Moderate" | "Lively";
  seating: number;
  outlets: "Plenty" | "Some" | "Few";
  hours: string;
  price: "$" | "$$" | "$$$";
  rating: number;
  amenities: string[];
  ownerEmail?: string;
};

export const spots: Spot[] = [
  {
    id: "the-roastery",
    name: "The Roastery",
    city: "Dhaka",
    area: "Gulshan 2",
    image: spot1,
    tagline: "Hand-roasted beans & a quiet upstairs loft",
    description:
      "A craft coffee bar with a hidden upstairs floor designed for deep work. Single-origin pour-overs, communal oak tables, and the steady hum of an espresso machine.",
    wifi: "120 Mbps",
    noise: "Quiet",
    seating: 28,
    outlets: "Plenty",
    hours: "8:00 AM – 10:00 PM",
    price: "$$",
    rating: 4.8,
    amenities: ["Free Wi-Fi", "Power outlets", "Specialty coffee", "Quiet zone", "Restroom"],
  },
  {
    id: "sunlit-corner",
    name: "Sunlit Corner",
    city: "Dhaka",
    area: "Banani",
    image: spot2,
    tagline: "Floor-to-ceiling windows, plants everywhere",
    description:
      "Bright, airy and full of greenery. Best for morning sessions when the sun pours in through the wall of windows.",
    wifi: "80 Mbps",
    noise: "Moderate",
    seating: 40,
    outlets: "Some",
    hours: "7:30 AM – 9:00 PM",
    price: "$$",
    rating: 4.6,
    amenities: ["Free Wi-Fi", "Natural light", "Vegan menu", "Pet friendly"],
  },
  {
    id: "the-reading-room",
    name: "The Reading Room",
    city: "Chattogram",
    area: "Agrabad",
    image: spot3,
    tagline: "Books, leather armchairs & amber lamps",
    description:
      "Tucked behind a bookshop, this cozy nook feels like a friend's library. Slow jazz, deep chairs, and bottomless cinnamon coffee.",
    wifi: "60 Mbps",
    noise: "Quiet",
    seating: 18,
    outlets: "Some",
    hours: "9:00 AM – 11:00 PM",
    price: "$$",
    rating: 4.9,
    amenities: ["Free Wi-Fi", "Bookshop", "Quiet zone", "Tea selection"],
  },
  {
    id: "brick-and-bean",
    name: "Brick & Bean",
    city: "Dhaka",
    area: "Dhanmondi",
    image: spot4,
    tagline: "Industrial loft with communal work tables",
    description:
      "Exposed brick, Edison bulbs, and long shared tables made for laptops and conversation. A favourite of freelancers and founders.",
    wifi: "200 Mbps",
    noise: "Lively",
    seating: 60,
    outlets: "Plenty",
    hours: "8:00 AM – 12:00 AM",
    price: "$$",
    rating: 4.7,
    amenities: ["Free Wi-Fi", "Power outlets", "Meeting nook", "All-day food"],
  },
  {
    id: "garden-grounds",
    name: "Garden Grounds",
    city: "Sylhet",
    area: "Zindabazar",
    image: spot5,
    tagline: "Outdoor patio under string lights",
    description:
      "Work surrounded by ivy and warm string lights. The patio stays open late and the chai is famous in the neighbourhood.",
    wifi: "50 Mbps",
    noise: "Moderate",
    seating: 35,
    outlets: "Few",
    hours: "9:00 AM – 11:00 PM",
    price: "$",
    rating: 4.5,
    amenities: ["Free Wi-Fi", "Outdoor seating", "Pet friendly", "Late hours"],
  },
  {
    id: "marble-and-milk",
    name: "Marble & Milk",
    city: "Dhaka",
    area: "Uttara",
    image: spot6,
    tagline: "Minimal, modern, and ridiculously good pastries",
    description:
      "A bright marble-counter espresso bar with a dedicated quiet wing for working. Croissants flaky enough to make a meeting bearable.",
    wifi: "150 Mbps",
    noise: "Moderate",
    seating: 32,
    outlets: "Plenty",
    hours: "7:00 AM – 9:00 PM",
    price: "$$$",
    rating: 4.7,
    amenities: ["Free Wi-Fi", "Power outlets", "Pastries", "Quiet wing"],
  },
];