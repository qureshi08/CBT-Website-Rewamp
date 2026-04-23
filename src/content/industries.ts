export type IndustryKey = "retail" | "telecom" | "banking" | "government";

export type IndustryContent = {
    slug: IndustryKey;
    label: string;
    tagline: string;
    heroHeadline: string;
    heroItalic: string;
    heroSub: string;
    context: {
        title: string;
        italic: string;
        body: string;
    };
    whereWeHelp: { num: string; title: string; body: string }[];
    outcomeHighlights: { number: string; label: string; note: string }[];
    // Hardcoded per-industry case study slug list — swap to Supabase query once
    // schema adds an `industry` field on `case_studies`.
    caseStudySlugs: string[];
};

export const INDUSTRIES: Record<IndustryKey, IndustryContent> = {
    retail: {
        slug: "retail",
        label: "Retail",
        tagline: "Margin, mix, and the moment of purchase.",
        heroHeadline: "Data where the transaction",
        heroItalic: "happens.",
        heroSub:
            "Loyalty, demand forecasting, store performance, assortment. We rebuild the decisioning stack retail teams actually use to defend margin and grow basket size.",
        context: {
            title: "The shelf is the",
            italic: "feedback loop.",
            body: "Retailers swim in transaction data and drown in it. Reports are stale by the time they land, loyalty economics are guesses, and assortment decisions get made by instinct. We rebuild the plumbing — warehousing, governance, dashboards — so store teams, category managers, and CMOs see the same numbers at the same time.",
        },
        whereWeHelp: [
            {
                num: "01",
                title: "Loyalty & personalisation",
                body: "Decisioning stack on modern data platforms. Redemption uplift that actually protects margin, not erodes it.",
            },
            {
                num: "02",
                title: "Demand forecasting",
                body: "Store- and SKU-level forecasts that reduce stockouts and markdown waste — trained on your data, not a generic model.",
            },
            {
                num: "03",
                title: "Category & assortment",
                body: "Self-serve BI for category managers. Test, read, and roll out ranges without waiting a week for a report.",
            },
        ],
        outcomeHighlights: [
            { number: "+32%", label: "margin", note: "pilot category uplift" },
            { number: "−18%", label: "stockouts", note: "across 200+ stores" },
            { number: "9 min", label: "to insight", note: "down from 6 hours" },
        ],
        caseStudySlugs: ["loyalty-margin-uplift", "realtime-bi-40x"],
    },

    telecom: {
        slug: "telecom",
        label: "Telecom",
        tagline: "Real-time network, real-time decisions.",
        heroHeadline: "Answers at the speed of the",
        heroItalic: "network.",
        heroSub:
            "Subscriber analytics, churn, network operations, billing assurance. We replace batch reporting estates with architectures that keep up with the business.",
        context: {
            title: "The data arrives",
            italic: "fast.",
            body: "Telecoms have no shortage of data — the problem is stitching it together fast enough to matter. We modernise the warehouse, consolidate the reporting estate, and land copilots and predictive models on top of a foundation that won't collapse under load.",
        },
        whereWeHelp: [
            {
                num: "01",
                title: "Subscriber & churn analytics",
                body: "Predictive churn, next-best-action, LTV modelling — grounded in your CRM and usage data, not a vendor demo.",
            },
            {
                num: "02",
                title: "Network & operations BI",
                body: "Real-time dashboards for NOC and operations teams. Time-to-insight dropped from hours to minutes in production.",
            },
            {
                num: "03",
                title: "Billing & revenue assurance",
                body: "Reconciliation and leakage detection across the revenue stack. Quiet wins that compound.",
            },
        ],
        outcomeHighlights: [
            { number: "40×", label: "faster BI", note: "6h → 9min" },
            { number: "−12%", label: "churn", note: "in target segments" },
            { number: "7-day", label: "migration", note: "batch → real-time" },
        ],
        caseStudySlugs: ["realtime-bi-40x"],
    },

    banking: {
        slug: "banking",
        label: "Banking",
        tagline: "Regulator-ready. Audit-traceable.",
        heroHeadline: "Risk, calculated. Output,",
        heroItalic: "defensible.",
        heroSub:
            "IFRS 9 ECL, credit risk, fraud, regulatory reporting. We build models and pipelines that stand up to the regulator and the internal audit team — in that order.",
        context: {
            title: "Audit is the",
            italic: "first user.",
            body: "Banks don't need another dashboard; they need outputs that survive a regulatory review. Our work in banking is delivered in collaboration with KPMG — credit risk, ECL, fraud, capital — with full lineage and model governance built in from day one, not bolted on.",
        },
        whereWeHelp: [
            {
                num: "01",
                title: "IFRS 9 & credit risk",
                body: "ECL modelling, PD/LGD/EAD, scenario analysis — bank-ready and audit-traceable. Delivered with KPMG.",
            },
            {
                num: "02",
                title: "Fraud & compliance",
                body: "Transaction monitoring, AML signals, and investigator tooling — so the first line actually gets used.",
            },
            {
                num: "03",
                title: "Regulatory & capital reporting",
                body: "Pipelines that survive audit. Lineage, reconciliation, and documented governance as a default.",
            },
        ],
        outcomeHighlights: [
            { number: "48 h", label: "ECL turnaround", note: "raw data → regulator" },
            { number: "100%", label: "audit pass", note: "first submission" },
            { number: "KPMG", label: "delivery partner", note: "joint engagement" },
        ],
        caseStudySlugs: ["ecl-48-hours"],
    },

    government: {
        slug: "government",
        label: "Government",
        tagline: "Public data. Public value.",
        heroHeadline: "Citizen outcomes, measured",
        heroItalic: "transparently.",
        heroSub:
            "Programme measurement, service analytics, and operational visibility across ministries and agencies. Delivered by a team that respects procurement, governance, and the long road to impact.",
        context: {
            title: "The accountability is",
            italic: "public.",
            body: "Public-sector data work is slower and more scrutinised — rightly so. We design for auditability, procurement cycles, and programme owners who need to show impact to stakeholders and the public. Dashboards that answer real questions, not demo questions.",
        },
        whereWeHelp: [
            {
                num: "01",
                title: "Programme measurement",
                body: "Outcome frameworks, instrumentation, and reporting on grant- and KPI-tied programmes — without a year-long discovery.",
            },
            {
                num: "02",
                title: "Service & operational analytics",
                body: "Case volume, SLA performance, and citizen-service insight surfaced to operations teams and ministers alike.",
            },
            {
                num: "03",
                title: "Data foundations for public agencies",
                body: "Warehousing, governance, and quality built to withstand audit, FOI, and change of administration.",
            },
        ],
        outcomeHighlights: [
            { number: "1", label: "source of truth", note: "across 4 agencies" },
            { number: "30+", label: "KPIs", note: "instrumented end-to-end" },
            { number: "Audit", label: "pass", note: "no findings on data layer" },
        ],
        caseStudySlugs: [],
    },
};

export const INDUSTRY_SLUGS = Object.keys(INDUSTRIES) as IndustryKey[];
