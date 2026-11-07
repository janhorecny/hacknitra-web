"use client";
import { motion, type HTMLMotionProps } from "motion/react";
import { useEffect, type ReactNode } from "react";

export const EASE = [0.32, 0.72, 0, 1] as const;

export const FIELDS = {
  citron: { field: "#EFE04B", ink: "#14231C", dark: false },
  siva: { field: "#D5DADC", ink: "#14231C", dark: false },
  grafit: { field: "#25292C", ink: "#E6EAEC", dark: true },
  ovos: { field: "#F4F1EA", ink: "#14231C", dark: false },
  smrek: { field: "#14231C", ink: "#F4F1EA", dark: true },
  prazenica: { field: "#7A3B22", ink: "#F4F1EA", dark: true },
  korka: { field: "#E2C597", ink: "#14231C", dark: false },
} as const;
export type FieldName = keyof typeof FIELDS;

/** Watches every [data-field] block and repaints the page in the colour of the block in the middle of the screen. */
export function FieldObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const els = [...document.querySelectorAll<HTMLElement>("[data-field]")];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const f = FIELDS[(e.target as HTMLElement).dataset.field as FieldName];
          if (!f) return;
          root.style.setProperty("--field", f.field);
          root.style.setProperty("--ink", f.ink);
          root.dataset.dark = f.dark ? "1" : "0";
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

export function Reveal({ children, delay = 0, y = 28, className, ...rest }: { children: ReactNode; delay?: number; y?: number; className?: string } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Receptúra symbol: a recipe card with a stepped corner tab and a lowercase r cut out of it.
 * Built on a 76 × 84 grid; the card body is the brand, the r is the rule the AI reads.
 */
export function Mark({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 76 84" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M0 0H54V22H76V84H0Z M20 70V46A20 20 0 0 1 40 26H50V40H41A6 6 0 0 0 35 46V70Z"
      />
    </svg>
  );
}

/** Symbol + wordmark, baseline aligned: the symbol sits on the baseline and is exactly as tall as the ascender of Cabinet Grotesk (0.67 em). */
export function Logo({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-[0.2em] leading-none ${className}`} style={{ fontSize: size }}>
      <Mark className="h-[0.67em] w-auto shrink-0 self-baseline" />
      <span className="wordmark leading-none">receptúra</span>
    </span>
  );
}

/** Product lockup with the GALTON endorsement. GALTON is the original wordmark file (black or white only), sized to the cap height of “by”. */
export function Lockup({ size = 22, tone = "auto", className = "" }: { size?: number; tone?: "auto" | "dark" | "light"; className?: string }) {
  const g = "h-[0.3em] w-auto shrink-0 self-baseline";
  return (
    <span className={`inline-flex items-baseline leading-none ${className}`} style={{ fontSize: size }}>
      <Logo size={size} />
      <span className="ml-[0.62em] mr-[0.24em] text-[0.42em] font-medium leading-none">by</span>
      {tone !== "dark" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="https://galton-ai-assets.vercel.app/brand/logos/galton-wordmark-black.svg" alt="GALTON Brands" className={`${g} ${tone === "auto" ? "g-on-light" : ""}`} />
      )}
      {tone !== "light" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="https://galton-ai-assets.vercel.app/brand/logos/galton-wordmark-white.svg" alt="GALTON Brands" className={`${g} ${tone === "auto" ? "g-on-dark" : ""}`} />
      )}
    </span>
  );
}

export function Button({ href, children, variant = "solid", className = "" }: { href: string; children: ReactNode; variant?: "solid" | "ghost"; className?: string }) {
  const v =
    variant === "solid"
      ? "bg-ink text-field hover:-translate-y-0.5"
      : "text-ink shadow-[inset_0_0_0_1.5px_var(--ink)] hover:bg-ink hover:text-field";
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[16px] font-medium leading-none transition-[translate,background-color,color,scale,box-shadow] duration-500 ease-[var(--ease-expo)] active:scale-[0.97] ${v} ${className}`}
    >
      {children}
      <span className="inline-block transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1">→</span>
    </a>
  );
}

/** A full colour field. The page itself repaints to `field`; this block only marks where it starts and ends. */
export function Field({ name, id, className = "", children }: { name: FieldName; id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} data-field={name} className={`relative ${className}`}>
      {children}
    </section>
  );
}
