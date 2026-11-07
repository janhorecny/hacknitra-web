"use client";
import Image from "next/image";
import { AnimatePresence, animate, motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Button, EASE, Field, Lockup, Mark, Reveal } from "./ui";

/* ───────────────── 02 Problém ───────────────── */
const GENERIC = "🚀 Objavte chuť, ktorá posunie váš deň na ďalšiu úroveň! ✨ #kvalita #tradícia";
const BELT = [
  { img: "/img/slop/kava.webp", brand: "Horal", field: "výberová káva" },
  { img: "/img/slop/chlieb.webp", brand: "Kvas", field: "kvásková pekáreň" },
  { img: "/img/slop/limonada.webp", brand: "Bystrá", field: "remeselná limonáda" },
  { img: "/img/slop/med.webp", brand: "Úľ", field: "včelí med" },
  { img: "/img/slop/pivo.webp", brand: "Chmeľ", field: "minipivovar" },
  { img: "/img/slop/cokolada.webp", brand: "Kakao", field: "čokoládovňa" },
  { img: "/img/slop/syr.webp", brand: "Salaš", field: "ovčí syr" },
  { img: "/img/slop/dzus.webp", brand: "Sad", field: "lisované džúsy" },
];

export function Problem() {
  const items = [...BELT, ...BELT];
  return (
    <Field name="grafit" id="problem" className="py-28 md:py-36">
      <div className="wrap grid grid-cols-12 items-end gap-x-6 gap-y-8">
        <Reveal className="col-span-12 lg:col-span-8">
          <p className="eyebrow">Problém</p>
          <h2 className="display caps mt-5 text-[clamp(40px,6vw,104px)]">Všetko, čo AI napíše, znie rovnako.</h2>
        </Reveal>
        <Reveal delay={0.1} className="col-span-12 lg:col-span-4">
          <p className="text-[clamp(18px,1.5vw,22px)] leading-[1.4]">
            Texty, obrázky aj maily vyzerajú ako z jednej linky. Zákazník ich prečíta a o týždeň nevie, od koho boli.
          </p>
        </Reveal>
      </div>

      <div className="belt-wrap mt-16 overflow-hidden md:mt-20">
        <div className="belt flex w-max gap-5 px-[var(--gutter)]" style={{ ["--dur" as string]: "70s" }}>
          {items.map((it, i) => (
            <figure key={i} className="group w-[240px] shrink-0 md:w-[300px]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={it.img} alt={`Generický AI výstup, ktorý mohol byť od hocikoho (v skutočnosti ${it.brand})`} fill sizes="300px" className="object-cover transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-[1.03]" />
              </div>
              <figcaption className="mt-3 text-[14px] leading-[1.4]">
                <span className="flex justify-between font-medium">
                  <span className="relative">
                    <span className="transition-opacity duration-300 group-hover:opacity-0">Značka ?</span>
                    <span className="absolute left-0 top-0 whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">{it.brand}</span>
                  </span>
                  <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">{it.field}</span>
                </span>
                <span className="mt-1 block">{GENERIC}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="wrap mt-10 flex flex-col justify-between gap-4 border-t border-[#E6EAEC] pt-5 text-[15px] md:flex-row">
        <span className="font-medium">Osem značiek, jedna šablóna, jeden a ten istý post.</span>
        <span>Prejdite myšou po výstupoch a uvidíte, komu patria.</span>
      </div>
    </Field>
  );
}

/* ───────────────── 03 Riešenie ───────────────── */
function Bars() {
  return (
    <span className="flex h-16 items-end gap-1.5" aria-hidden>
      {[0.5, 0.9, 0.35, 1, 0.6, 0.8, 0.4, 0.95, 0.55, 0.75, 0.3, 0.85].map((h, i) => (
        <motion.span
          key={i}
          className="w-2 rounded-full bg-smrek"
          initial={{ height: "20%" }}
          animate={{ height: [`${h * 30}%`, `${h * 100}%`, `${h * 45}%`, `${h * 85}%`, `${h * 30}%`] }}
          transition={{ duration: 60 / 84 * 4, repeat: Infinity, delay: i * 0.06, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}

const CHAPTERS = [
  {
    t: "Hlas",
    file: "hlas.md",
    d: "Ako značka hovorí: oslovenie, dĺžka viet a slová, ktoré nikdy nepoužije.",
    img: "/img/v3/hlas2.webp",
    alt: "List papiera s poznámkami ceruzkou a ceruzka",
    rows: [
      ["Oslovenie", "vykáme"],
      ["Veta", "do 18 slov"],
      ["Tón", "pokojný, s chuťou"],
      ["Nikdy", "„revolučný“, „!“, 🚀"],
    ],
    out: "hlas",
    ex: "„Pražíme ju 14 minút. V Tatrách sa nikam neponáhľame.“",
  },
  {
    t: "Vizuál",
    file: "vizual.md",
    d: "Ako značka vyzerá: svetlo, farby, kompozícia a obal v každom zábere.",
    img: "/img/v3/vizual2.webp",
    alt: "Vejár papierových farebných vzoriek",
    rows: [
      ["Svetlo", "mäkké, zhora"],
      ["Pozadie", "tón v tóne"],
      ["Obal", "vždy v zábere"],
      ["Nikdy", "bokeh, lesk, mramor"],
    ],
    out: "vizual",
    ex: "Vrecko kávy na papieri farby praženice, mäkké svetlo zhora.",
  },
  {
    t: "Zvuk",
    file: "zvuk.md",
    d: "Ako značka znie: tempo, nástroje a hlas v reklame aj v podcaste.",
    img: "/img/v3/zvuk2.webp",
    alt: "Kazetový prehrávač so slúchadlami",
    rows: [
      ["Tempo", "84 BPM"],
      ["Nástroje", "gitara, rhodes"],
      ["Voiceover", "alt, pokojný"],
      ["Nikdy", "ukulele, „ta-da“"],
    ],
    out: "zvuk",
    ex: "Jingle 6 s: rhodes v D dur, posledný tón doznie do ticha.",
  },
];

function Output({ kind }: { kind: string }) {
  if (kind === "hlas")
    return (
      <div className="absolute inset-x-5 bottom-5 bg-ovos p-5 text-smrek">
        <p className="eyebrow">Post · v receptúre</p>
        <p className="display-m mt-3 text-[22px] leading-[1.15]">Pražíme ju 14 minút. V Tatrách sa nikam neponáhľame.</p>
      </div>
    );
  if (kind === "vizual")
    return (
      <div className="absolute inset-0">
        <Image src="/img/v3/b-client.webp" alt="" fill sizes="30vw" className="object-cover" />
        <span className="eyebrow absolute left-5 top-5 rounded-full bg-ovos px-3 py-2 text-smrek">Fotka · v receptúre</span>
      </div>
    );
  return (
    <div className="absolute inset-x-5 bottom-5 flex items-end justify-between bg-ovos p-5 text-smrek">
      <div>
        <p className="eyebrow">Jingle · v receptúre</p>
        <p className="display-m mt-3 text-[22px]">84 BPM · D dur</p>
      </div>
      <Bars />
    </div>
  );
}

export function Solution() {
  return (
    <Field name="ovos" id="riesenie" className="py-28 md:py-36">
      <div className="wrap grid grid-cols-12 items-end gap-x-6 gap-y-8">
        <Reveal className="col-span-12 lg:col-span-8">
          <p className="eyebrow">Riešenie</p>
          <h2 className="display caps mt-5 text-[clamp(40px,6vw,104px)]">Značka, ktorú AI číta ako zadanie.</h2>
        </Reveal>
        <Reveal delay={0.1} className="col-span-12 lg:col-span-4">
          <p className="text-[clamp(18px,1.5vw,22px)] leading-[1.4]">Hlas, vizuál a zvuk zapíšete raz. Každý nástroj ich použije pri každom výstupe. Prejdite myšou po kapitole a uvidíte výstup.</p>
        </Reveal>
      </div>
      <div className="wrap mt-16 md:mt-20">
        <div className="border-t border-smrek md:-mx-6 md:grid md:grid-cols-3 md:grid-rows-[auto_auto_auto_auto_1fr] md:border-t-0">
          {CHAPTERS.map((c, i) => (
            <Reveal
              key={c.t}
              delay={i * 0.08}
              className="group border-b border-smrek py-8 md:row-span-5 md:grid md:grid-rows-subgrid md:gap-0 md:border-b-0 md:border-t md:px-6 md:[&:not(:last-child)]:border-r"
            >
              <div className="flex items-end justify-between">
                <h3 className="display caps text-[clamp(44px,4.6vw,92px)]">{c.t}</h3>
                <span className="hidden pb-2 text-right text-[13px] font-medium leading-tight lg:block">
                  0{i + 1}
                  <br />
                  {c.file}
                </span>
              </div>
              <div className="relative mt-6 aspect-[4/5] w-full self-start overflow-hidden bg-[#ebe6dc]">
                <Image src={c.img} alt={c.alt} fill sizes="(min-width:768px) 30vw, 92vw" className="object-cover transition-transform duration-[1.1s] ease-[var(--ease-expo)] group-hover:scale-[1.03]" />
                <div className="pointer-events-none absolute inset-0 translate-y-4 opacity-0 transition-[opacity,translate] duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0 group-hover:opacity-100">
                  <Output kind={c.out} />
                </div>
              </div>
              <p className="mt-6 max-w-[36ch] text-[17px] leading-[1.45]">{c.d}</p>
              <dl className="mt-6 text-[15px]">
                {c.rows.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-t border-smrek py-2.5">
                    <dt>{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-col justify-start border-t border-smrek pt-4">
                <p className="eyebrow">Príklad výstupu</p>
                <p className="display-m mt-2 text-[20px] leading-[1.2]">{c.ex}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Field>
  );
}

/* ───────────────── 04 Ako to funguje ───────────────── */
const STEPS = [
  { n: "1", t: "Pripravíme pravidlá značky", d: "Z vášho manuálu, webu a najlepších kampaní zostavíme receptúru značky. Hlas, vizuál aj zvuk. Do týždňa.", chip: [["file", "manuál.pdf"], ["file", "web"], ["file", "40 kampaní"], ["file", "jingle.wav"]] },
  { n: "2", t: "Zadáte, čo potrebujete", d: "V nástroji, ktorý už používate. Píšete ako doteraz, receptúra sa načíta sama.", chip: [["prompt", "„Fotka novej limonády na Instagram“"]] },
  { n: "3", t: "Dostanete výstup v rukopise značky", d: "Každý výstup dostane skóre. Keď niečo nesedí, vidíte presne čo a prečo.", chip: [["ok", "Hlas"], ["ok", "Vizuál"], ["ok", "Zvuk"], ["score", "99,8 %"]] },
];

export function Process() {
  return (
    <Field name="smrek" id="postup" className="py-28 md:py-36">
      <div className="wrap grid grid-cols-12 items-end gap-x-6 gap-y-8">
        <Reveal className="col-span-12 lg:col-span-8">
          <p className="eyebrow">Ako to funguje</p>
          <h2 className="display caps mt-5 text-[clamp(40px,6vw,104px)]">Tri kroky, jedna značka.</h2>
        </Reveal>
        <Reveal delay={0.1} className="col-span-12 lg:col-span-4">
          <p className="text-[clamp(18px,1.5vw,22px)] leading-[1.4]">Postup je jednoduchý a každý krok sa dá overiť.</p>
        </Reveal>
      </div>
      <ol className="wrap mt-16 md:mt-20">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.06}>
            <li className="group grid grid-cols-12 items-center gap-x-6 gap-y-4 border-t border-ovos py-8 last:border-b md:py-10">
              <span className="display col-span-3 text-[clamp(72px,9vw,160px)] leading-[0.8] md:col-span-2 lg:col-span-1">{s.n}</span>
              <h3 className="display-m caps col-span-9 text-[clamp(26px,2.8vw,48px)] md:col-span-4">{s.t}</h3>
              <p className="col-span-12 text-[17px] leading-[1.45] md:col-span-3">{s.d}</p>
              <div className="col-span-12 flex flex-wrap gap-2 md:col-span-3 md:justify-end lg:col-span-4">
                {s.chip.map(([kind, c], j) => (
                  <span
                    key={c}
                    className={`inline-flex items-center gap-2 rounded-full font-medium leading-none transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-0.5 ${
                      kind === "prompt" || kind === "score" ? "bg-citron text-smrek" : "bg-ovos text-smrek"
                    } ${kind === "prompt" ? "px-5 py-3.5 text-[16px]" : kind === "score" ? "px-4 py-3 text-[16px]" : "px-3.5 py-2.5 text-[15px]"}`}
                    style={{ transitionDelay: `${j * 40}ms` }}
                  >
                    {kind === "file" && (
                      <svg viewBox="0 0 12 14" className="h-3.5 w-3 shrink-0" aria-hidden>
                        <path d="M0 0h8l4 4v10H0z" fill="currentColor" />
                        <path d="M8 0v4h4" fill="#F4F1EA" />
                      </svg>
                    )}
                    {kind === "ok" && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-smrek text-[11px] text-citron" aria-hidden>
                        ✓
                      </span>
                    )}
                    {kind === "prompt" && <span className="h-2 w-2 rounded-full bg-smrek" aria-hidden />}
                    {c}
                  </span>
                ))}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Field>
  );
}

/* ───────────────── Ukážky ───────────────── */
type Client = {
  id: string;
  name: string;
  field: "prazenica" | "korka" | "citron";
  what: string;
  palette: string[];
  voice: string;
  ask: string;
  before: string;
  after: string;
  diff: [string, string, string][];
  beforeImg: string;
  afterImg: string;
  afterVideo?: string;
};
const CLIENTS: Client[] = [
  {
    id: "kvas",
    name: "Kvas",
    field: "korka",
    what: "mestská kvásková pekáreň, Bratislava",
    palette: ["#E2C597", "#1C1C1C", "#D93A2B"],
    voice: "Priamo, mestsky, s humorom.",
    ask: "Post o rannom chlebe.",
    before: "🍞 Čerstvý chlieb plný lásky a tradície! Navštívte nás ešte dnes!",
    after: "Kvások kŕmime jedenásty rok. Chlieb je hotový o 6:40. O deviatej už väčšinou nie je.",
    diff: [["Emoji", "1", "0"], ["Výkričníky", "2", "0"], ["Konkrétne fakty", "0", "3"]],
    beforeImg: "/img/clients/kvas-before.webp",
    afterImg: "/img/v3/kvas-after.webp",
  },
  {
    id: "horal",
    name: "Horal",
    field: "prazenica",
    what: "výberová káva z hôr, Liptov",
    palette: ["#7A3B22", "#2F3B2C", "#E9E1D2"],
    voice: "Pomaly, bez prívlastkov, ako ráno na chate.",
    ask: "Post o novej etiópskej káve.",
    before: "☕ Začnite deň s našou prémiovou kávou plnou chuti! Objednajte ešte dnes!",
    after: "Etiópia Guji. Pražíme ju 14 minút, chutí po marhuli a čiernom čaji. Prvá várka je malá.",
    diff: [["Emoji", "1", "0"], ["Výkričníky", "2", "0"], ["Konkrétne fakty", "0", "3"]],
    beforeImg: "/img/clients/horal-before.webp",
    afterImg: "/img/v3/b-client.webp",
    afterVideo: "/video/horal.mp4",
  },
  {
    id: "bystra",
    name: "Bystrá",
    field: "citron",
    what: "remeselná limonáda, Banská Bystrica",
    palette: ["#EFE04B", "#14231C", "#F4F1EA"],
    voice: "Svieže, krátke, s jedným vtipom navyše.",
    ask: "Fotka a text k letnej limonáde.",
    before: "Osviežte sa našou prírodnou limonádou plnou vitamínov! 🍋☀️ #leto",
    after: "Tri citróny, trochu cukru, nič navyše. Lisujeme v pondelok, do piatku je preč.",
    diff: [["Emoji", "2", "0"], ["Hashtagy", "1", "0"], ["Konkrétne fakty", "0", "3"]],
    beforeImg: "/img/v3/bystra-before.webp",
    afterImg: "/img/v3/bystra-after.webp",
  },
];

function Compare({ c }: { c: Client }) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [on, setOn] = useState(false);
  const [hold, setHold] = useState(false);
  useEffect(() => {
    if (!inView || hold) return;
    const first = setTimeout(() => setOn(true), 900);
    const id = setInterval(() => setOn((v) => !v), 3600);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [inView, hold]);
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => {
        setHold(true);
        setOn((v) => !v);
      }}
      aria-label={`${c.name}: prepnúť medzi výstupom bez receptúry a s receptúrou`}
      className="relative block aspect-[4/5] w-full cursor-pointer overflow-hidden text-left lg:aspect-square"
    >
      <Image src={c.beforeImg} alt={`${c.name}, generický výstup bez receptúry`} fill sizes="(min-width:1024px) 40vw, 92vw" className="object-cover" />
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ clipPath: on ? "inset(0 0 0 0%)" : "inset(0 0 0 100%)" }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      >
        {c.afterVideo ? (
          <video className="absolute inset-0 h-full w-full object-cover" src={c.afterVideo} poster={c.afterImg} autoPlay muted loop playsInline aria-label={`${c.name}, výstup s receptúrou`} />
        ) : (
          <Image src={c.afterImg} alt={`${c.name}, výstup s receptúrou značky`} fill sizes="(min-width:1024px) 40vw, 92vw" className="object-cover" />
        )}
      </motion.div>
      <span className="absolute left-3 top-3 flex gap-1 rounded-full bg-ovos p-1 text-[13px] font-medium text-smrek">
        <span className={`rounded-full px-3 py-1.5 transition-colors duration-500 ${on ? "" : "bg-smrek text-ovos"}`}>Bez receptúry</span>
        <span className={`rounded-full px-3 py-1.5 transition-colors duration-500 ${on ? "bg-smrek text-ovos" : ""}`}>S receptúrou</span>
      </span>
    </button>
  );
}

function ClientBlock({ c, first, flip }: { c: Client; first: boolean; flip: boolean }) {
  const dark = c.field === "prazenica";
  const line = dark ? "border-ovos" : "border-smrek";
  return (
    <Field name={c.field} id={first ? "ukazky" : undefined} className="flex min-h-[100dvh] flex-col justify-center py-24 md:py-28">
      <div className="wrap">
        {first && (
          <Reveal className="mb-14 grid grid-cols-12 items-end gap-x-6 gap-y-6">
            <div className="col-span-12 lg:col-span-8">
              <p className="eyebrow">Ukážky pred a po</p>
              <h2 className="display caps mt-5 text-[clamp(40px,6vw,104px)]">Rovnaké zadanie. Tri značky.</h2>
            </div>
            <p className="col-span-12 text-[clamp(18px,1.5vw,22px)] leading-[1.4] lg:col-span-4">Ten istý AI nástroj, raz bez receptúry, raz s ňou. Potiahnite posuvník.</p>
          </Reveal>
        )}
        <div className="grid grid-cols-12 items-stretch gap-x-6 gap-y-10">
          <Reveal className={`col-span-12 md:col-span-6 lg:col-span-5 ${flip ? "md:order-2 lg:col-start-8" : ""}`}>
            <Compare c={c} />
          </Reveal>
          <Reveal delay={0.1} className={`col-span-12 flex flex-col md:col-span-6 lg:col-span-6 ${flip ? "md:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
            <div className={`flex items-end justify-between border-b pb-5 ${line}`}>
              <h3 className="display caps text-[clamp(56px,7vw,124px)] leading-[0.8]">{c.name}</h3>
              <span className="flex gap-1.5 pb-2">
                {c.palette.map((p) => (
                  <span key={p} className={`h-6 w-6 rounded-full shadow-[inset_0_0_0_1px_${dark ? "#F4F1EA" : "#14231C"}]`} style={{ background: p, boxShadow: `inset 0 0 0 1px ${dark ? "#F4F1EA" : "#14231C"}` }} />
                ))}
              </span>
            </div>
            <p className="mt-4 text-[15px]">
              {c.what} · <span className="font-medium">hlas: „{c.voice}“</span>
            </p>
            <p className="mt-8 text-[15px]">Zadanie: „{c.ask}“</p>
            <div className={`mt-4 grid grid-cols-1 gap-6 border-t pt-6 sm:grid-cols-2 ${line}`}>
              <div>
                <p className="text-[14px] font-medium">Bez receptúry</p>
                <p className="mt-3 text-[clamp(18px,1.5vw,22px)] leading-[1.35] line-through decoration-1">{c.before}</p>
              </div>
              <div>
                <p className="text-[14px] font-medium">S receptúrou {c.name}</p>
                <p className="display-m mt-3 text-[clamp(22px,2vw,32px)] leading-[1.12]">{c.after}</p>
              </div>
            </div>
            <dl className="mt-10 text-[15px] md:mt-auto md:pt-10">
              {c.diff.map(([k, a, b]) => (
                <div key={k} className={`grid grid-cols-[1fr_60px_30px_60px] items-baseline border-t py-2.5 ${line}`}>
                  <dt>{k}</dt>
                  <dd className="text-right line-through">{a}</dd>
                  <dd className="text-center">→</dd>
                  <dd className="display-m text-[20px]">{b}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Field>
  );
}

export function Demo() {
  return (
    <>
      {CLIENTS.map((c, i) => (
        <ClientBlock key={c.id} c={c} first={i === 0} flip={i % 2 === 1} />
      ))}
    </>
  );
}

/* ───────────────── 05 Pre koho ───────────────── */
const AUD = [
  { t: "Pražiarne kávy", d: "Popisy odrôd, newslettery a fotky balíčkov, ktoré sa nemýlia s konkurenciou.", img: "/img/v3/aud-prazarne.webp", alt: "Ruka sype praženú kávu do papierového vrecka" },
  { t: "Pekárne a cukrárne", d: "Denné posty, menu a sezónne kampane v jednom tóne, nech ich píše ktokoľvek.", img: "/img/v3/aud-pekarne.webp", alt: "Ruky od múky tvarujú cesto" },
  { t: "Nápoje a pivovary", d: "Etikety, reklamy a jingle, ktoré znejú ako vaša fľaša, nie ako katalóg.", img: "/img/v3/aud-napoje.webp", alt: "Drevená prepravka s fľašami nápojov" },
  { t: "Potraviny v retaile", d: "Stovky produktových textov a fotiek do e-shopov a letákov v jednom rukopise.", img: "/img/v3/aud-retail.webp", alt: "Pohár medu, papierová krabička a plechovka na zelenom papieri" },
];

export function Audience() {
  const [hover, setHover] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 24 });
  const sy = useSpring(my, { stiffness: 200, damping: 24 });
  const last = useRef<{ x: number; y: number } | null>(null);
  const place = (x: number, y: number, instant: boolean) => {
    last.current = { x, y };
    mx.set(x);
    my.set(y);
    if (instant) {
      mx.jump(x);
      my.jump(y);
      sx.jump(x);
      sy.jump(y);
    }
  };
  useEffect(() => {
    const onScroll = () => {
      const p = last.current;
      const r = box.current?.getBoundingClientRect();
      if (!p || !r) return;
      if (p.y < r.top || p.y > r.bottom || p.x < r.left || p.x > r.right) setHover(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <Field name="ovos" id="pre-koho" className="py-28 md:py-36">
      <div className="wrap grid grid-cols-12 items-end gap-x-6 gap-y-8">
        <Reveal className="col-span-12 lg:col-span-8">
          <p className="eyebrow">Pre koho</p>
          <h2 className="display caps mt-5 text-[clamp(40px,6vw,104px)]">Pre tímy, ktoré chcú zostať <span className="text-prazenica">spoznateľné.</span></h2>
        </Reveal>
        <Reveal delay={0.1} className="col-span-12 lg:col-span-4">
          <p className="text-[clamp(18px,1.5vw,22px)] leading-[1.4]">Pre tímy, ktoré tvoria s AI každý deň. Receptúra je prvou voľbou, keď záleží na tom, ako značka znie, vyzerá a pôsobí.</p>
        </Reveal>
      </div>
      <div
        ref={box}
        className="wrap relative mt-16 md:mt-20"
        onPointerMove={(e) => {
          if (e.pointerType === "mouse") place(e.clientX, e.clientY, false);
        }}
        onPointerLeave={() => setHover(null)}
      >
        {AUD.map((a, i) => (
          <div
            key={a.t}
            onPointerEnter={(e) => {
              if (e.pointerType !== "mouse") return;
              if (hover === null) place(e.clientX, e.clientY, true);
              setHover(i);
            }}
            className="grid grid-cols-12 items-center gap-x-6 gap-y-3 border-t border-smrek py-6 last:border-b md:py-8"
          >
            <span className="col-span-2 text-[15px] font-medium md:col-span-1">0{i + 1}</span>
            <h3 className={`display caps col-span-10 text-[clamp(32px,4.6vw,80px)] transition-transform duration-500 ease-[var(--ease-expo)] md:col-span-7 ${hover === i ? "translate-x-3" : ""}`}>{a.t}</h3>
            <div className="relative col-span-3 aspect-square overflow-hidden md:hidden">
              <Image src={a.img} alt={a.alt} fill sizes="25vw" className="object-cover" />
            </div>
            <p className="col-span-9 text-[16px] leading-[1.45] md:col-span-4">{a.d}</p>
          </div>
        ))}
        <motion.div className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block" style={{ x: sx, y: sy }}>
          <AnimatePresence>
            {hover !== null && (
              <motion.div
                key={hover}
                className="absolute left-[-130px] top-[-162px] overflow-hidden"
                style={{ width: 260, height: 325 }}
                initial={{ clipPath: "inset(50% 50% 50% 50%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{ clipPath: "inset(50% 50% 50% 50%)", transition: { duration: 0.25 } }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <Image src={AUD[hover].img} alt="" fill sizes="260px" className="object-cover" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Field>
  );
}

/* ───────────────── 06 Dôvod uveriť ───────────────── */
function Count() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const v = useMotionValue(90);
  const t = useTransform(v, (x) => x.toFixed(1).replace(".", ","));
  useEffect(() => {
    if (!inView) return;
    const a = animate(v, 99.8, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
    return () => a.stop();
  }, [inView, v]);
  return <motion.span ref={ref}>{t}</motion.span>;
}

const BEN = [
  { t: "Konzistentnosť", d: "Rovnaký tón v poste, na obale aj v reklame. Nech tvorí ktokoľvek, v akomkoľvek nástroji." },
  { t: "Rýchlosť", d: "Žiadne prepisovanie po AI. Prvý návrh už chutí ako vaša značka." },
  { t: "Kontrola", d: "Každý výstup má skóre receptúry. Vidíte, čo prešlo, čo nie a prečo." },
];

export function Proof() {
  return (
    <Field name="smrek" id="dokaz" className="py-28 md:py-36">
      <div className="wrap">
        <Reveal className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <p className="eyebrow">Dôvod uveriť</p>
          <p className="text-[15px]">Zdroj: 200 testov rôznych výstupov na 3 značkách</p>
        </Reveal>
        <div className="mt-8 [container-type:inline-size]">
          <div className="display whitespace-nowrap text-[37cqw] leading-[0.8] tracking-[-0.06em]">
            <Count /> %
          </div>
        </div>
        <p className="display-m mt-6 max-w-[22ch] text-[clamp(24px,2.6vw,44px)]">spoľahlivosť pri dodržaní pravidiel značky.</p>
        <div className="mt-16 grid grid-cols-1 border-t border-ovos md:grid-cols-3 md:grid-rows-[auto_1fr]">
          {BEN.map((b, i) => (
            <Reveal key={b.t} delay={i * 0.08} className="border-b border-ovos py-8 md:row-span-2 md:grid md:grid-rows-subgrid md:gap-0 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
              <h3 className="display caps text-[clamp(30px,3vw,52px)]">{b.t}</h3>
              <p className="mt-4 max-w-[34ch] text-[17px] leading-[1.45]">{b.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Field>
  );
}

/* ───────────────── 07 Výzva k akcii ───────────────── */
export function Cta() {
  return (
    <Field name="smrek" id="demo" className="overflow-hidden py-28 md:py-40">
      <div className="wrap grid grid-cols-12 items-center gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-7">
          <Reveal>
            <p className="eyebrow">Ďalší krok</p>
            <h2 className="display caps mt-5 text-[clamp(44px,6.6vw,116px)]">Pozrite si, ako to funguje u&nbsp;iných značiek.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[44ch] text-[clamp(18px,1.5vw,22px)] leading-[1.4]">
              Ukážeme vám značky, ktoré službu už používajú, s výstupmi pred a po. Demo si pozrite hneď alebo si s nami dohodnite hovor.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="#ukazky">Pozrieť demo</Button>
              <Button href="mailto:demo@receptura.example?subject=Demo%20hovor" variant="ghost">
                Dohodnúť demo hovor
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="col-span-12 flex justify-center lg:col-span-5">
          <Mark className="h-auto w-[min(64vw,360px)]" />
        </Reveal>
      </div>
    </Field>
  );
}

/* ───────────────── Pätička ───────────────── */
export function Footer() {
  return (
    <Field name="ovos" className="pt-20 md:pt-28">
      <footer className="wrap">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12 border-b border-smrek pb-14">
          <div className="col-span-12 lg:col-span-5">
            <Lockup size={30} tone="light" />
            <p className="mt-6 max-w-[34ch] text-[17px] leading-[1.45]">Pravidlá značky, ktoré AI číta sama. Pre pražiarne, pekárne, nápojové a potravinové značky.</p>
          </div>
          <nav className="col-span-6 sm:col-span-4 lg:col-span-2 lg:col-start-7" aria-label="Pätička">
            <p className="eyebrow">Stránka</p>
            <ul className="mt-5 space-y-2.5 text-[16px]">
              {[
                ["#problem", "Problém"],
                ["#riesenie", "Riešenie"],
                ["#postup", "Ako to funguje"],
                ["#pre-koho", "Pre koho"],
                ["#ukazky", "Ukážky"],
              ].map(([h, l]) => (
                <li key={h}>
                  <a className="draw" href={h}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="col-span-6 sm:col-span-4 lg:col-span-2">
            <p className="eyebrow">Kontakt</p>
            <ul className="mt-5 space-y-2.5 text-[16px]">
              <li>
                <a className="draw [overflow-wrap:anywhere]" href="mailto:demo@receptura.example">
                  demo@receptura.example
                </a>
              </li>
              <li>Nitra, Bratislava</li>
              <li>
                <a className="draw" href="#ukazky">
                  Pozrieť demo
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-12 sm:col-span-4 lg:col-span-2">
            <p className="eyebrow">Tvorí</p>
            <a href="https://galton.sk" className="group mt-5 block" target="_blank" rel="noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://galton-ai-assets.vercel.app/brand/logos/galton-wordmark-black-tagline-tight.png" alt="GALTON Brands" className="h-9 w-auto" />
              <span className="draw mt-3 inline-block text-[16px]">galton.sk ↗</span>
            </a>
          </div>
        </div>

        <div className="py-10 [container-type:inline-size] md:py-14" aria-hidden>
          <div className="flex items-baseline gap-[4cqw]">
            <Mark className="h-[13.4cqw] w-auto shrink-0" />
            <span className="wordmark whitespace-nowrap text-[20cqw] leading-[0.8]">receptúra</span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-smrek py-6 text-[14px] md:flex-row md:items-center">
          <span>© 2026 GALTON Brands. Receptúra je ukážkový produkt.</span>
          <span>Fotografie a videá: Higgsfield</span>
          <a href="#top" className="draw self-start md:self-auto">
            Späť hore ↑
          </a>
        </div>
      </footer>
    </Field>
  );
}
