import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

/* Fontshare (ITF Free Font License), Slovak diacritics verified */
const chubbo = localFont({
  variable: "--font-chubbo",
  display: "swap",
  src: [
    { path: "../fonts/chubbo-500.woff2", weight: "500" },
    { path: "../fonts/chubbo-700.woff2", weight: "700" },
  ],
});
const cabinet = localFont({
  variable: "--font-cabinet",
  display: "swap",
  src: [{ path: "../fonts/cabinet-800.woff2", weight: "800" }],
});
const ranade = localFont({
  variable: "--font-ranade",
  display: "swap",
  src: [
    { path: "../fonts/ranade-400.woff2", weight: "400" },
    { path: "../fonts/ranade-500.woff2", weight: "500" },
  ],
});

const description =
  "Receptúra by GALTON Brands: pravidlá značky, ktoré AI číta sama. Pre pražiarne, pekárne, nápojové a potravinové značky. Hlas, vizuál a zvuk zapíšete raz, každý AI nástroj ich použije pri každom výstupe.";

export const metadata: Metadata = {
  title: "Receptúra by GALTON · Všetko, čo vytvoríte s AI, chutí ako vaša značka",
  description,
  openGraph: { title: "Receptúra by GALTON Brands", description, locale: "sk_SK", type: "website" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#EFE04B" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sk" className={`${chubbo.variable} ${ranade.variable} ${cabinet.variable} antialiased`}>
      <body className="min-h-dvh">
        <SmoothScroll />
        {children}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
          <div className="grain" />
        </div>
      </body>
    </html>
  );
}
