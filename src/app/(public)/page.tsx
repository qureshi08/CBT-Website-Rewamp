import Hero, { PersonaCards } from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import ClientLogoStrip from "@/components/home/ClientLogoStrip";
import StatsBar from "@/components/home/StatsBar";
import Testimonials from "@/components/home/Testimonials";

import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const [
    { data: clientsData },
    { data: dbStats }
  ] = await Promise.all([
    supabase.from("clients").select("name").eq("is_featured", true).order("display_order", { ascending: true }),
    supabase.from("stats" as any).select("*").order("display_order", { ascending: true }),
  ]);

  const clientNames = clientsData?.map(c => c.name);

  // Fallback to empty array if fetch fails, StatsBar has its own defaults
  const stats = (dbStats as any) || [];

  return (
    <>
      <Hero />
      <PersonaCards />
      <ServicesGrid />
      <StatsBar stats={stats} />
      <Testimonials />
      <ClientLogoStrip clientNames={clientNames} />
    </>
  );
}
