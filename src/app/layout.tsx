import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "REİSS AUTO — Lojistik & Araç Çözümleri",
  description:
    "Ulusal ve uluslararası karayolu taşımacılığı, soğuk zincir, kargo ve ticari araç alım-satım.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${barlowCondensed.variable} ${inter.variable} font-body text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
