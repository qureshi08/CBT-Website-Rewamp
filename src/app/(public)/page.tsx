import Hero, { PersonaCards } from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import ClientLogoStrip from "@/components/home/ClientLogoStrip";
import CGAPTeaser from "@/components/home/CGAPTeaser";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Convergent Business Technologies | Data, Cloud & AI Consultancy",
  description: "CBT is a Data, Cloud & AI Consultancy helping organisations harness data and deliver business value. Trusted by Pepsi, Microsoft, KPMG and more.",
};

export default async function HomePage() {
  let clientNames: string[] | undefined;
  let batchCount = 12;

  try {
    const supabase = await createClient();
    const [
      { data: clientsData },
      { data: batchStat }
    ] = await Promise.all([
      supabase.from("clients").select("name").eq("is_featured", true).order("display_order", { ascending: true }),
      (supabase.from("stats" as any).select("value").eq("label", "CGAP Batches").single() as any),
    ]);
    clientNames = clientsData?.map(c => c.name);
    batchCount = batchStat?.value ?? 12;
  } catch {
    // Supabase unavailable — use static fallbacks
  }

  return (
    <>
      <Hero />
      <PersonaCards />
      <ClientLogoStrip clientNames={clientNames} />
      <ServicesGrid />
      <CGAPTeaser batchCount={batchCount} />
    </>
  );
}
