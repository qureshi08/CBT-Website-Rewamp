import Hero, { SecondaryEntries } from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import ClientLogoStrip from "@/components/home/ClientLogoStrip";
import CaseStudiesFeatured from "@/components/home/CaseStudiesFeatured";
import Differentiators from "@/components/home/Differentiators";
import CredentialsBar from "@/components/home/CredentialsBar";
import Testimonials from "@/components/home/Testimonials";
import CtaBand from "@/components/home/CtaBand";
import { createClient } from "@/lib/supabase/server";

// Named clients shown in the hero trust bar — priority order per brief.
const NAMED_TRUST = ["P&G", "Coca-Cola", "PepsiCo", "UNICEF", "ADNOC"];

export const metadata = {
  title: "Convergent Business Technologies | Data, Cloud & AI Consultancy",
  description: "CBT is a Data, Cloud & AI Consultancy helping organisations harness data and deliver business value. Trusted by Pepsi, Microsoft, KPMG and more.",
};

export default async function HomePage() {
  let clientNames: string[] = NAMED_TRUST;
  let batchCount = 12;
  let testimonialsData: any[] = [];

  try {
    const supabase = await createClient();
    const [{ data: clientsData }, { data: batchStat }, { data: testiData }] = await Promise.all([
      supabase
        .from("clients")
        .select("name")
        .eq("is_featured", true)
        .order("display_order", { ascending: true }),
      supabase.from("stats" as any).select("value").eq("label", "CGAP Batches").single() as any,
      supabase.from("testimonials" as any).select("*").eq("page", "Home").order("display_order", { ascending: true }),
    ]);
    testimonialsData = (testiData as any[]) || [];

    // Priority: P&G / Coca-Cola / PepsiCo / UNICEF / ADNOC first, then any other featured clients.
    const dbNames = ((clientsData as any[]) || []).map((c) => c.name);
    const preferred = NAMED_TRUST.filter((n) =>
      dbNames.some((d) => d.toLowerCase() === n.toLowerCase())
    );
    const extras = dbNames.filter(
      (n) => !NAMED_TRUST.some((t) => t.toLowerCase() === n.toLowerCase())
    );
    clientNames = preferred.length ? [...preferred, ...extras] : NAMED_TRUST;

    batchCount = (batchStat as any)?.value ?? batchCount;
  } catch (error) {
    console.error("HomePage data fetch error:", error);
  }

  return (
    <>
      {/* 01 — Hero */}
      <Hero batchCount={batchCount} />

      {/* 02 — Trust bar (named logos lead) */}
      <ClientLogoStrip clientNames={clientNames} />

      {/* 03 — Services (6 capabilities) */}
      <ServicesGrid />

      {/* 04 — Case studies, outcome-led */}
      <CaseStudiesFeatured />

      {/* 05 — Differentiators */}
      <Differentiators />

      {/* 06 — Credentials bar */}
      <CredentialsBar />

      {/* 07 — Secondary entries (demoted tri-block) */}
      <SecondaryEntries />

      {/* 08 — Testimonials (social proof) */}
      <div id="testimonials">
        <Testimonials testimonials={testimonialsData} />
      </div>

      {/* 09 — CTA band */}
      <CtaBand />
    </>
  );
}
