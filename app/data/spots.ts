// import spot1 from "@/public/spot-1.jpg";
// import spot2 from "@/public/spot-2.jpg";
// import spot3 from "@/public/spot-3.jpg";
// import spot4 from "@/public/spot-4.jpg";
// import spot5 from "@/public/spot-5.jpg";
// import spot6 from "@/public/spot-6.jpg";
// import spot7 from "@/public/spot-7.jpg";
// import spot8 from "@/public/spot-8.jpg";
// import spot9 from "@/public/spot-9.jpg";
// import spot10 from "@/public/spot-10.jpg";
// import spot11 from "@/public/spot-11.jpg";
// import spot12 from "@/public/spot-12.jpg";
// import spot13 from "@/public/spot-13.jpg";
// import { StaticImageData } from "next/image";

// export type Spot = {
//   id: string;
//   name: string;
//   city: string;
//   area: string;
//   image: string | StaticImageData;
//   tagline: string;
//   description: string;
//   wifi: string;
//   noise: "Quiet" | "Moderate" | "Lively";
//   seating: number;
//   outlets: "Plenty" | "Some" | "Few";
//   hours: string;
//   price: "$" | "$$" | "$$$";
//   rating: number;
//   amenities: string[];
//   ownerEmail?: string;
// };

// export const spots: Spot[] = [
//   {
//     id: "the-roastery",
//     name: "The Roastery",
//     city: "Dhaka",
//     area: "Gulshan 2",
//     image: spot1,
//     tagline: "Hand-roasted beans & a quiet upstairs loft",
//     description:
//       "A craft coffee bar with a hidden upstairs floor designed for deep work. Single-origin pour-overs, communal oak tables, and the steady hum of an espresso machine.",
//     wifi: "120 Mbps",
//     noise: "Quiet",
//     seating: 28,
//     outlets: "Plenty",
//     hours: "8:00 AM – 10:00 PM",
//     price: "$$",
//     rating: 4.8,
//     amenities: ["Free Wi-Fi", "Power outlets", "Specialty coffee", "Quiet zone", "Restroom"],
//   },
//   {
//     id: "sunlit-corner",
//     name: "Sunlit Corner",
//     city: "Dhaka",
//     area: "Banani",
//     image: spot2,
//     tagline: "Floor-to-ceiling windows, plants everywhere",
//     description:
//       "Bright, airy and full of greenery. Best for morning sessions when the sun pours in through the wall of windows.",
//     wifi: "80 Mbps",
//     noise: "Moderate",
//     seating: 40,
//     outlets: "Some",
//     hours: "7:30 AM – 9:00 PM",
//     price: "$$",
//     rating: 4.6,
//     amenities: ["Free Wi-Fi", "Natural light", "Vegan menu", "Pet friendly"],
//   },
//   {
//     id: "the-reading-room",
//     name: "The Reading Room",
//     city: "Chattogram",
//     area: "Agrabad",
//     image: spot3,
//     tagline: "Books, leather armchairs & amber lamps",
//     description:
//       "Tucked behind a bookshop, this cozy nook feels like a friend's library. Slow jazz, deep chairs, and bottomless cinnamon coffee.",
//     wifi: "60 Mbps",
//     noise: "Quiet",
//     seating: 18,
//     outlets: "Some",
//     hours: "9:00 AM – 11:00 PM",
//     price: "$$",
//     rating: 4.9,
//     amenities: ["Free Wi-Fi", "Bookshop", "Quiet zone", "Tea selection"],
//   },
//   {
//     id: "brick-and-bean",
//     name: "Brick & Bean",
//     city: "Dhaka",
//     area: "Dhanmondi",
//     image: spot4,
//     tagline: "Industrial loft with communal work tables",
//     description:
//       "Exposed brick, Edison bulbs, and long shared tables made for laptops and conversation. A favourite of freelancers and founders.",
//     wifi: "200 Mbps",
//     noise: "Lively",
//     seating: 60,
//     outlets: "Plenty",
//     hours: "8:00 AM – 12:00 AM",
//     price: "$$",
//     rating: 4.7,
//     amenities: ["Free Wi-Fi", "Power outlets", "Meeting nook", "All-day food"],
//   },
//   {
//     id: "garden-grounds",
//     name: "Garden Grounds",
//     city: "Sylhet",
//     area: "Zindabazar",
//     image: spot5,
//     tagline: "Outdoor patio under string lights",
//     description:
//       "Work surrounded by ivy and warm string lights. The patio stays open late and the chai is famous in the neighbourhood.",
//     wifi: "50 Mbps",
//     noise: "Moderate",
//     seating: 35,
//     outlets: "Few",
//     hours: "9:00 AM – 11:00 PM",
//     price: "$",
//     rating: 4.5,
//     amenities: ["Free Wi-Fi", "Outdoor seating", "Pet friendly", "Late hours"],
//   },
//   {
//     id: "marble-and-milk",
//     name: "Marble & Milk",
//     city: "Dhaka",
//     area: "Uttara",
//     image: spot6,
//     tagline: "Minimal, modern, and ridiculously good pastries",
//     description:
//       "A bright marble-counter espresso bar with a dedicated quiet wing for working. Croissants flaky enough to make a meeting bearable.",
//     wifi: "150 Mbps",
//     noise: "Moderate",
//     seating: 32,
//     outlets: "Plenty",
//     hours: "7:00 AM – 9:00 PM",
//     price: "$$$",
//     rating: 4.7,
//     amenities: ["Free Wi-Fi", "Power outlets", "Pastries", "Quiet wing"],
//   },
//   {
//     id: "north-end-nook",
//     name: "North End Nook",
//     city: "Dhaka",
//     area: "Mohakhali",
//     image: spot7,
//     tagline: "Tiny espresso bar with a mezzanine made for laptops",
//     description:
//       "A four-seat counter downstairs and a hidden mezzanine upstairs lined with power outlets. Quiet, fast Wi-Fi, and a barista who remembers your order.",
//     wifi: "180 Mbps",
//     noise: "Quiet",
//     seating: 22,
//     outlets: "Plenty",
//     hours: "8:00 AM – 10:00 PM",
//     price: "$$",
//     rating: 4.6,
//     amenities: ["Free Wi-Fi", "Power outlets", "Quiet zone", "Specialty coffee"],
//   },
//   {
//     id: "paper-plane-cafe",
//     name: "Paper Plane Cafe",
//     city: "Dhaka",
//     area: "Bashundhara",
//     image: spot8,
//     tagline: "Bright, plant-filled, and built for long sessions",
//     description:
//       "Skylights, sturdy desks, and bottomless filter coffee. The back room turns into an unofficial coworking space most weekday afternoons.",
//     wifi: "160 Mbps",
//     noise: "Moderate",
//     seating: 50,
//     outlets: "Plenty",
//     hours: "8:30 AM – 11:00 PM",
//     price: "$$",
//     rating: 4.5,
//     amenities: ["Free Wi-Fi", "Power outlets", "Natural light", "All-day food"],
//   },
//   {
//     id: "old-town-grind",
//     name: "Old Town Grind",
//     city: "Dhaka",
//     area: "Old Dhaka",
//     image: spot9,
//     tagline: "Heritage building, slow brews, big windows",
//     description:
//       "Set inside a restored colonial-era house, this cafe pairs slow pour-overs with creaky wooden floors and tall arched windows over the river.",
//     wifi: "70 Mbps",
//     noise: "Quiet",
//     seating: 24,
//     outlets: "Some",
//     hours: "9:00 AM – 9:00 PM",
//     price: "$$",
//     rating: 4.7,
//     amenities: ["Free Wi-Fi", "Heritage building", "Quiet zone", "Tea selection"],
//   },
//   {
//     id: "harbor-house",
//     name: "Harbor House",
//     city: "Chattogram",
//     area: "Khulshi",
//     image: spot10,
//     tagline: "Rooftop with a sea breeze and string lights",
//     description:
//       "An open rooftop with low couches, a covered work nook, and a gentle breeze drifting in from the harbor. Best at golden hour.",
//     wifi: "90 Mbps",
//     noise: "Moderate",
//     seating: 38,
//     outlets: "Some",
//     hours: "10:00 AM – 12:00 AM",
//     price: "$$",
//     rating: 4.6,
//     amenities: ["Free Wi-Fi", "Outdoor seating", "Late hours", "Sea view"],
//   },
//   {
//     id: "the-tide-table",
//     name: "The Tide Table",
//     city: "Chattogram",
//     area: "GEC Circle",
//     image: spot11,
//     tagline: "Minimalist coffee bar in the heart of the city",
//     description:
//       "Concrete counters, single-origin espresso, and a long bench by the window perfect for a focused two-hour block between meetings.",
//     wifi: "140 Mbps",
//     noise: "Quiet",
//     seating: 20,
//     outlets: "Plenty",
//     hours: "8:00 AM – 10:00 PM",
//     price: "$$$",
//     rating: 4.8,
//     amenities: ["Free Wi-Fi", "Power outlets", "Specialty coffee", "Quiet zone"],
//   },
//   {
//     id: "rain-and-rosemary",
//     name: "Rain & Rosemary",
//     city: "Sylhet",
//     area: "Ambarkhana",
//     image: spot12,
//     tagline: "A herb garden, a fireplace, and the slowest mornings",
//     description:
//       "A converted bungalow with a small herb garden out front and a quiet reading room in the back. Cardamom lattes and homemade scones.",
//     wifi: "55 Mbps",
//     noise: "Quiet",
//     seating: 16,
//     outlets: "Some",
//     hours: "8:00 AM – 9:00 PM",
//     price: "$$",
//     rating: 4.8,
//     amenities: ["Free Wi-Fi", "Quiet zone", "Garden", "Pastries"],
//   },
//   {
//     id: "hilltop-haven",
//     name: "Hilltop Haven",
//     city: "Sylhet",
//     area: "Shahjalal Upashahar",
//     image: spot13,
//     tagline: "Wooden cabin vibes with valley views",
//     description:
//       "Built on a slope with floor-to-ceiling windows facing the tea hills. Long tables, warm lamps, and the kind of silence you can actually work in.",
//     wifi: "75 Mbps",
//     noise: "Quiet",
//     seating: 30,
//     outlets: "Plenty",
//     hours: "9:00 AM – 10:00 PM",
//     price: "$$",
//     rating: 4.9,
//     amenities: ["Free Wi-Fi", "Power outlets", "Valley view", "Quiet zone"],
//   },
// ];