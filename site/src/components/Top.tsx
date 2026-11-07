"use client";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Button, EASE, Lockup } from "./ui";

const LINKS = [
  ["#problem", "Problém"],
  ["#riesenie", "Riešenie"],
  ["#postup", "Ako to funguje"],
  ["#pre-koho", "Pre koho"],
  ["#dokaz", "Výsledky"],
  ["#ukazky", "Ukážky"],
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-700 ease-[var(--ease-out)] ${
          scrolled ? "bg-field shadow-[0_1px_0_var(--ink)]" : ""
        }`}
      >
        <div className="wrap flex items-center justify-between py-4 md:py-5">
          <a href="#top" aria-label="Receptúra by GALTON Brands, úvod">
            <Lockup size={25} />
          </a>
          <nav className="hidden items-center gap-7 xl:flex" aria-label="Hlavná navigácia">
            {LINKS.map(([h, l]) => (
              <a key={h} href={h} className="draw navlink">
                {l}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#ukazky" className="hidden rounded-full bg-ink px-5 py-3 text-[15px] font-medium leading-none text-field transition-[scale] duration-300 active:scale-95 md:inline-block">
              Pozrieť demo
            </a>
            <button type="button" onClick={() => setOpen(true)} className="rounded-full px-4 py-3 text-[15px] font-medium leading-none shadow-[inset_0_0_0_1.5px_var(--ink)] xl:hidden" aria-expanded={open}>
              Menu
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-smrek text-ovos"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="wrap flex items-center justify-between py-4">
              <Lockup size={22} tone="dark" />
              <button type="button" onClick={() => setOpen(false)} className="rounded-full px-4 py-3 text-[15px] font-medium leading-none shadow-[inset_0_0_0_1.5px_#F4F1EA]">
                Zavrieť
              </button>
            </div>
            <ul className="wrap mt-auto pb-10">
              {LINKS.map(([h, l], i) => (
                <li key={h} className="overflow-hidden border-t border-ovos/30">
                  <motion.a
                    href={h}
                    onClick={() => setOpen(false)}
                    className="display caps block py-4 text-[11vw]"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.12 + i * 0.05, ease: EASE }}
                  >
                    {l}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Hero() {
  const sec = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const slot = useRef<HTMLDivElement>(null);
  const band = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState<{ W: number; H: number; L: number; T: number; w: number; h: number; desk: boolean } | null>(null);

  useEffect(() => {
    const measure = () => {
      if (!stage.current || !slot.current) return;
      const desk = window.matchMedia("(min-width: 768px)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setDims({
        W: stage.current.clientWidth,
        H: stage.current.clientHeight,
        L: slot.current.offsetLeft,
        T: slot.current.offsetTop,
        w: slot.current.offsetWidth,
        h: slot.current.offsetHeight,
        desk,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stage.current) ro.observe(stage.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sec, offset: ["start start", "end end"] });
  const e = useTransform(scrollYProgress, [0, 0.8], [0, 1], { clamp: true, ease: (t) => 1 - Math.pow(1 - t, 3) });
  const k = (fn: (d: NonNullable<typeof dims>, v: number) => number) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(e, (v) => (dims ? fn(dims, dims.desk ? v : 1) : 0));
  const top = k((d, v) => d.T * v);
  const left = k((d, v) => d.L * v);
  const width = k((d, v) => d.W + (d.w - d.W) * v);
  const height = k((d, v) => d.H + (d.h - d.H) * v);
  const radius = k((d, v) => (d.w / 2) * v);
  const textO = useTransform(e, [0.45, 0.95], [0, 1]);
  const textX = useTransform(e, [0.45, 1], [-60, 0]);
  const introO = useTransform(e, [0, 0.25], [1, 0]);
  const introY = useTransform(e, [0, 0.25], [0, 30]);
  const isDesk = dims?.desk ?? true;

  const { scrollYProgress: bandP } = useScroll({ target: band, offset: ["start end", "end start"] });
  const x = useTransform(bandP, [0, 1], ["2%", "-38%"]);
  const xRev = useTransform(bandP, [0, 1], ["-40%", "0%"]);

  return (
    <>
      <section ref={sec} id="top" data-field="citron" className="relative md:h-[210dvh]">
        <div ref={stage} className="relative overflow-hidden pt-24 md:sticky md:top-0 md:h-[100dvh] md:pt-28">
          <div className="wrap grid grid-cols-12 gap-x-6 gap-y-10 md:h-full md:pb-16">
            <motion.div style={isDesk ? { opacity: textO, x: textX } : { opacity: 1, x: 0 }} className="col-span-12 flex flex-col justify-center md:col-span-7 lg:col-span-6">
              <p className="eyebrow">Pre pražiarne, pekárne, nápojové a potravinové značky</p>
              <h1 className="display caps mt-6 text-[clamp(40px,5vw,84px)]">Všetko, čo vytvoríte s&nbsp;AI, chutí ako vaša značka.</h1>
              <p className="mt-7 max-w-[30ch] text-[clamp(19px,1.6vw,24px)] leading-[1.3]">Pravidlá značky, ktoré AI číta sama. Zapíšete ich raz a platia v každom nástroji.</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href="#ukazky">Pozrieť demo</Button>
                <Button href="mailto:demo@receptura.example?subject=Demo%20hovor" variant="ghost">
                  Dohodnúť demo hovor
                </Button>
              </div>
              <p className="mt-10 flex items-baseline gap-3 text-[15px]">
                <span className="display shrink-0 whitespace-nowrap text-[30px] tracking-[-0.03em]">99,8 %</span>
                výstupov dodrží pravidlá značky. 200 testov na 3 značkách.
              </p>
            </motion.div>
            {/* the slot the video lands in */}
            <div ref={slot} className="col-span-12 aspect-[4/5] md:col-span-5 md:col-start-8 md:aspect-auto md:h-full md:max-h-[640px] md:self-center lg:col-span-4 lg:col-start-9" />
          </div>

          <motion.div
            className="absolute overflow-hidden transition-opacity duration-500"
            style={{ top, left, width, height, borderTopLeftRadius: radius, borderTopRightRadius: radius, opacity: dims ? 1 : 0 }}
          >
            <video className="absolute inset-0 h-full w-full object-cover" src="/video/hero.mp4" poster="/img/v3/b-hero.webp" autoPlay muted loop playsInline aria-label="Limonáda sa nalieva do pohára na citrónovom papieri" />
          </motion.div>

          {isDesk && (
            <motion.div style={{ opacity: introO, y: introY }} className="wrap pointer-events-none absolute inset-x-0 bottom-0 hidden items-end justify-between pb-10 md:flex">
              <p className="display caps max-w-[12ch] text-[clamp(44px,5.4vw,96px)]">Chutí ako vy.</p>
              <p className="eyebrow flex items-center gap-3">
                Scrollujte <span className="inline-block animate-bounce">↓</span>
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <div ref={band} data-field="citron" className="overflow-hidden pb-10 pt-6 md:pt-10" aria-hidden>
        <motion.div style={{ x }} className="display caps flex w-max gap-[0.4em] whitespace-nowrap text-[clamp(72px,13vw,240px)] leading-[0.9]">
          <span>Chutí ako vy.</span>
          <span className="text-transparent [-webkit-text-stroke:2px_var(--ink)]">Chutí ako vy.</span>
          <span>Chutí ako vy.</span>
        </motion.div>
        <motion.div style={{ x: xRev }} className="display caps mt-2 flex w-max gap-[0.4em] whitespace-nowrap text-[clamp(72px,13vw,240px)] leading-[0.9]">
          <span className="text-transparent [-webkit-text-stroke:2px_var(--ink)]">Znie ako vy.</span>
          <span>Vyzerá ako vy.</span>
          <span className="text-transparent [-webkit-text-stroke:2px_var(--ink)]">Znie ako vy.</span>
        </motion.div>
      </div>
    </>
  );
}
