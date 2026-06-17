"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Edit2, Trash2, X } from "lucide-react";
import Modal from "@/components/ui/Modal";
import ImageUpload from "@/components/ui/ImageUpload";
import { adminCrud } from "@/lib/actions/admin-actions";

// --- Helpers ------------------------------------------------------------

function slugify(input: string): string {
    return input
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function toStringArray(value: unknown): string[] {
    if (Array.isArray(value)) return value.filter((v): v is string => typeof v === "string");
    return [];
}

// Two-digit display number derived from catalogue position (1 → "01").
function displayNum(index: number): string {
    return String(index + 1).padStart(2, "0");
}

// --- Page ---------------------------------------------------------------

export default function AdminCustomVisuals() {
    const [visuals, setVisuals] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVisual, setEditingVisual] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state (live-UI fields that don't sit cleanly in FormData)
    const [slug, setSlug] = useState("");
    const [slugEdited, setSlugEdited] = useState(false);
    const [featuresShort, setFeaturesShort] = useState<string[]>([]);
    const [description, setDescription] = useState<string[]>([]);
    const [featuresFull, setFeaturesFull] = useState<string[]>([]);
    const [upcoming, setUpcoming] = useState<string[]>([]);
    const [previewSrc, setPreviewSrc] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!isModalOpen) return;
        const v = editingVisual;
        setSlug(v?.slug || "");
        setSlugEdited(!!v);
        setFeaturesShort(toStringArray(v?.features_short));
        setDescription(toStringArray(v?.description));
        setFeaturesFull(toStringArray(v?.features_full));
        setUpcoming(toStringArray(v?.upcoming));
        setPreviewSrc(v?.preview_src || "");
    }, [editingVisual, isModalOpen]);

    async function fetchData() {
        setIsLoading(true);
        const res = await adminCrud("custom_visuals", "read", undefined, undefined, {
            orderBy: { column: "display_order", ascending: true },
        });
        if (res.success) setVisuals(res.data || []);
        setIsLoading(false);
    }

    function openNew() {
        setEditingVisual(null);
        setIsModalOpen(true);
    }

    function openEdit(visual: any) {
        setEditingVisual(visual);
        setIsModalOpen(true);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        const name = (formData.get("name") as string)?.trim();
        if (!name) {
            alert("Name is required");
            setIsSubmitting(false);
            return;
        }

        const finalSlug = (slug || slugify(name)).trim();
        if (!finalSlug) {
            alert("Slug is required");
            setIsSubmitting(false);
            return;
        }

        const displayOrderRaw = formData.get("display_order") as string;
        const displayOrder = displayOrderRaw ? Number(displayOrderRaw) : 0;

        const appSourceUrl = (formData.get("app_source_url") as string)?.trim();
        const tutorialUrl = (formData.get("tutorial_url") as string)?.trim();

        const visualData: Record<string, unknown> = {
            slug: finalSlug,
            name,
            pitch: (formData.get("pitch") as string)?.trim() || null,
            features_short: featuresShort.map((f) => f.trim()).filter(Boolean),
            description: description.map((d) => d.trim()).filter(Boolean),
            features_full: featuresFull.map((f) => f.trim()).filter(Boolean),
            upcoming: upcoming.map((u) => u.trim()).filter(Boolean),
            // '#' is the placeholder sentinel — public page hides Download until set.
            app_source_url: appSourceUrl || "#",
            tutorial_url: tutorialUrl || null,
            preview_src: previewSrc || null,
            display_order: Number.isFinite(displayOrder) ? displayOrder : 0,
            published: formData.get("published") === "on",
        };

        const result = editingVisual
            ? await adminCrud("custom_visuals", "update", visualData, editingVisual.id)
            : await adminCrud("custom_visuals", "insert", visualData);

        if (result.success) {
            setIsModalOpen(false);
            setEditingVisual(null);
            fetchData();
        } else {
            alert(`Error: ${result.error}`);
        }
        setIsSubmitting(false);
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure? This removes the visual from the public catalogue.")) return;
        const result = await adminCrud("custom_visuals", "delete", undefined, id);
        if (result.success) fetchData();
        else alert(`Error: ${result.error}`);
    }

    const filteredVisuals = visuals.filter((v) => {
        const term = searchTerm.toLowerCase();
        return (
            v.name?.toLowerCase().includes(term) ||
            v.slug?.toLowerCase().includes(term) ||
            v.pitch?.toLowerCase().includes(term)
        );
    });

    return (
        <div className="space-y-8 font-body">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-text-heading font-heading mb-2">Custom Visuals</h1>
                    <p className="text-sm text-text-body/60">
                        Power BI custom visuals shown on <span className="font-mono text-xs">/cbt-custom-visuals</span>.
                        The catalogue number is derived automatically from display order. Leave the AppSource URL blank
                        (or as <span className="font-mono text-xs">#</span>) to hide the Download button until published.
                    </p>
                </div>
                <button onClick={openNew} className="btn-primary py-3 px-6 text-sm">
                    <Plus size={18} />
                    Add Visual
                </button>
            </div>

            <div className="bg-white rounded-[24px] border border-border/40 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border/40 bg-surface/30">
                    <div className="relative max-w-sm">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-body/30"
                            size={16}
                        />
                        <input
                            type="text"
                            placeholder="Search visuals..."
                            className="w-full pl-10 pr-4 py-2.5 border border-border/60 rounded-xl outline-none text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-surface/50 text-[10px] uppercase tracking-widest font-bold text-text-body/40 border-b border-border/20">
                                <th className="px-8 py-4">#</th>
                                <th className="px-8 py-4">Name</th>
                                <th className="px-8 py-4">AppSource</th>
                                <th className="px-8 py-4">Order</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20 text-sm">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="px-8 py-12 text-center text-text-body/40">
                                        Loading...
                                    </td>
                                </tr>
                            ) : filteredVisuals.length > 0 ? (
                                filteredVisuals.map((visual, idx) => (
                                    <tr key={visual.id} className="hover:bg-surface/30 group">
                                        <td className="px-8 py-4 font-mono text-text-body/50">
                                            {displayNum(idx)}
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="font-bold text-text-heading">{visual.name}</div>
                                            <div className="text-[11px] text-text-body/50 mt-0.5">{visual.slug}</div>
                                        </td>
                                        <td className="px-8 py-4">
                                            {visual.app_source_url && visual.app_source_url !== "#" ? (
                                                <span className="text-primary font-bold text-[10px] uppercase tracking-wider">
                                                    Live
                                                </span>
                                            ) : (
                                                <span className="text-amber-500 text-[10px] uppercase tracking-wider">
                                                    Placeholder
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-8 py-4 text-text-body/70">{visual.display_order ?? 0}</td>
                                        <td className="px-8 py-4">
                                            {visual.published ? (
                                                <span className="text-primary font-bold text-[10px] uppercase tracking-wider">
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="text-text-muted text-[10px] uppercase tracking-wider">
                                                    Draft
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="flex justify-end gap-1">
                                                <button
                                                    onClick={() => openEdit(visual)}
                                                    className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(visual.id)}
                                                    className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-8 py-12 text-center text-text-body/40">
                                        No custom visuals found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingVisual ? "Edit Custom Visual" : "Add New Custom Visual"}
                size="xl"
            >
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* ─── CORE ─── */}
                    <FormSection title="Core">
                        <Field label="Name" required span={2}>
                            <input
                                name="name"
                                defaultValue={editingVisual?.name}
                                required
                                className="form-input"
                                onChange={(e) => {
                                    if (!slugEdited) setSlug(slugify(e.currentTarget.value));
                                }}
                            />
                        </Field>
                        <Field label="Slug (URL)" required>
                            <input
                                name="slug"
                                value={slug}
                                onChange={(e) => {
                                    setSlug(e.currentTarget.value);
                                    setSlugEdited(true);
                                }}
                                required
                                className="form-input font-mono text-xs"
                                placeholder="auto-from-name"
                            />
                        </Field>
                        <Field label="Display Order">
                            <input
                                name="display_order"
                                type="number"
                                defaultValue={editingVisual?.display_order ?? 0}
                                className="form-input"
                            />
                            <p className="text-[10px] text-text-muted mt-1">
                                Lower shows first. The catalogue number (01, 02…) follows this order automatically.
                            </p>
                        </Field>
                        <Field label="Pitch (card subtitle)" span={3}>
                            <textarea
                                name="pitch"
                                defaultValue={editingVisual?.pitch || ""}
                                className="form-input min-h-[60px]"
                                placeholder="One-line hook shown on the catalogue card."
                            />
                        </Field>
                        <Field label="Published" span={3}>
                            <label className="flex items-center gap-3 py-2">
                                <input
                                    name="published"
                                    type="checkbox"
                                    defaultChecked={editingVisual?.published ?? true}
                                    className="accent-primary w-4 h-4"
                                />
                                <span className="text-sm">Visible on the public catalogue</span>
                            </label>
                        </Field>
                    </FormSection>

                    {/* ─── CARD BULLETS ─── */}
                    <FormSection
                        title="Card Bullets"
                        subtitle="Short feature points shown on the catalogue card (3 works best)."
                    >
                        <div className="col-span-3">
                            <Repeater
                                items={featuresShort}
                                onChange={setFeaturesShort}
                                placeholder="e.g. Independent left & right axes"
                                addLabel="Add bullet"
                            />
                        </div>
                    </FormSection>

                    {/* ─── DESCRIPTION ─── */}
                    <FormSection
                        title="Description"
                        subtitle="Detail-page body. Each entry is a paragraph."
                    >
                        <div className="col-span-3">
                            <Repeater
                                items={description}
                                onChange={setDescription}
                                placeholder="A paragraph of description…"
                                addLabel="Add paragraph"
                                multiline
                            />
                        </div>
                    </FormSection>

                    {/* ─── FULL FEATURES ─── */}
                    <FormSection
                        title="Full Feature List"
                        subtitle="The capability list on the detail page."
                    >
                        <div className="col-span-3">
                            <Repeater
                                items={featuresFull}
                                onChange={setFeaturesFull}
                                placeholder="e.g. Cross-filtering, drill-down, drill-through…"
                                addLabel="Add feature"
                                multiline
                            />
                        </div>
                    </FormSection>

                    {/* ─── UPCOMING ─── */}
                    <FormSection
                        title="Upcoming (optional)"
                        subtitle="Planned features. Leave empty to hide the section on the detail page."
                    >
                        <div className="col-span-3">
                            <Repeater
                                items={upcoming}
                                onChange={setUpcoming}
                                placeholder="e.g. Conditional Formatting"
                                addLabel="Add planned feature"
                            />
                        </div>
                    </FormSection>

                    {/* ─── LINKS ─── */}
                    <FormSection title="Links">
                        <Field label="AppSource URL" span={3}>
                            <input
                                name="app_source_url"
                                defaultValue={editingVisual?.app_source_url === "#" ? "" : editingVisual?.app_source_url || ""}
                                className="form-input"
                                placeholder="Leave blank until published — hides the Download button"
                            />
                        </Field>
                        <Field label="YouTube Tutorial URL" span={3}>
                            <input
                                name="tutorial_url"
                                defaultValue={editingVisual?.tutorial_url || ""}
                                className="form-input"
                                placeholder="Optional — hides the tutorial link if blank"
                            />
                        </Field>
                    </FormSection>

                    {/* ─── MEDIA ─── */}
                    <FormSection
                        title="Preview Image"
                        subtitle="16:9 screenshot. If blank, the card shows “Screenshot coming soon”."
                    >
                        <div className="col-span-3">
                            <ImageUpload
                                label="Preview"
                                value={previewSrc}
                                onChange={setPreviewSrc}
                                bucket="custom-visuals"
                            />
                        </div>
                    </FormSection>

                    <div className="sticky bottom-0 bg-white pt-4 pb-2 -mx-8 px-8 border-t border-border/40">
                        <button disabled={isSubmitting} className="btn-primary w-full py-3">
                            {isSubmitting
                                ? "Processing..."
                                : editingVisual
                                ? "Update Visual"
                                : "Create Visual"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

// --- Small presentational helpers --------------------------------------

function FormSection({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}) {
    return (
        <section className="space-y-3">
            <div>
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-primary">{title}</h4>
                {subtitle && <p className="text-[11px] text-text-muted mt-0.5">{subtitle}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{children}</div>
        </section>
    );
}

function Field({
    label,
    required,
    span = 1,
    children,
}: {
    label: string;
    required?: boolean;
    span?: 1 | 2 | 3;
    children: React.ReactNode;
}) {
    const colSpan =
        span === 3 ? "md:col-span-3" : span === 2 ? "md:col-span-2" : "md:col-span-1";
    return (
        <div className={`space-y-1 ${colSpan}`}>
            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">
                {label}
                {required && <span className="text-primary ml-1">*</span>}
            </label>
            {children}
        </div>
    );
}

function Repeater({
    items,
    onChange,
    placeholder,
    addLabel,
    multiline = false,
}: {
    items: string[];
    onChange: (next: string[]) => void;
    placeholder: string;
    addLabel: string;
    multiline?: boolean;
}) {
    return (
        <div className="space-y-2">
            {items.map((v, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                    {multiline ? (
                        <textarea
                            className="form-input min-h-[60px] flex-1"
                            placeholder={placeholder}
                            value={v}
                            onChange={(e) => {
                                const copy = [...items];
                                copy[idx] = e.currentTarget.value;
                                onChange(copy);
                            }}
                        />
                    ) : (
                        <input
                            className="form-input flex-1"
                            placeholder={placeholder}
                            value={v}
                            onChange={(e) => {
                                const copy = [...items];
                                copy[idx] = e.currentTarget.value;
                                onChange(copy);
                            }}
                        />
                    )}
                    <button
                        type="button"
                        onClick={() => onChange(items.filter((_, i) => i !== idx))}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg shrink-0"
                    >
                        <X size={14} />
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() => onChange([...items, ""])}
                className="btn-outline text-xs px-4 py-2"
            >
                <Plus size={14} /> {addLabel}
            </button>
        </div>
    );
}
