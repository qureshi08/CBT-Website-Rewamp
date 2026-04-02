import Hero, { PersonaCards } from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import ClientLogoStrip from "@/components/home/ClientLogoStrip";
import CGAPTeaser from "@/components/home/CGAPTeaser";
import StatsBar from "@/components/home/StatsBar";
import Testimonials from "@/components/home/Testimonials";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Convergent Business Technologies | Data, Cloud & AI Consultancy",
  description: "CBT is a Data, Cloud & AI Consultancy helping organisations harness data and deliver business value. Trusted by Pepsi, Microsoft, KPMG and more.",
};

export default async function HomePage() {
  let clientNames: string[] | undefined;
  let batchCount = 12;
  let homepageStats: any[] = [];
  let testimonialsData: any[] = [];

  try {
    const supabase = await createClient();
    const [
      { data: clientsData },
      { data: batchStat },
      { data: statsData },
      { data: testiData }
    ] = await Promise.all([
      supabase.from("clients").select("name").eq("is_featured", true).order("display_order", { ascending: true }),
      (supabase.from("stats" as any).select("value").eq("label", "CGAP Batches").single() as any),
      supabase.from("stats" as any).select("label, value, suffix").order("display_order", { ascending: true }),
      supabase.from("testimonials" as any).select("*").eq("page", "Home").order("display_order", { ascending: true })
    ]);

    clientNames = (clientsData as any[])?.map(c => c.name);
    batchCount = (batchStat as any)?.value ?? 12;
    homepageStats = (statsData as any[])?.filter(s => s.label !== "CGAP Batches") || [];
    testimonialsData = (testiData as any[]) || [];
  } catch (error) {
    console.error("HomePage data fetch error:", error);
  }

  return (
    <>
      <Hero batchCount={batchCount} />
      <PersonaCards />
      <ClientLogoStrip clientNames={clientNames} />
      <div id="stats">
        <StatsBar stats={homepageStats} />
      </div>
      <ServicesGrid />
      <CGAPTeaser batchCount={batchCount} />
      <div id="testimonials">
        <Testimonials testimonials={testimonialsData} />
      </div>
    </>
  );
}
