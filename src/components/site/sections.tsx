import { useEffect, useRef, useState } from "react";
import { Search, User, ShoppingBag, ArrowRight, ArrowUpRight } from "lucide-react";
import { collections, img, plates, PALATINE } from "./data";
import { Logo, Reg, Rise, Rule, SectionHead, Wipe, useInView } from "./primitives";
import store from "@/assets/store.jpg";

const wrap = "mx-auto w-full max-w-[1440px] px-5 md:px-10";

/* ---------- Top bar + header ---------- */
export function TopBar() {
  return (
    <div className="bg-graphite text-bone">
      <div className={`${wrap} grid h-8 grid-cols-[minmax(0,1fr)_auto] items-center gap-4`}>
        <span className="mono truncate">Free U.S. shipping $99+ · Exclusions apply</span>
        <span className="mono hidden gap-5 sm:flex">
          <span>EN / <span className="opacity-50">ES / PL</span></span>
          <span>USD / <span className="opacity-50">CAD</span></span>
        </span>
      </div>
    </div>
  );
}

const nav = ["Men", "Women", "Gear", "Collections", "Footwear", "Print & Embroidery", "Catalog", "Location"];

export function Header({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="absolute inset-x-0 top-8 z-30 text-bone">
      <div className={`${wrap} grid h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-6`}>
        <a href="/" aria-label="Euro Work Wear home"><Logo /></a>
        <nav className="hidden justify-center gap-7 lg:flex">
          {nav.map((n) => (
            <button key={n} onClick={onMenu} className="mono draw pb-0.5">{n}</button>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <Search className="h-4 w-4" strokeWidth={1.25} />
          <User className="hidden h-4 w-4 sm:block" strokeWidth={1.25} />
          <ShoppingBag className="h-4 w-4" strokeWidth={1.25} />
          <button onClick={onMenu} className="mono border border-current/50 px-3 py-1.5 lg:hidden">Index</button>
        </div>
      </div>
    </header>
  );
}

/* ---------- Star chart for CXS collections ---------- */
function StarChart({ seed }: { seed: number }) {
  const pts = Array.from({ length: 5 }, (_, i) => {
    const a = (seed * 37 + i * 71) % 100;
    const b = (seed * 53 + i * 29) % 100;
    return [8 + (a / 100) * 84, 6 + (b / 100) * 28];
  });
  return (
    <svg viewBox="0 0 100 40" className="h-8 w-20" aria-hidden>
      <polyline points={pts.map((p) => p.join(",")).join(" ")} fill="none" stroke="currentColor" strokeWidth="0.5" />
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.3" fill="currentColor" />)}
    </svg>
  );
}

/* ---------- Collections index with cursor-follow image ---------- */
export function CollectionIndex({ dark = false, onPick }: { dark?: boolean; onPick?: () => void }) {
  const [hover, setHover] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const counts = [212, 86, 54, 41, 18, 23, 37, 29, 44, 12, 9];
  return (
    <div onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })} onMouseLeave={() => setHover(null)}>
      <ul>
        {collections.map((c, i) => (
          <li key={c.name} className="border-b border-current/15">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onPick?.(); }}
              onMouseEnter={() => setHover(i)}
              className="group grid grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-4 py-3 md:grid-cols-[5rem_minmax(0,1fr)_auto]"
            >
              <span className={`mono transition-colors ${hover === i ? "text-hivis" : "opacity-50"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`display truncate text-[9vw] transition-[letter-spacing,opacity] duration-700 md:text-[5.2vw] ${hover !== null && hover !== i ? "opacity-25" : ""}`}>
                {c.name}
              </span>
              <span className={`flex items-center gap-3 transition-opacity duration-500 ${hover === i ? "opacity-100" : "opacity-0"}`}>
                {c.star && <StarChart seed={i + 3} />}
                <span className="mono hidden md:inline">{counts[i]}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      {hover !== null && (
        <div
          className="pointer-events-none fixed z-50 hidden w-[220px] md:block"
          style={{ left: pos.x + 28, top: pos.y - 150, transition: "left 0.35s var(--ease-weight), top 0.35s var(--ease-weight)" }}
        >
          <img src={collections[hover].img} alt="" className="aspect-[3/4] w-full object-cover" />
          <div className={`mono mt-2 flex justify-between ${dark ? "text-bone" : ""}`}>
            <span>{collections[hover].name}</span><span>{counts[hover]}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);
  return (
    <div
      className={`fixed inset-0 z-40 overflow-y-auto bg-graphite text-bone transition-[clip-path] duration-1000 ${open ? "[clip-path:inset(0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"}`}
      style={{ transitionTimingFunction: "var(--ease-weight)" }}
    >
      <div className={`${wrap} grid h-24 grid-cols-[minmax(0,1fr)_auto] items-center`}>
        <Logo />
        <button onClick={onClose} className="mono draw">Close ×</button>
      </div>
      <div className={`${wrap} pb-16`}>
        <div className="mono mb-6 opacity-50">Index / 11 collections</div>
        <CollectionIndex dark onPick={onClose} />
        <div className="mono mt-10 grid grid-cols-2 gap-4 opacity-60 md:grid-cols-4">
          <span>Catalog</span><span>Location</span><span>Account</span><span>{PALATINE}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- 1. Hero ---------- */
export function Hero() {
  return (
    <section className="crop relative h-[100svh] min-h-[640px] overflow-hidden bg-graphite text-bone">
      <img src={img.hero} alt="Tradesperson on an overcast job site" width={1920} height={1088} className="slow-zoom absolute inset-0 h-full w-full object-cover opacity-80" />
      <div className="absolute inset-0 bg-graphite/25" />
      <div className="absolute inset-x-0 bottom-0">
        <div className={`${wrap} grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 pb-8`}>
          <p className="mono measure">European precision.<br />American jobsite.</p>
          <div className="flex items-center gap-3">
            <span className="mono">Scroll / 01–08</span>
            <span className="block h-12 w-px bg-bone/60" />
          </div>
        </div>
        <h1 className="display -mb-[2.2vw] whitespace-nowrap pl-3 text-[14.5vw] font-light text-bone/95">
          <Rise>Euro Work Wear</Rise>
        </h1>
      </div>
    </section>
  );
}

/* ---------- 2. Index section ---------- */
export function IndexSection() {
  return (
    <section className={`${wrap} section-gap`}>
      <SectionHead index="01" label="Index" right="Hover to preview" />
      <div className="grid gap-10 md:grid-cols-12">
        <p className="measure text-sm text-caption md:col-span-3">
          Eleven collections. Cut in Europe, stocked in Palatine.
        </p>
        <div className="md:col-span-9"><CollectionIndex /></div>
      </div>
    </section>
  );
}

/* ---------- 3. Plate gallery ---------- */
function PlateCard({ p, n }: { p: (typeof plates)[number]; n: number }) {
  return (
    <figure className="group w-[72vw] shrink-0 snap-start sm:w-[340px]">
      <div className="relative aspect-[3/4] border border-graphite/20 bg-plate">
        <Reg className="-left-[5px] -top-[7px]" />
        <Reg className="-bottom-[7px] -right-[4px]" />
        <img src={p.img} alt={`${p.name} ${p.type}`} loading="lazy" className="absolute inset-0 h-full w-full object-contain p-8 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />
        <img src={p.alt} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      </div>
      <figcaption className="mono mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-3">
        <span className="truncate">
          <span className="transition-colors group-hover:text-hivis group-hover:bg-graphite">Plate {String(n).padStart(2, "0")}</span>
          {" / "}{p.name} / {p.type}
        </span>
        <span className="text-right">{p.price} USD</span>
      </figcaption>
    </figure>
  );
}

export function PlateGallery() {
  return (
    <section className="section-gap overflow-hidden">
      <div className={wrap}>
        <SectionHead index="02" label="Plates" right="07 objects / Drag →" />
        <div className="mb-12 grid md:grid-cols-12">
          <h2 className="display text-[11vw] md:col-span-8 md:col-start-5 md:text-[7vw]"><Rise>Engineered</Rise><Rise delay={120}>objects</Rise></h2>
        </div>
      </div>
      <div className="no-scrollbar flex snap-x gap-8 overflow-x-auto pl-5 pr-10 md:pl-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))]">
        {plates.map((p, i) => <PlateCard key={i} p={p} n={i + 1} />)}
      </div>
    </section>
  );
}

/* ---------- 4. Anatomy ---------- */
const anatomy = [
  { n: 1, label: "Waist", x: 50, y: 7, side: "l" },
  { n: 2, label: "Holster pockets", x: 30, y: 18, side: "l" },
  { n: 3, label: "Thigh pocket", x: 71, y: 36, side: "r" },
  { n: 4, label: "Knee", x: 36, y: 58, side: "l" },
  { n: 5, label: "Stitching", x: 64, y: 72, side: "r" },
  { n: 6, label: "Fabric", x: 42, y: 88, side: "l" },
] as const;

export function Anatomy() {
  return (
    <section className="section-gap relative bg-graphite text-bone">
      <div className={wrap}>
        <SectionHead index="03" label="Anatomy of a garment" right="CXS Stretch / Men's Work Pants / 69.99 USD" />
        <div className="relative mx-auto aspect-[3/4] max-w-[560px]">
          <img src={img.pants} alt="CXS Stretch Men's Work Pants" loading="lazy" className="h-full w-full object-contain invert-0" style={{ filter: "contrast(1.05)" }} />
          {anatomy.map((a) => (
            <div key={a.n} className="absolute" style={{ left: `${a.x}%`, top: `${a.y}%` }}>
              <span className="absolute -left-[4px] -top-[4px] block h-2 w-2 rounded-full bg-hivis" />
              <span className={`absolute top-0 block h-px bg-bone/60 ${a.side === "l" ? "right-1 w-[min(32vw,260px)]" : "left-1 w-[min(32vw,260px)]"}`} />
              <span className={`mono absolute -top-5 whitespace-nowrap ${a.side === "l" ? "right-[min(32vw,260px)] pr-1" : "left-[min(32vw,260px)] pl-1"}`}>
                {String(a.n).padStart(2, "0")} {a.label}
                <span className="block opacity-50">[Spec to confirm]</span>
              </span>
            </div>
          ))}
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-12">
          <p className="measure text-sm text-bone/70 md:col-span-4 md:col-start-9">
            One garment, read closely. Details shown pending product spec.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. Macro strip ---------- */
export function MacroStrip() {
  return (
    <section className="pt-[160px]">
      <Wipe src={img.macro} alt="Fabric and stitching close-up" width={1920} height={640} className="h-[38vw] max-h-[520px] min-h-[220px]" />
      <div className={`${wrap} mono mt-3 text-caption`}>OEKO-TEX Standard 100 / Tested free from harmful chemicals</div>
    </section>
  );
}

/* ---------- 6. Hi-Vis takeover ---------- */
export function HiVis() {
  const [ref, inView] = useInView<HTMLElement>(0.45, false);
  return (
    <section
      ref={ref}
      className={`mt-[160px] min-h-[100svh] transition-colors duration-[1400ms] ${inView ? "bg-hivis" : "bg-bone"}`}
      style={{ transitionTimingFunction: "var(--ease-weight)" }}
    >
      <div className={`${wrap} py-24`}>
        <SectionHead index="04" label="Hi-Vis" right="Seen first" />
        <div className="grid items-end gap-10 md:grid-cols-12">
          <h2 className="display text-[22vw] md:col-span-7 md:text-[15vw]">Hi<br />Vis</h2>
          <div className="grid grid-cols-2 gap-6 md:col-span-5">
            {[
              { n: "CXS Bedford", t: "3-in-1", p: "159.90", i: img.hivis },
              { n: "CXS Halifax", t: "Shell", p: "79.90", i: img.hivis },
            ].map((x, k) => (
              <figure key={k} className={k === 1 ? "mt-24" : ""}>
                <div className="aspect-[3/4] border border-graphite/30">
                  <img src={x.i} alt={`${x.n} ${x.t}`} loading="lazy" className="h-full w-full object-contain p-4 mix-blend-multiply" />
                </div>
                <figcaption className="mono mt-2 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                  <span className="truncate">{x.n} / {x.t}</span><span>{x.p} USD</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. Europe to Palatine ---------- */
export function Route() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const v = 1 - (r.top + r.height * 0.3) / window.innerHeight;
      setP(Math.max(0, Math.min(1, v * 1.4)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <section className={`${wrap} section-gap`}>
      <SectionHead index="05" label="From Europe to Palatine" right="Route / EU → IL" />
      <div ref={ref} className="relative mb-20 h-[180px]">
        <svg viewBox="0 0 1000 180" preserveAspectRatio="none" className="h-full w-full overflow-visible">
          <path d="M20 120 C 300 10, 650 10, 980 110" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - p} />
          <circle cx="20" cy="120" r="3" fill="currentColor" />
          <circle cx="980" cy="110" r="4" className="fill-steel" style={{ opacity: p > 0.98 ? 1 : 0, transition: "opacity .6s" }} />
        </svg>
        <span className="mono absolute bottom-0 left-0">Europe<br /><span className="opacity-50">50.1109° N, 8.6821° E</span></span>
        <span className="mono absolute bottom-0 right-0 text-right">Palatine, IL<br /><span className="opacity-50">{PALATINE}</span></span>
      </div>
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4 md:col-start-2">
          <h2 className="display-cond mb-8 text-6xl md:text-7xl"><Rise>Chosen</Rise><Rise delay={100}>by hand</Rise></h2>
          <p className="measure text-base leading-relaxed">
            We are a U.S. distributor of quality European workwear. Cut, tested and chosen for people who work with their hands.
          </p>
          <p className="mono mt-8 text-caption">855 W Northwest Hwy<br />Palatine, IL 60067</p>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Wipe src={store} alt="Euro Work Wear store in Palatine" width={1280} height={960} className="aspect-[4/3]" />
          <div className="mono mt-2 text-caption">Fig. 05 / Storefront / Palatine</div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 8a. Winter split ---------- */
export function Winter() {
  return (
    <section className="grid md:grid-cols-2">
      <div className="relative h-[80svh] md:sticky md:top-0 md:h-[100svh]">
        <img src={img.winter} alt="Worker in winter workwear" loading="lazy" className="h-full w-full object-cover" />
        <h2 className="display absolute bottom-6 left-5 text-[16vw] text-bone md:text-[9vw]">Winter</h2>
      </div>
      <div className="flex flex-col gap-32 px-5 py-32 md:px-16">
        <span className="mono">06 / Winter</span>
        {[
          { n: "CXS Stretch", t: "Winter Pants", p: "86.99", i: img.pants },
          { n: "CXS Sirius", t: "Nikolas", p: "89.90", i: img.winterJ },
        ].map((x, k) => (
          <figure key={k} className={k ? "ml-auto w-[70%]" : "w-[78%]"}>
            <div className="aspect-[3/4] bg-plate"><img src={x.i} alt={`${x.n} ${x.t}`} loading="lazy" className="h-full w-full object-contain p-8 mix-blend-multiply" /></div>
            <figcaption className="mono mt-2 grid grid-cols-[minmax(0,1fr)_auto] gap-2"><span>{x.n} / {x.t}</span><span>{x.p} USD</span></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ---------- 8b. Footwear strip ---------- */
export function Footwear() {
  const boots = [
    { n: "CXS Universe Stratus S3S", p: "149.90" },
    { n: "CXS Land Senja S3S", p: "79.90", was: "129.90" },
    { n: "CXS Dog Malamute S3", p: "114.90", was: "154.90" },
    { n: "CXS Island Saba S1PS", p: "129.99" },
  ];
  return (
    <section className="section-gap bg-bone-deep">
      <div className={wrap}><SectionHead index="07" label="Work footwear" right="Strip / 04" /></div>
      <div className="no-scrollbar flex overflow-x-auto">
        {boots.map((b, i) => (
          <figure key={i} className="w-[80vw] shrink-0 border-r border-graphite/15 px-8 sm:w-[44vw] lg:w-[30vw]">
            <img src={img.boot} alt={b.n} loading="lazy" className="aspect-[4/3] w-full object-contain mix-blend-multiply" />
            <figcaption className="mono mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-3">
              <span>{b.n}</span>
              <span className="text-right">{b.p} USD{b.was && <span className="block line-through opacity-50">{b.was}</span>}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ---------- 9. Women ---------- */
export function Women() {
  return (
    <section className={`${wrap} section-gap`}>
      <SectionHead index="08" label="Women's" />
      <div className="grid items-end gap-10 md:grid-cols-12">
        <Wipe src={img.women} alt="Woman in CXS softshell" width={960} height={1280} className="aspect-[3/4] md:col-span-5" />
        <div className="md:col-span-4 md:col-start-8">
          <h2 className="display-cond mb-8 text-6xl md:text-8xl">Same<br />standard</h2>
          <p className="measure mb-16 text-sm text-caption">Cut for women. Built to the same spec.</p>
          <figure className="w-1/2">
            <div className="aspect-[3/4] bg-plate"><img src={img.jacket} alt="Women's softshell" loading="lazy" className="h-full w-full object-contain p-4 mix-blend-multiply" /></div>
            <figcaption className="mono mt-2">Plate W1 / Softshell</figcaption>
          </figure>
          <a href="#" className="mono draw mt-10 inline-flex items-center gap-2">Shop women <ArrowRight className="h-3 w-3" /></a>
        </div>
      </div>
    </section>
  );
}

/* ---------- 10. Proof ---------- */
export function Proof() {
  const items = [
    { big: "4.95", cap: "21 verified reviews" },
    { big: "Top 5", cap: "Clothing stores, Lake County IL / Business Rate" },
    { big: "#1066", cap: "Chicago Build Expo 2026 / McCormick Place / Booth" },
  ];
  return (
    <section className="section-gap bg-graphite text-bone">
      <div className={wrap}>
        <SectionHead index="09" label="Proof in type" right="As seen in U.S. Business News" />
        <div className="grid gap-16 md:grid-cols-3">
          {items.map((x) => (
            <div key={x.big}>
              <div className="display text-[18vw] font-light md:text-[8.5vw]">{x.big}</div>
              <Rule className="mt-6" />
              <p className="mono mt-3 measure opacity-60">{x.cap}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 11. Bulk ---------- */
export function Bulk() {
  return (
    <section className={`${wrap} section-gap`}>
      <SectionHead index="10" label="Bulk / Print & Embroidery" />
      <div className="grid items-start gap-10 md:grid-cols-12">
        <span className="outline-num text-[30vw] md:col-span-4 md:text-[16vw]">10</span>
        <div className="md:col-span-4">
          <h2 className="display-cond text-5xl md:text-6xl">Outfitting a crew?</h2>
          <a href="mailto:info@euroworkwears.com" className="mono draw-hivis mt-8 inline-block text-sm">info@euroworkwears.com</a>
        </div>
        <Wipe src={img.embroidery} alt="Embroidery detail" width={1024} height={1024} className="aspect-square w-40 md:col-span-2 md:col-start-11 md:mt-48 md:w-full" />
      </div>
    </section>
  );
}

/* ---------- 12. Journal ---------- */
export function Journal() {
  const posts = [
    { t: "Make your gear last", k: "Care", i: img.macro, c: "md:col-span-5 aspect-[4/5]" },
    { t: "CXS campaign films", k: "Film", i: img.hero, c: "md:col-span-6 md:col-start-7 aspect-[21/9] md:mt-40" },
    { t: "Chicago Build Expo", k: "Event", i: store, c: "md:col-span-3 md:col-start-4 aspect-square" },
  ];
  return (
    <section className={`${wrap} section-gap`}>
      <SectionHead index="11" label="Journal" right="03 entries" />
      <div className="grid gap-14 md:grid-cols-12">
        {posts.map((p, i) => (
          <a key={p.t} href="#" className={`group block ${p.c.split(" ").filter((c) => c.startsWith("md:")).join(" ")}`}>
            <div className={`overflow-hidden ${p.c.split(" ").filter((c) => c.startsWith("aspect")).join(" ")}`}>
              <img src={p.i} alt={p.t} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.03]" />
            </div>
            <div className="mono mt-3 grid grid-cols-[minmax(0,1fr)_auto]"><span>{String(i + 1).padStart(2, "0")} / {p.k}</span><ArrowUpRight className="h-3 w-3" /></div>
            <h3 className="display-cond mt-2 text-3xl"><span className="draw">{p.t}</span></h3>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------- 13. Newsletter ---------- */
export function Newsletter() {
  return (
    <section className={`${wrap} pb-[160px]`}>
      <Rule />
      <form onSubmit={(e) => e.preventDefault()} className="grid items-end gap-6 pt-10 md:grid-cols-12">
        <p className="display-cond text-4xl md:col-span-5">10% off your first eligible order.</p>
        <input type="email" required placeholder="Email address" className="mono border-0 border-b border-graphite/40 bg-transparent py-3 outline-none placeholder:text-caption focus:border-graphite md:col-span-5 md:col-start-7" />
        <button className="mono draw-hivis justify-self-start py-3 md:col-span-1">Join →</button>
      </form>
    </section>
  );
}

/* ---------- 14. Footer ---------- */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-graphite text-bone">
      <div className={`${wrap} pt-24`}>
        <svg viewBox="0 0 1000 60" preserveAspectRatio="none" className="mb-16 h-14 w-full">
          <path d="M10 50 C 300 0, 700 0, 990 45" fill="none" stroke="currentColor" strokeOpacity=".4" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mono mt-6 opacity-60">855 W Northwest Highway<br />Palatine, IL 60067<br />{PALATINE}</p>
          </div>
          <div className="mono flex flex-col gap-2 md:col-span-3">
            <a href="mailto:palatineil@euroworkwears.com" className="draw self-start">palatineil@euroworkwears.com</a>
            <a href="tel:2244511773" className="draw self-start">224-451-1773</a>
          </div>
          <div className="mono flex flex-col gap-2 opacity-70 md:col-span-2">
            <a href="#" className="draw self-start">Shipping</a><a href="#" className="draw self-start">Returns</a><a href="#" className="draw self-start">Privacy</a><a href="#" className="draw self-start">Terms</a>
          </div>
          <div className="mono flex flex-col gap-2 opacity-70 md:col-span-3">
            <a href="#" className="draw self-start">Instagram</a><a href="#" className="draw self-start">Facebook</a>
            <span className="mt-4 flex flex-wrap gap-2">
              {["Visa", "MC", "Amex", "PayPal", "Apple Pay"].map((x) => <span key={x} className="border border-bone/30 px-2 py-0.5">{x}</span>)}
            </span>
          </div>
        </div>
        <div className="mono mt-20 opacity-50">© Euro Work Wear 2026</div>
      </div>
      <div className="display -mb-[3.2vw] mt-6 whitespace-nowrap text-center text-[15.5vw] font-light text-bone/90">Euro Work Wear</div>
    </footer>
  );
}
