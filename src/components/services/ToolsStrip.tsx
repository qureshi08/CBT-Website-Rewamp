type ToolGroup = { label: string; tools: string[]; primary?: boolean };

const GROUPS: ToolGroup[] = [
    {
        label: "Microsoft ecosystem",
        primary: true,
        tools: [
            "Microsoft Fabric",
            "Synapse",
            "Power BI",
            "Power Apps",
            "Data Factory",
            "SQL",
            "Purview ML",
            "Power Automate",
        ],
    },
    {
        label: "Data & Cloud platforms",
        tools: ["Databricks", "Snowflake", "Data Lake", "AWS", "GCP", "BigQuery"],
    },
    {
        label: "Visualisation & BI",
        tools: ["Power BI", "Tableau", "Looker"],
    },
];

export default function ToolsStrip() {
    return (
        <div className="services-tools-groups">
            {GROUPS.map((g) => (
                <div
                    key={g.label}
                    className={`services-tools-group${g.primary ? " services-tools-group-primary" : ""}`}
                >
                    <div className="services-tools-group-head">
                        <span className="services-tools-group-label">{g.label}</span>
                        {g.primary && <span className="services-tools-primary-flag">Primary</span>}
                    </div>
                    <div className="services-tools-group-chips">
                        {g.tools.map((t) => (
                            <span key={t} className="services-tool-chip">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
