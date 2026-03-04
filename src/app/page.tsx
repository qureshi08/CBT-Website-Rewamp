import Hero, { PersonaCards } from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import ClientLogoStrip from "@/components/home/ClientLogoStrip";
import StatsBar from "@/components/home/StatsBar";
import CGAPTeaser from "@/components/home/CGAPTeaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PersonaCards />
      <ServicesGrid />
      <ClientLogoStrip />
      <StatsBar />
      <CGAPTeaser />
    </>
  );
}
