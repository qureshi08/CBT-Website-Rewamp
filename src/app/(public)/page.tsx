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
  let trustClients: { name: string; logoUrl?: string | null }[] =
    NAMED_TRUST.map((name) => ({ name }));
  let clientLogos: { name: string; logo_url: string }[] = [];
  let batchCount = 12;
  let testimonialsData: any[] = [];

  try {
    const supabase = await createClient();
    const [{ data: clientsData }, { data: batchStat }, { data: testiData }] = await Promise.all([
      supabase
        .from("clients")
        .select("name, logo_url, logo_full_url")
        .eq("is_featured", true)
        .order("display_order", { ascending: true }),
      supabase.from("stats" as any).select("value").eq("label", "CGAP Batches").single() as any,
      supabase.from("testimonials" as any).select("*").eq("page", "Home").order("display_order", { ascending: true }),
    ]);
    testimonialsData = (testiData as any[]) || [];

    const rows = ((clientsData as any[]) || []) as {
      name: string;
      logo_url: string | null;
      logo_full_url: string | null;
    }[];

    // Priority: P&G / Coca-Cola / PepsiCo / UNICEF / ADNOC first, then any other featured clients.
    const byName = new Map(rows.map((r) => [r.name.toLowerCase(), r]));
    const preferred = NAMED_TRUST
      .map((n) => byName.get(n.toLowerCase()))
      .filter((r): r is typeof rows[number] => !!r);
    const extras = rows.filter(
      (r) => !NAMED_TRUST.some((t) => t.toLowerCase() === r.name.toLowerCase()),
    );
    const ordered = preferred.length ? [...preferred, ...extras] : rows;

    trustClients = ordered.length
      ? ordered.map((r) => ({
        name: r.name,
        // Trust strip prefers the full wordmark; fall back to icon-only.
        logoUrl: r.logo_full_url || r.logo_url || null,
      }))
      : NAMED_TRUST.map((name) => ({ name }));

    // Featured clients with uploaded icon logos, in display order, for the hero orbit.
    clientLogos = rows
      .filter((c): c is typeof rows[number] & { logo_url: string } => !!c.logo_url)
      .map((c) => ({ name: c.name, logo_url: c.logo_url }));

    batchCount = (batchStat as any)?.value ?? batchCount;
  } catch (error) {
    console.error("HomePage data fetch error:", error);
  }

  return (
    <>
      {/* 01 — Hero */}
      <Hero batchCount={batchCount} clientLogos={clientLogos} />

      {/* 02 — What we do (problem-framed capabilities) */}
      <ServicesGrid />

      {/* 03 — How we work (ownership / senior / CGAP) */}
      <Differentiators />

      {/* 04 — Trust bar (named logos lead) */}
      <ClientLogoStrip clients={trustClients} />

      {/* 05 — Selected work (case studies, outcome-led) */}
      <CaseStudiesFeatured />



      {/* 07 — Credentials bar (AWS / Microsoft / AppSource) */}
      <CredentialsBar />

      {/* 08 — Secondary entries (demoted tri-block) */}
      <SecondaryEntries />

      {/* 09 — Testimonials (social proof) */}
      <div id="testimonials">
        <Testimonials testimonials={testimonialsData} />
      </div>

      {/* 10 — CTA band */}
      <CtaBand />
    </>
  );
}
