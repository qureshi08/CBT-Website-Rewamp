import Link from "next/link";
import {
    BarChart3,
    Database,
    LineChart,
    BrainCircuit,
    Settings2,
    BookOpen,
} from "lucide-react";

const services = [
    {
        num: "01",
        icon: BarChart3,
        title: "Analytical Maturity Assessment",
        description:
            "Evaluate your organisation's data readiness and create a roadmap for analytics excellence.",
    },
    {
        num: "02",
        icon: Database,
        title: "Enterprise DWH Implementation",
        description:
            "Design and build scalable enterprise data warehouses that power your business intelligence.",
    },
    {
        num: "03",
        icon: LineChart,
        title: "Business Analytics",
        description:
            "Transform data into actionable insights with dashboards, reports, and self-service BI.",
    },
    {
        num: "04",
        icon: BrainCircuit,
        title: "Decision Sciences",
        description:
            "Apply statistical modelling and machine learning to solve complex business problems.",
    },
    {
        num: "05",
        icon: Settings2,
        title: "AnalyticOps",
        description:
            "Operationalise your analytics with governance, automation, and sustainable delivery models.",
    },
    {
        num: "06",
        icon: BookOpen,
        title: "Training & Development",
        description:
            "Upskill your teams through hands-on training in data engineering, analytics, and BI tools.",
    },
];

export default function ServicesGrid() {
    return (
        <section className="bg-white py-16 px-8" id="services">
            <div className="container-main w-full p-0">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-6 border-b border-border gap-5">
                    <div className="max-w-xl">
                        <span className="section-tag animate-fade-in">What we do</span>
                        <h2 className="section-heading animate-fade-up animation-delay-100">
                            End-to-end expertise,<br />from pipeline to product
                        </h2>
                        <p className="section-sub animate-fade-up animation-delay-200">
                            End-to-end data and analytics consulting — from assessment to implementation to team up-skilling.
                        </p>
                    </div>
                    <Link href="/contact" className="btn-secondary shrink-0 animate-fade-in group py-2.5">
                        All services <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border border border-border rounded-[12px] overflow-hidden animate-fade-up animation-delay-300">
                    {services.map((service) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={service.title}
                                className="group bg-white p-8 transition-colors duration-200 relative cursor-default hover:bg-surface flex flex-col h-full"
                            >
                                <span className="absolute top-[20px] right-[24px] font-mono text-[10px] text-border transition-colors duration-200 group-hover:text-text-muted">
                                    {service.num}
                                </span>

                                <div className="w-[40px] h-[40px] bg-surface rounded-[8px] flex items-center justify-center mb-[18px] transition-colors duration-200 group-hover:bg-primary">
                                    <Icon size={18} className="text-primary transition-colors duration-200 group-hover:text-white" />
                                </div>
                                <h3 className="font-heading text-[1.1rem] font-bold text-text-heading mb-[8px]">
                                    {service.title}
                                </h3>
                                <p className="text-[13px] leading-[1.65] text-text-body mb-[20px] flex-grow">
                                    {service.description}
                                </p>
                                <Link href="#" className="flex items-center gap-[6px] text-[12px] font-semibold text-text-muted transition-colors duration-200 group-hover:text-primary uppercase tracking-widest">
                                    Learn more <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
