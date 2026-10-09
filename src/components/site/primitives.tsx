import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

export function useInView<T extends Element>(threshold = 0.2, once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);
  return [ref, inView] as const;
}

/** Text line rising from a mask */
export function Rise({
  children,
  as: Tag = "span",
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.1);
  return (
    <Tag ref={ref} className={`block overflow-hidden ${className}`}>
      <span
        className={`reveal-rise block ${inView ? "is-in" : ""}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </span>
    </Tag>
  );
}

/** Image revealed by clip-path wipe */
export function Wipe({
  src,
  alt,
  className = "",
  imgClassName = "",
  width,
  height,
  eager,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  width: number;
  height: number;
  eager?: boolean;
}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className={`reveal-wipe overflow-hidden ${inView ? "is-in" : ""} ${className}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}

/** Hairline that extends as the section enters */
export function Rule({ className = "" }: { className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.5);
  return (
    <div ref={ref} className={`h-px w-full bg-current/25 reveal-line ${inView ? "is-in" : ""} ${className}`} />
  );
}

export function Reg({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute font-mono text-xs leading-none opacity-50 ${className}`}>
      +
    </span>
  );
}

export function SectionHead({
  index,
  label,
  right,
}: {
  index: string;
  label: string;
  right?: ReactNode;
}) {
  return (
    <div className="mb-14">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 pb-3">
        <span className="mono">
          {index} / {label}
        </span>
        <span className="mono opacity-60">{right}</span>
      </div>
      <Rule />
    </div>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 40 28" className="h-6 w-auto" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M2 26 L14 2 L20 14" />
        <path d="M8 18 H17" />
        <path d="M38 2 H24 L18 26 H34" />
        <path d="M22 14 H32" />
      </svg>
      <span className="font-display text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ fontStretch: "125%" }}>
        Euro Work Wear
      </span>
    </span>
  );
}
