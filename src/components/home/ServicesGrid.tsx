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
        icon: BarChart3,
        title: "Analytical Maturity Assessment",
        description:
            "Evaluate your organisation's data readiness and create a roadmap for analytics excellence.",
    },
    {
        icon: Database,
        title: "Enterprise DWH Implementation",
        description:
            "Design and build scalable enterprise data warehouses that power your business intelligence.",
    },
    {
        icon: LineChart,
        title: "Business Analytics",
        description:
            "Transform data into actionable insights with dashboards, reports, and self-service BI.",
    },
    {
        icon: BrainCircuit,
        title: "Decision Sciences",
        description:
            "Apply statistical modelling and machine learning to solve complex business problems.",
    },
    {
        icon: Settings2,
        title: "AnalyticOps",
        description:
            "Operationalise your analytics with governance, automation, and sustainable delivery models.",
    },
    {
        icon: BookOpen,
        title: "Training & Development",
        description:
            "Upskill your teams through hands-on training in data engineering, analytics, and BI tools.",
    },
];

export default function ServicesGrid() {
    return (
        <section className="bg-white">
            <div className="container-main section-padding">
                <div className="text-center mb-12">
                    <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-green-primary bg-tag-bg px-3 py-1.5 rounded-full mb-4">
                        What We Do
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-charcoal">
                        Our Services
                    </h2>
                    <p className="mt-4 text-lg text-mid-grey max-w-2xl mx-auto">
                        End-to-end data and analytics consulting — from assessment to
                        implementation to training.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={service.title}
                                className="bg-light-grey rounded-xl p-6 group hover:bg-tag-bg transition-colors duration-200 card-hover border border-transparent hover:border-green-primary/20"
                            >
                                <div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center mb-4 shadow-sm group-hover:bg-green-primary transition-colors duration-200">
                                    <Icon
                                        size={20}
                                        className="text-mid-grey group-hover:text-white transition-colors duration-200"
                                    />
                                </div>
                                <h3 className="text-base font-bold text-charcoal mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-mid-grey leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
