import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import ThemeProvider from "@/components/ThemeProvider";
import SmoothScroller from "@/components/SmoothScroller";
import { themeContent } from "@/themes";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${themeContent.salonName} — ${themeContent.tagline}`,
  description: themeContent.hero.subtext,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <ThemeProvider />
      </head>
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased`}
        suppressHydrationWarning
      >
        <SmoothScroller />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
