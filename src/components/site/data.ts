import bedford from "@/assets/products/bedford.png";
import durham2 from "@/assets/products/durham-2.jpg";
import durham from "@/assets/products/durham.jpg";
import halifax2 from "@/assets/products/halifax-2.jpg";
import halifax from "@/assets/products/halifax.png";
import leonis2 from "@/assets/products/leonis-2.jpg";
import leonis from "@/assets/products/leonis.jpg";
import malamute from "@/assets/products/malamute.png";
import malone2 from "@/assets/products/malone-2.jpg";
import malone from "@/assets/products/malone.png";
import naos2 from "@/assets/products/naos-2.jpg";
import naos from "@/assets/products/naos.png";
import nikolas from "@/assets/products/nikolas.png";
import norfolk2 from "@/assets/products/norfolk-2.jpg";
import norfolk from "@/assets/products/norfolk.jpg";
import saba2 from "@/assets/products/saba-2.jpg";
import saba from "@/assets/products/saba.png";
import senja from "@/assets/products/senja.png";
import stratus from "@/assets/products/stratus.png";
import stretchPants2 from "@/assets/products/stretchPants-2.jpg";
import stretchPants from "@/assets/products/stretchPants.jpg";
import stretchWinter2 from "@/assets/products/stretchWinter-2.jpg";
import stretchWinter from "@/assets/products/stretchWinter.png";
import stretchWinterPants from "@/assets/products/stretchWinterPants.jpg";
import topeka2 from "@/assets/products/topeka-2.jpg";
import topeka from "@/assets/products/topeka.png";
import womenPants2 from "@/assets/products/womenPants-2.jpg";
import womenPants from "@/assets/products/womenPants.jpg";
import women from "@/assets/women.jpg";
import winter from "@/assets/winter.jpg";
import macro from "@/assets/macro.jpg";
import embroidery from "@/assets/embroidery.jpg";
import hero from "@/assets/hero.jpg";

export const img = { women, winter, macro, embroidery, hero };

export const products = {
  norfolk, norfolk2, durham, durham2, leonis, leonis2, saba, saba2, stretchWinter, stretchWinter2,
  topeka, topeka2, malone, malone2, stretchPants, stretchPants2, halifax, halifax2, naos, naos2,
  womenPants, womenPants2, bedford, stretchWinterPants, nikolas, stratus, senja, malamute,
};

export const collections: { name: string; img: string; star?: boolean }[] = [
  { name: "Men", img: norfolk },
  { name: "Women", img: womenPants },
  { name: "Gear", img: topeka },
  { name: "CXS Stretch", img: stretchPants, star: true },
  { name: "CXS Naos", img: naos, star: true },
  { name: "CXS Leonis", img: leonis, star: true },
  { name: "Work Footwear", img: saba },
  { name: "Hi-Vis", img: halifax },
  { name: "Winter", img: winter },
  { name: "Painters", img: macro },
  { name: "Print & Embroidery", img: embroidery },
];

export type Plate = { name: string; type: string; price: string; img: string; alt: string };

export const plates: Plate[] = [
  { name: "CXS Norfolk", type: "Softshell Jacket", price: "95.99", img: norfolk, alt: norfolk2 },
  { name: "CXS Durham", type: "Jacket", price: "84.99", img: durham, alt: durham2 },
  { name: "CXS Leonis", type: "Work Pants", price: "109.90", img: leonis, alt: leonis2 },
  { name: "CXS Island Saba", type: "S1PS Shoes", price: "129.99", img: saba, alt: saba2 },
  { name: "CXS Stretch", type: "Winter Jacket", price: "92.99", img: stretchWinter, alt: stretchWinter2 },
  { name: "CXS Topeka", type: "Vest", price: "44.99", img: topeka, alt: topeka2 },
  { name: "CXS Malone", type: "Quarter Zip", price: "49.90", img: malone, alt: malone2 },
];

export const PALATINE = "42.1103° N, 88.0342° W";
