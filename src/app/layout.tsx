import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
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
      <body className={`${inter.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
