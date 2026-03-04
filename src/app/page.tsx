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

  // Fetch cohort count
  const { count: cohortCount } = await supabase
    .from("cgap_cohorts")
    .select("*", { count: "exact", head: true });

  const displayCohortCount = cohortCount || 28;

  const stats = [
    { value: 30, suffix: "+", label: "Consultants" },
    { value: displayCohortCount, suffix: "+", label: "CGAP Cohorts" },
    { value: 50, suffix: "+", label: "Clients Served" },
  ];

  return (
    <>
      <Hero />
      <PersonaCards />
      <ServicesGrid />
      <ClientLogoStrip clientNames={clientNames} />
      <StatsBar stats={stats} />
      <CGAPTeaser cohortCount={displayCohortCount} />
    </>
  );
}
