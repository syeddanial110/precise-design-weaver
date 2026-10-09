import jacket from "@/assets/p-jacket.jpg";
import pants from "@/assets/p-pants.jpg";
import boot from "@/assets/p-boot.jpg";
import vest from "@/assets/p-vest.jpg";
import winterJ from "@/assets/p-winter.jpg";
import hivis from "@/assets/p-hivis.jpg";
import women from "@/assets/women.jpg";
import winter from "@/assets/winter.jpg";
import macro from "@/assets/macro.jpg";
import embroidery from "@/assets/embroidery.jpg";
import hero from "@/assets/hero.jpg";

export const img = { jacket, pants, boot, vest, winterJ, hivis, women, winter, macro, embroidery, hero };

export const collections: { name: string; img: string; star?: boolean }[] = [
  { name: "Men", img: jacket },
  { name: "Women", img: women },
  { name: "Gear", img: vest },
  { name: "CXS Stretch", img: pants, star: true },
  { name: "CXS Naos", img: winterJ, star: true },
  { name: "CXS Leonis", img: pants, star: true },
  { name: "Work Footwear", img: boot },
  { name: "Hi-Vis", img: hivis },
  { name: "Winter", img: winter },
  { name: "Painters", img: macro },
  { name: "Print & Embroidery", img: embroidery },
];

export type Plate = { name: string; type: string; price: string; img: string; alt: string };

export const plates: Plate[] = [
  { name: "CXS Norfolk", type: "Softshell Jacket", price: "95.99", img: jacket, alt: winterJ },
  { name: "CXS Durham", type: "Jacket", price: "84.99", img: winterJ, alt: jacket },
  { name: "CXS Leonis", type: "Work Pants", price: "109.90", img: pants, alt: macro },
  { name: "CXS Island Saba", type: "S1PS Shoes", price: "129.99", img: boot, alt: boot },
  { name: "CXS Stretch", type: "Winter Jacket", price: "92.99", img: winterJ, alt: winter },
  { name: "CXS Topeka", type: "Vest", price: "44.99", img: vest, alt: jacket },
  { name: "CXS Malone", type: "Quarter Zip", price: "49.90", img: jacket, alt: vest },
];

export const PALATINE = "42.1103° N, 88.0342° W";
