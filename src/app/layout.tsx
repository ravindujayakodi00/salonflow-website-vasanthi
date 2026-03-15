import type { Metadata } from "next";
import { Jost, Cormorant_Garamond, Pinyon_Script } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import SmoothScroller from "@/components/SmoothScroller";
import { themeContent } from "@/themes";

const jost = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const pinyonScript = Pinyon_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${themeContent.salonName} — ${themeContent.tagline}`,
  description: themeContent.hero.subtext,
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${jost.variable} ${cormorant.variable} ${pinyonScript.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <SmoothScroller />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
