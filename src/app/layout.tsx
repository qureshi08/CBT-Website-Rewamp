import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: "variable",
  axes: ["opsz"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Convergent Business Technologies | Data & Technology Consultancy",
  description:
    "CBT is a data and technology consultancy helping organisations unlock the power of data through analytics, business intelligence, and custom solutions. Trusted by Pepsi, Microsoft, Coca-Cola, KPMG, and more.",
  keywords: [
    "data consultancy",
    "business analytics",
    "Power BI",
    "data warehouse",
    "CGAP",
    "Pakistan",
    "CBT",
  ],
  openGraph: {
    title: "Convergent Business Technologies",
    description:
      "Data & Technology Consultancy trusted by leading global brands.",
    type: "website",
    url: "https://convergentbt.com",
    images: ["https://convergentbt.com/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
