import Hero, { PersonaCards } from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import ClientLogoStrip from "@/components/home/ClientLogoStrip";
import StatsBar from "@/components/home/StatsBar";
import CGAPTeaser from "@/components/home/CGAPTeaser";

import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: clientsData } = await supabase
    .from("clients")
    .select("name")
    .eq("is_featured", true)
    .order("display_order", { ascending: true });

  const clientNames = clientsData?.map(c => c.name);

  return (
    <>
      <Hero />
      <PersonaCards />
      <ServicesGrid />
      <ClientLogoStrip clientNames={clientNames} />
      <StatsBar />
      <CGAPTeaser />
    </>
  );
}
