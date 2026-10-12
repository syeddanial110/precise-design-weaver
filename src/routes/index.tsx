import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  TopBar, Header, MenuOverlay, Hero, IndexSection, PlateGallery, Anatomy,
  HiVis, Route as RouteSection, Winter, Footwear, Women, Proof, Bulk, Journal, Newsletter, Footer,
} from "@/components/site/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Euro Work Wear — European precision. American jobsite." },
      { name: "description", content: "U.S. distributor of quality European workwear. CXS jackets, work pants, hi-vis and safety footwear. Palatine, Illinois." },
      { property: "og:title", content: "Euro Work Wear — European precision. American jobsite." },
      { property: "og:description", content: "Quality European workwear, stocked in Palatine, IL." },
    ],
  }),
  component: Index,
});

function Index() {
  const [menu, setMenu] = useState(false);
  return (
    <div className="relative">
      <TopBar />
      <Header onMenu={() => setMenu(true)} />
      <MenuOverlay open={menu} onClose={() => setMenu(false)} />
      <main>
        <Hero />
        <IndexSection />
        <PlateGallery />
        <Anatomy />
        <HiVis />
        <RouteSection />
        <Winter />
        <Footwear />
        <Women />
        <Proof />
        <Bulk />
        <Journal />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
