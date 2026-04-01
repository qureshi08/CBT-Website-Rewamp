import type { Metadata } from "next";
import { Inter, Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
