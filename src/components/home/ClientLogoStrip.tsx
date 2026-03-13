const clients = [
    "Pepsi",
    "Microsoft",
    "Coca-Cola",
    "P&G",
    "Hush Puppies",
    "UNICEF",
    "KPMG",
    "ThermosPHR",
    "Shelfr",
    "Southlakes Housing",
    "Bunge",
    "MBC",
    "SPAR",
    "Dabur",
    "Cenium Hospitality ERP",
    "Goody",
    "Cumbria Chamber of Commerce",
];

interface ClientLogoProps {
    clientNames?: string[];
}

export default function ClientLogoStrip({ clientNames = clients }: ClientLogoProps) {
    return (
        <section className="bg-text-heading py-[100px] px-8">
            <div className="container-main p-0">
                <div className="text-center mb-[64px]">
                    <span className="uppercase-label text-white/40 block mb-[16px]">
                        Trusted Globally
                    </span>
                    <h2 className="font-heading text-[clamp(2rem,4vw,3.2rem)] font-bold text-white tracking-[-0.02em]">
                        Our Strategic <span className="italic text-primary">Portfolio</span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[24px]">
                    {clientNames.map((client) => (
                        <div
                            key={client}
                            className="bg-white/[0.03] border border-white/[0.05] rounded-[12px] p-6 flex items-center justify-center min-h-[90px] hover:bg-white/[0.06] hover:border-primary/30 transition-all duration-300 group"
                        >
                            <span className="text-[14px] font-medium text-white/40 group-hover:text-white transition-colors duration-300 text-center leading-tight font-body">
                                {client}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function ClientLogoGrid({
    featured = false,
    clientNames = clients
}: {
    featured?: boolean;
    clientNames?: string[];
}) {
    const displayClients = featured ? clientNames.slice(0, 8) : clientNames;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[24px]">
            {displayClients.map((client) => (
                <div
                    key={client}
                    className="bg-surface rounded-[12px] p-6 flex items-center justify-center min-h-[80px] hover:bg-white hover:shadow-[0_8px_30px_rgba(0,153,77,0.12)] transition-all duration-300 group border border-border"
                >
                    <span className="text-[13px] font-bold text-text-body/50 group-hover:text-primary transition-colors duration-300 text-center leading-tight font-body uppercase tracking-[0.05em]">
                        {client}
                    </span>
                </div>
            ))}
        </div>
    );
}
