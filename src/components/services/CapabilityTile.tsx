import Ic, { type IconName } from "@/components/shared/Icons";

type CapabilityTileProps = {
    num: string;
    title: string;
    description: string;
    tools?: string[];
    icon: IconName;
    emerging?: boolean;
};

export default function CapabilityTile({
    num,
    title,
    description,
    tools,
    icon,
    emerging,
}: CapabilityTileProps) {
    return (
        <article className={`services-tile${emerging ? " services-tile-emerging" : ""}`}>
            <div className="services-tile-head">
                <div className="services-tile-icon">
                    <Ic name={icon} size={22} stroke="var(--color-primary)" />
                </div>
                <span className="services-tile-num">{num}</span>
            </div>

            <div className="services-tile-title-row">
                <h3 className="services-tile-title">{title}</h3>
                {emerging && <span className="services-tile-badge">Emerging</span>}
            </div>

            <p className="services-tile-desc">{description}</p>

            {tools && tools.length > 0 && (
                <div className="services-tile-tools">
                    {tools.map((t) => (
                        <span key={t} className="services-tile-tool">
                            {t}
                        </span>
                    ))}
                </div>
            )}
        </article>
    );
}
