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

export default function ClientLogoStrip() {
    return (
        <section className="bg-dark-section">
            <div className="container-main section-padding">
                <div className="text-center mb-12">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-3">
                        Our Clients
                    </h2>
                    <p className="text-2xl md:text-3xl font-bold text-white">
                        Trusted by Leading Organisations
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {clients.map((client) => (
                        <div
                            key={client}
                            className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-5 flex items-center justify-center min-h-[80px] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-200 group"
                        >
                            <span className="text-sm font-medium text-white/40 group-hover:text-white/80 transition-colors duration-200 text-center leading-tight">
                                {client}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function ClientLogoGrid({ featured = false }: { featured?: boolean }) {
    const displayClients = featured ? clients.slice(0, 8) : clients;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {displayClients.map((client) => (
                <div
                    key={client}
                    className="bg-light-grey rounded-xl p-5 flex items-center justify-center min-h-[72px] hover:bg-tag-bg transition-colors duration-200 group border border-border/50"
                >
                    <span className="text-sm font-medium text-mid-grey group-hover:text-green-primary transition-colors duration-200 text-center leading-tight">
                        {client}
                    </span>
                </div>
            ))}
        </div>
    );
}
