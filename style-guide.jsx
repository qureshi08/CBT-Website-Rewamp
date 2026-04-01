import { useState } from "react";

const tokens = {
  colors: {
    primary: [
      { name: "--color-primary", hex: "#00994D", label: "CBT Green", usage: "CTAs, active states, accents" },
      { name: "--color-primary-light", hex: "#00C060", label: "Green Light", usage: "Hover states, highlights" },
      { name: "--color-primary-dark", hex: "#007A3D", label: "Green Dark", usage: "Active states, depth" },
      { name: "--color-primary-muted", hex: "#E6F5ED", label: "Green Muted", usage: "Tinted backgrounds, cards" },
    ],
    neutrals: [
      { name: "--color-white", hex: "#FFFFFF", label: "White", usage: "Cards, hero sections" },
      { name: "--color-surface", hex: "#F7F8F7", label: "Surface", usage: "Page background alt" },
      { name: "--color-border", hex: "#E2E8E4", label: "Border", usage: "Dividers, input borders" },
      { name: "--color-text-muted", hex: "#6B7280", label: "Text Muted", usage: "Captions, secondary copy" },
      { name: "--color-text-body", hex: "#374151", label: "Text Body", usage: "All body copy" },
      { name: "--color-text-heading", hex: "#111827", label: "Text Heading", usage: "Headings, titles" },
    ],
    semantic: [
      { name: "--color-success", hex: "#00994D", label: "Success", usage: "Positive feedback" },
      { name: "--color-warning", hex: "#F59E0B", label: "Warning", usage: "Caution states" },
      { name: "--color-error", hex: "#EF4444", label: "Error", usage: "Errors, destructive" },
      { name: "--color-info", hex: "#3B82F6", label: "Info", usage: "Informational states" },
    ],
  },
  typeScale: [
    { token: "--text-xs", rem: "0.75rem", px: "12px", use: "Labels, legal" },
    { token: "--text-sm", rem: "0.875rem", px: "14px", use: "Captions, metadata" },
    { token: "--text-base", rem: "1rem", px: "16px", use: "Body default" },
    { token: "--text-lg", rem: "1.125rem", px: "18px", use: "Lead paragraphs" },
    { token: "--text-xl", rem: "1.25rem", px: "20px", use: "Card titles" },
    { token: "--text-2xl", rem: "1.5rem", px: "24px", use: "Section subtitles" },
    { token: "--text-3xl", rem: "1.875rem", px: "30px", use: "Section headings" },
    { token: "--text-4xl", rem: "2.25rem", px: "36px", use: "Page titles" },
    { token: "--text-5xl", rem: "3rem", px: "48px", use: "Hero headings" },
    { token: "--text-6xl", rem: "3.75rem", px: "60px", use: "Large display" },
  ],
};

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #F7F8F7; color: #374151; }
`;

function CopyBadge({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={copy} style={{
      fontSize: "11px", fontFamily: "'DM Sans', sans-serif",
      background: copied ? "#E6F5ED" : "#F3F4F6",
      color: copied ? "#00994D" : "#6B7280",
      border: "none", borderRadius: "4px",
      padding: "2px 8px", cursor: "pointer",
      transition: "all 0.15s ease"
    }}>
      {copied ? "Copied!" : text}
    </button>
  );
}

function ColorSwatch({ name, hex, label, usage }) {
  const isLight = ["#FFFFFF", "#F7F8F7", "#E2E8E4", "#E6F5ED"].includes(hex);
  return (
    <div style={{
      borderRadius: "10px", overflow: "hidden",
      border: "1px solid #E2E8E4",
      background: "#fff",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
    }}>
      <div style={{
        background: hex, height: "72px",
        display: "flex", alignItems: "center", justifyContent: "center",
        border: isLight ? "1px solid #E2E8E4" : "none"
      }}>
        <span style={{
          fontSize: "13px", fontWeight: 600,
          fontFamily: "'JetBrains Mono', monospace",
          color: isLight ? "#374151" : "#fff",
          background: isLight ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.15)",
          padding: "2px 8px", borderRadius: "4px"
        }}>{hex}</span>
      </div>
      <div style={{ padding: "12px" }}>
        <div style={{ fontWeight: 600, fontSize: "13px", color: "#111827", marginBottom: "2px" }}>{label}</div>
        <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "8px" }}>{usage}</div>
        <CopyBadge text={name} />
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: "56px" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "12px",
        marginBottom: "24px"
      }}>
        <div style={{ width: "4px", height: "28px", background: "#00994D", borderRadius: "2px" }} />
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "24px", fontWeight: 700,
          color: "#111827"
        }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Tab({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "8px 20px",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "14px", fontWeight: 500,
      background: active ? "#00994D" : "transparent",
      color: active ? "#fff" : "#6B7280",
      border: active ? "none" : "1px solid #E2E8E4",
      borderRadius: "6px", cursor: "pointer",
      transition: "all 0.15s ease"
    }}>{label}</button>
  );
}

export default function StyleGuide() {
  const [activeTab, setActiveTab] = useState("colors");
  const tabs = [
    { id: "colors", label: "Colors" },
    { id: "typography", label: "Typography" },
    { id: "components", label: "Components" },
    { id: "spacing", label: "Spacing & Layout" },
    { id: "pages", label: "Pages" },
  ];

  return (
    <>
      <style>{style}</style>
      <div style={{ minHeight: "100vh", background: "#F7F8F7" }}>

        {/* Header */}
        <div style={{
          background: "#fff",
          borderBottom: "1px solid #E2E8E4",
          padding: "0 32px",
          position: "sticky", top: 0, zIndex: 100
        }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "16px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "36px", height: "36px", background: "#00994D",
                borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: "14px", fontFamily: "'DM Sans', sans-serif" }}>CBT</span>
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "16px", color: "#111827" }}>
                  Convergent Business Technologies
                </div>
                <div style={{ fontSize: "11px", color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}>Design Guidelines v1.0</div>
              </div>
            </div>
            <div style={{ fontSize: "12px", color: "#6B7280", fontFamily: "'JetBrains Mono', monospace" }}>design-guidelines.md</div>
          </div>
          <div style={{ display: "flex", gap: "8px", paddingBottom: "12px" }}>
            {tabs.map(t => <Tab key={t.id} label={t.label} active={activeTab === t.id} onClick={() => setActiveTab(t.id)} />)}
          </div>
        </div>

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 32px" }}>

          {/* COLORS TAB */}
          {activeTab === "colors" && (
            <>
              <Section title="Primary Green Palette">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
                  {tokens.colors.primary.map(c => <ColorSwatch key={c.name} {...c} />)}
                </div>
              </Section>
              <Section title="Neutrals">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
                  {tokens.colors.neutrals.map(c => <ColorSwatch key={c.name} {...c} />)}
                </div>
              </Section>
              <Section title="Semantic Colors">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
                  {tokens.colors.semantic.map(c => <ColorSwatch key={c.name} {...c} />)}
                </div>
              </Section>
            </>
          )}

          {/* TYPOGRAPHY TAB */}
          {activeTab === "typography" && (
            <>
              <Section title="Font Families">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "32px" }}>
                  {[
                    { name: "Playfair Display", var: "--font-heading", role: "Headings & Display", sample: "The Future of Data", weight: "600 / 700", style: { fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700 } },
                    { name: "DM Sans", var: "--font-body", role: "Body, UI, Navigation", sample: "Helping businesses transform with modern data and AI solutions.", weight: "300 / 400 / 500 / 600", style: { fontFamily: "'DM Sans', sans-serif", fontSize: "16px", lineHeight: "1.65" } },
                    { name: "JetBrains Mono", var: "--font-mono", role: "Code & Tech Specs", sample: "const insights = await ai.analyze(data)", weight: "400", style: { fontFamily: "'JetBrains Mono', monospace", fontSize: "14px" } },
                  ].map(f => (
                    <div key={f.name} style={{ background: "#fff", border: "1px solid #E2E8E4", borderRadius: "10px", padding: "24px" }}>
                      <div style={{ marginBottom: "16px", fontSize: "11px", color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}>
                        <span style={{ background: "#E6F5ED", color: "#00994D", padding: "2px 8px", borderRadius: "4px", fontWeight: 600 }}>{f.var}</span>
                        <div style={{ marginTop: "6px" }}>{f.role}</div>
                      </div>
                      <div style={{ ...f.style, color: "#111827", marginBottom: "16px" }}>{f.sample}</div>
                      <div style={{ fontSize: "11px", color: "#9CA3AF", fontFamily: "'DM Sans', sans-serif" }}>
                        <strong>{f.name}</strong> · Weight: {f.weight}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              <Section title="Type Scale">
                <div style={{ background: "#fff", border: "1px solid #E2E8E4", borderRadius: "10px", overflow: "hidden" }}>
                  {tokens.typeScale.map((t, i) => (
                    <div key={t.token} style={{
                      display: "grid", gridTemplateColumns: "180px 80px 60px 1fr",
                      alignItems: "center", gap: "16px",
                      padding: "14px 24px",
                      borderBottom: i < tokens.typeScale.length - 1 ? "1px solid #E2E8E4" : "none",
                      background: i % 2 === 0 ? "#fff" : "#FAFAFA"
                    }}>
                      <code style={{ fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: "#00994D" }}>{t.token}</code>
                      <span style={{ fontSize: "12px", color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}>{t.rem}</span>
                      <span style={{ fontSize: "12px", color: "#9CA3AF", fontFamily: "'DM Sans', sans-serif" }}>{t.px}</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: t.rem, color: "#374151", lineHeight: 1.3 }}>Sample text — {t.use}</span>
                    </div>
                  ))}
                </div>
              </Section>
            </>
          )}

          {/* COMPONENTS TAB */}
          {activeTab === "components" && (
            <>
              <Section title="Buttons">
                <div style={{ background: "#fff", border: "1px solid #E2E8E4", borderRadius: "10px", padding: "32px" }}>
                  <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap", marginBottom: "24px" }}>
                    <button style={{ background: "#00994D", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", padding: "10px 28px", borderRadius: "6px", border: "2px solid transparent", cursor: "pointer" }}>
                      Get Started
                    </button>
                    <button style={{ background: "transparent", color: "#00994D", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", padding: "10px 28px", borderRadius: "6px", border: "2px solid #00994D", cursor: "pointer" }}>
                      Learn More
                    </button>
                    <button style={{ background: "transparent", color: "#374151", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "15px", padding: "10px 20px", borderRadius: "6px", border: "none", textDecoration: "underline", textUnderlineOffset: "3px", cursor: "pointer" }}>
                      View case study →
                    </button>
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {["btn-primary", "btn-secondary", "btn-ghost"].map(c => <CopyBadge key={c} text={`.${c}`} />)}
                  </div>
                </div>
              </Section>

              <Section title="Cards">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
                  {[
                    { icon: "◈", title: "Data Strategy", desc: "We help you build a data foundation that scales — from pipelines to governance frameworks." },
                    { icon: "☁", title: "Cloud Migration", desc: "Seamless migration to AWS, Azure, or GCP with minimal disruption and maximum performance." },
                    { icon: "⬡", title: "AI Adoption", desc: "Practical AI integration tailored to your business goals — not just hype, but real outcomes." },
                  ].map(card => (
                    <div key={card.title} style={{
                      background: "#fff", border: "1px solid #E2E8E4",
                      borderRadius: "12px", padding: "28px",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
                    }}>
                      <div style={{ fontSize: "24px", marginBottom: "12px", color: "#00994D" }}>{card.icon}</div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "18px", color: "#111827", marginBottom: "10px" }}>{card.title}</div>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#6B7280", lineHeight: "1.65" }}>{card.desc}</p>
                      <div style={{ marginTop: "16px", color: "#00994D", fontSize: "14px", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>Learn more →</div>
                    </div>
                  ))}
                </div>
              </Section>

              <Section title="Form Inputs">
                <div style={{ background: "#fff", border: "1px solid #E2E8E4", borderRadius: "10px", padding: "32px", maxWidth: "480px" }}>
                  {[
                    { label: "Full Name", placeholder: "Jane Smith", type: "text" },
                    { label: "Company Email", placeholder: "jane@company.com", type: "email" },
                  ].map(f => (
                    <div key={f.label} style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} style={{
                        width: "100%", border: "1px solid #E2E8E4", borderRadius: "6px",
                        padding: "10px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: "15px",
                        color: "#374151", outline: "none"
                      }} />
                    </div>
                  ))}
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Service Interest</label>
                    <select style={{ width: "100%", border: "1px solid #E2E8E4", borderRadius: "6px", padding: "10px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "#374151" }}>
                      <option>Data Strategy</option>
                      <option>Cloud Migration</option>
                      <option>AI Adoption</option>
                      <option>Training Program</option>
                    </select>
                  </div>
                  <button style={{ width: "100%", background: "#00994D", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", padding: "12px", borderRadius: "6px", border: "none", cursor: "pointer" }}>
                    Send Message
                  </button>
                </div>
              </Section>

              <Section title="Testimonial / Quote Block">
                <div style={{
                  background: "#E6F5ED", borderRadius: "12px", padding: "32px",
                  borderLeft: "4px solid #00994D", maxWidth: "600px"
                }}>
                  <p style={{
                    fontFamily: "'Playfair Display', serif", fontSize: "20px",
                    color: "#111827", lineHeight: "1.6", fontStyle: "italic", marginBottom: "16px"
                  }}>
                    "CBT transformed the way we think about data. Within 6 months, our decision-making went from gut feel to insight-driven."
                  </p>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#6B7280" }}>
                    <strong style={{ color: "#374151" }}>Sarah Okonkwo</strong> — CTO, NovaTech Solutions
                  </div>
                </div>
              </Section>
            </>
          )}

          {/* SPACING TAB */}
          {activeTab === "spacing" && (
            <>
              <Section title="Spacing Scale">
                <div style={{ background: "#fff", border: "1px solid #E2E8E4", borderRadius: "10px", overflow: "hidden" }}>
                  {[
                    ["--space-1", "0.25rem", "4px"],
                    ["--space-2", "0.5rem", "8px"],
                    ["--space-3", "0.75rem", "12px"],
                    ["--space-4", "1rem", "16px"],
                    ["--space-6", "1.5rem", "24px"],
                    ["--space-8", "2rem", "32px"],
                    ["--space-12", "3rem", "48px"],
                    ["--space-16", "4rem", "64px"],
                    ["--space-20", "5rem", "80px"],
                    ["--space-24", "6rem", "96px"],
                  ].map(([token, rem, px], i) => (
                    <div key={token} style={{
                      display: "grid", gridTemplateColumns: "200px 80px 60px 1fr",
                      alignItems: "center", gap: "16px", padding: "12px 24px",
                      borderBottom: i < 9 ? "1px solid #E2E8E4" : "none",
                      background: i % 2 === 0 ? "#fff" : "#FAFAFA"
                    }}>
                      <code style={{ fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: "#00994D" }}>{token}</code>
                      <span style={{ fontSize: "12px", color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}>{rem}</span>
                      <span style={{ fontSize: "12px", color: "#9CA3AF", fontFamily: "'DM Sans', sans-serif" }}>{px}</span>
                      <div style={{ height: "12px", background: "#00994D", borderRadius: "2px", width: px, opacity: 0.7 }} />
                    </div>
                  ))}
                </div>
              </Section>

              <Section title="Layout Containers">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  {[
                    { token: "--container-max", value: "1200px", desc: "Standard page container" },
                    { token: "--container-wide", value: "1440px", desc: "Full-width sections" },
                    { token: "--container-prose", value: "720px", desc: "Blog & article content" },
                    { token: "--section-py", value: "5rem (80px)", desc: "Standard section vertical padding" },
                  ].map(c => (
                    <div key={c.token} style={{ background: "#fff", border: "1px solid #E2E8E4", borderRadius: "10px", padding: "20px" }}>
                      <code style={{ fontSize: "13px", fontFamily: "'JetBrains Mono', monospace", color: "#00994D" }}>{c.token}</code>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "20px", fontWeight: 600, color: "#111827", margin: "8px 0 4px" }}>{c.value}</div>
                      <div style={{ fontSize: "13px", color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}>{c.desc}</div>
                    </div>
                  ))}
                </div>
              </Section>

              <Section title="Breakpoints">
                <div style={{ background: "#fff", border: "1px solid #E2E8E4", borderRadius: "10px", overflow: "hidden" }}>
                  {[
                    ["--bp-sm", "640px", "Large mobile"],
                    ["--bp-md", "768px", "Tablet portrait"],
                    ["--bp-lg", "1024px", "Tablet landscape / small desktop"],
                    ["--bp-xl", "1280px", "Desktop"],
                    ["--bp-2xl", "1536px", "Large desktop"],
                  ].map(([token, val, desc], i) => (
                    <div key={token} style={{
                      display: "grid", gridTemplateColumns: "180px 100px 1fr",
                      alignItems: "center", gap: "16px", padding: "14px 24px",
                      borderBottom: i < 4 ? "1px solid #E2E8E4" : "none",
                      background: i % 2 === 0 ? "#fff" : "#FAFAFA"
                    }}>
                      <code style={{ fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: "#00994D" }}>{token}</code>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#374151", fontFamily: "'DM Sans', sans-serif" }}>{val}</span>
                      <span style={{ fontSize: "13px", color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}>{desc}</span>
                    </div>
                  ))}
                </div>
              </Section>
            </>
          )}

          {/* PAGES TAB */}
          {activeTab === "pages" && (
            <Section title="Page Inventory & Notes">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  { page: "Home", path: "/", audience: "All", notes: "Large hero, trust indicators, service overview, CTA to contact" },
                  { page: "Services", path: "/services", audience: "SME & Enterprise", notes: "Card grid, 3 service areas: Data Strategy, Cloud, AI" },
                  { page: "Case Studies", path: "/case-studies", audience: "All clients", notes: "Testimonials + results-driven case study cards" },
                  { page: "Training Program", path: "/training", audience: "Graduates", notes: "Distinct tone — encouraging, outcome-focused. Separate CTA flow." },
                  { page: "Partners", path: "/partners", audience: "Potential partners", notes: "Partnership value prop, collaboration enquiry form" },
                  { page: "Contact", path: "/contact", audience: "All", notes: "Clean form: Name, Email, Company, Service interest, Message" },
                ].map(p => (
                  <div key={p.page} style={{ background: "#fff", border: "1px solid #E2E8E4", borderRadius: "10px", padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "17px", color: "#111827" }}>{p.page}</div>
                      <code style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", background: "#E6F5ED", color: "#00994D", padding: "2px 8px", borderRadius: "4px" }}>{p.path}</code>
                    </div>
                    <div style={{ fontSize: "11px", fontWeight: 600, color: "#00994D", fontFamily: "'DM Sans', sans-serif", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Audience: {p.audience}
                    </div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#6B7280", lineHeight: "1.6" }}>{p.notes}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

        </div>

        {/* Footer */}
        <div style={{
          borderTop: "1px solid #E2E8E4", background: "#fff",
          padding: "20px 32px", textAlign: "center"
        }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#9CA3AF" }}>
            Convergent Business Technologies · Design Guidelines v1.0 · 2026
          </span>
        </div>
      </div>
    </>
  );
}
