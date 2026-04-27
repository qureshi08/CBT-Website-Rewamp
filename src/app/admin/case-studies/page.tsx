"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Edit2, Trash2, X } from "lucide-react";
import Modal from "@/components/ui/Modal";
import ImageUpload from "@/components/ui/ImageUpload";
import { adminCrud, ensureIndustry } from "@/lib/actions/admin-actions";

type SecondaryMetric = { value: string; label: string };

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

function toMetrics(value: unknown): SecondaryMetric[] {
    if (!Array.isArray(value)) return [];
    return value
        .filter((v): v is SecondaryMetric =>
            !!v &&
            typeof v === "object" &&
            typeof (v as any).value === "string" &&
            typeof (v as any).label === "string",
        )
        .slice(0, 3);
}

// --- Page ---------------------------------------------------------------

export default function AdminCaseStudies() {
    const [caseStudies, setCaseStudies] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);
    const [industries, setIndustries] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudy, setEditingStudy] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state (fields that either can't live in FormData easily or need live UI)
    const [slug, setSlug] = useState("");
    const [slugEdited, setSlugEdited] = useState(false);
    const [industryInput, setIndustryInput] = useState("");
    const [deliverables, setDeliverables] = useState<string[]>([]);
    const [stack, setStack] = useState<string[]>([]);
    const [secondaryMetrics, setSecondaryMetrics] = useState<SecondaryMetric[]>([]);
    const [featuredImageUrl, setFeaturedImageUrl] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [architectureDiagramUrl, setArchitectureDiagramUrl] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!isModalOpen) return;
        const s = editingStudy;
        setSlug(s?.slug || "");
        setSlugEdited(!!s);
        setIndustryInput(industries.find((i) => i.slug === s?.industry_slug)?.label || "");
        setDeliverables(toStringArray(s?.deliverables));
        setStack(toStringArray(s?.stack));
        setSecondaryMetrics(toMetrics(s?.secondary_metrics));
        setFeaturedImageUrl(s?.featured_image_url || "");
        setThumbnailUrl(s?.thumbnail_url || "");
        setArchitectureDiagramUrl(s?.architecture_diagram_url || "");
    }, [editingStudy, isModalOpen, industries]);

    async function fetchData() {
        setIsLoading(true);
        const [studiesRes, clientsRes, industriesRes] = await Promise.all([
            adminCrud("case_studies", "read", undefined, undefined, {
                orderBy: { column: "display_order", ascending: true },
            }),
            adminCrud("clients", "read", undefined, undefined, {
                orderBy: { column: "name", ascending: true },
            }),
            adminCrud("industries", "read", undefined, undefined, {
                orderBy: { column: "display_order", ascending: true },
            }),
        ]);

        if (studiesRes.success) setCaseStudies(studiesRes.data || []);
        if (clientsRes.success) setClients(clientsRes.data || []);
        if (industriesRes.success) setIndustries(industriesRes.data || []);
        setIsLoading(false);
    }

    function openNew() {
        setEditingStudy(null);
        setIsModalOpen(true);
    }

    function openEdit(study: any) {
        setEditingStudy(study);
        setIsModalOpen(true);
    }

    // Resolve the typed industry label to a slug — existing match or auto-create.
    async function resolveIndustrySlug(label: string): Promise<string | null> {
        const trimmed = label.trim();
        if (!trimmed) return null;
        const match = industries.find(
            (i) =>
                i.label?.toLowerCase() === trimmed.toLowerCase() ||
                i.slug?.toLowerCase() === trimmed.toLowerCase(),
        );
        if (match) return match.slug;
        const res = await ensureIndustry(trimmed);
        if (!res.success) {
            alert(`Industry error: ${res.error}`);
            return null;
        }
        return res.slug;
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        const title = (formData.get("title") as string)?.trim();
        if (!title) {
            alert("Title is required");
            setIsSubmitting(false);
            return;
        }

        const finalSlug = (slug || slugify(title)).trim();
        if (!finalSlug) {
            alert("Slug is required");
            setIsSubmitting(false);
            return;
        }

        const industrySlug = await resolveIndustrySlug(industryInput);
        if (!industrySlug) {
            setIsSubmitting(false);
            return;
        }

        const clientId = formData.get("client_id") as string;
        const displayOrderRaw = formData.get("display_order") as string;
        const displayOrder = displayOrderRaw ? Number(displayOrderRaw) : 0;

        const cleanedMetrics = secondaryMetrics
            .map((m) => ({ value: m.value.trim(), label: m.label.trim() }))
            .filter((m) => m.value || m.label)
            .slice(0, 3);

        const studyData: Record<string, unknown> = {
            title,
            slug: finalSlug,
            published: formData.get("published") === "on",
            display_order: Number.isFinite(displayOrder) ? displayOrder : 0,

            client_id: clientId || null,
            client_descriptor: (formData.get("client_descriptor") as string) || null,
            industry_slug: industrySlug,
            service_area: (formData.get("service_area") as string) || null,
            timeline: (formData.get("timeline") as string) || null,

            summary: (formData.get("summary") as string) || null,
            challenge: (formData.get("challenge") as string) || null,
            approach: (formData.get("approach") as string) || null,
            impact: (formData.get("impact") as string) || null,
            deliverables: deliverables.map((d) => d.trim()).filter(Boolean),

            outcome_value: (formData.get("outcome_value") as string) || null,
            outcome_label: (formData.get("outcome_label") as string) || null,
            secondary_metrics: cleanedMetrics,

            stack: stack.map((s) => s.trim()).filter(Boolean),
            tags:
                (formData.get("tags") as string)
                    ?.split(",")
                    .map((t) => t.trim())
                    .filter(Boolean) || [],

            featured_image_url: featuredImageUrl || null,
            thumbnail_url: thumbnailUrl || null,
            architecture_diagram_url: architectureDiagramUrl || null,
            architecture_caption: (formData.get("architecture_caption") as string) || null,

            quote_text: (formData.get("quote_text") as string) || null,
            quote_author: (formData.get("quote_author") as string) || null,
            quote_role: (formData.get("quote_role") as string) || null,
        };

        const result = editingStudy
            ? await adminCrud("case_studies", "update", studyData, editingStudy.id)
            : await adminCrud("case_studies", "insert", studyData);

        if (result.success) {
            setIsModalOpen(false);
            setEditingStudy(null);
            fetchData();
        } else {
            alert(`Error: ${result.error}`);
        }
        setIsSubmitting(false);
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure?")) return;
        const result = await adminCrud("case_studies", "delete", undefined, id);
        if (result.success) fetchData();
        else alert(`Error: ${result.error}`);
    }

    const filteredStudies = caseStudies.filter((s) => {
        const term = searchTerm.toLowerCase();
        return (
            s.title?.toLowerCase().includes(term) ||
            s.service_area?.toLowerCase().includes(term) ||
            s.industry_slug?.toLowerCase().includes(term)
        );
    });

    return (
        <div className="space-y-8 font-body">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-text-heading font-heading mb-2">Case Studies</h1>
                    <p className="text-sm text-text-body/60">
                        Showcase shipped outcomes. Fields beyond title / slug / industry are optional — the public
                        page hides any section you leave blank.
                    </p>
                </div>
                <button onClick={openNew} className="btn-primary py-3 px-6 text-sm">
                    <Plus size={18} />
                    Add Case Study
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
                            placeholder="Search case studies..."
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
                                <th className="px-8 py-4">Title</th>
                                <th className="px-8 py-4">Industry</th>
                                <th className="px-8 py-4">Service Area</th>
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
                            ) : filteredStudies.length > 0 ? (
                                filteredStudies.map((study) => {
                                    const indLabel =
                                        industries.find((i) => i.slug === study.industry_slug)?.label ||
                                        study.industry_slug ||
                                        "—";
                                    return (
                                        <tr key={study.id} className="hover:bg-surface/30 group">
                                            <td className="px-8 py-4">
                                                <div className="font-bold text-text-heading">{study.title}</div>
                                                <div className="text-[11px] text-text-body/50 mt-0.5">{study.slug}</div>
                                            </td>
                                            <td className="px-8 py-4 text-text-body/70">{indLabel}</td>
                                            <td className="px-8 py-4 text-text-body/70">{study.service_area || "—"}</td>
                                            <td className="px-8 py-4 text-text-body/70">{study.display_order ?? 0}</td>
                                            <td className="px-8 py-4">
                                                {study.published ? (
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
                                                        onClick={() => openEdit(study)}
                                                        className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"
                                                    >
                                                        <Edit2 size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(study.id)}
                                                        className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-8 py-12 text-center text-text-body/40">
                                        No case studies found.
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
                title={editingStudy ? "Edit Case Study" : "Add New Case Study"}
                size="xl"
            >
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* ─── CORE ─── */}
                    <FormSection title="Core">
                        <Field label="Title" required span={2}>
                            <input
                                name="title"
                                defaultValue={editingStudy?.title}
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
                                placeholder="auto-from-title"
                            />
                        </Field>
                        <Field label="Display Order">
                            <input
                                name="display_order"
                                type="number"
                                defaultValue={editingStudy?.display_order ?? 0}
                                className="form-input"
                            />
                        </Field>
                        <Field label="Industry" required span={2}>
                            <input
                                list="industries-list"
                                value={industryInput}
                                onChange={(e) => setIndustryInput(e.currentTarget.value)}
                                required
                                className="form-input"
                                placeholder="Pick existing or type new (e.g. Retail Franchising)"
                            />
                            <datalist id="industries-list">
                                {industries.map((i) => (
                                    <option key={i.slug} value={i.label} />
                                ))}
                            </datalist>
                            <p className="text-[10px] text-text-muted mt-1">
                                Typing a new label auto-creates a skeleton industry page — edit later under Industries.
                            </p>
                        </Field>
                        <Field label="Service Area">
                            <input
                                name="service_area"
                                defaultValue={editingStudy?.service_area || ""}
                                className="form-input"
                                placeholder="e.g. Data Foundations"
                            />
                        </Field>
                        <Field label="Timeline">
                            <input
                                name="timeline"
                                defaultValue={editingStudy?.timeline || ""}
                                className="form-input"
                                placeholder="Dec 2023 — ongoing"
                            />
                        </Field>
                        <Field label="Client (backend only)">
                            <select
                                name="client_id"
                                defaultValue={editingStudy?.client_id || ""}
                                className="form-input"
                            >
                                <option value="">— none —</option>
                                {clients.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            <p className="text-[10px] text-text-muted mt-1">
                                Never rendered publicly — attribution only.
                            </p>
                        </Field>
                        <Field label="Client Descriptor (public)" span={2}>
                            <input
                                name="client_descriptor"
                                defaultValue={editingStudy?.client_descriptor || ""}
                                className="form-input"
                                placeholder="e.g. International multi-brand retail franchising group"
                            />
                        </Field>
                        <Field label="Published" span={3}>
                            <label className="flex items-center gap-3 py-2">
                                <input
                                    name="published"
                                    type="checkbox"
                                    defaultChecked={editingStudy?.published || false}
                                    className="accent-primary w-4 h-4"
                                />
                                <span className="text-sm">Visible on the public site</span>
                            </label>
                        </Field>
                    </FormSection>

                    {/* ─── HERO ─── */}
                    <FormSection title="Hero Framing">
                        <Field label="Summary" span={3}>
                            <textarea
                                name="summary"
                                defaultValue={editingStudy?.summary || ""}
                                className="form-input min-h-[80px]"
                                placeholder="1–3 sentence elevator pitch for the case."
                            />
                        </Field>
                        <Field label="Outcome Value (headline number)">
                            <input
                                name="outcome_value"
                                defaultValue={editingStudy?.outcome_value || ""}
                                className="form-input"
                                placeholder="e.g. 11  or  40×  or  −18%"
                            />
                        </Field>
                        <Field label="Outcome Label" span={2}>
                            <input
                                name="outcome_label"
                                defaultValue={editingStudy?.outcome_label || ""}
                                className="form-input"
                                placeholder="e.g. brands, one platform"
                            />
                        </Field>
                    </FormSection>

                    {/* ─── BODY ─── */}
                    <FormSection title="Body">
                        <Field label="Challenge" span={3}>
                            <textarea
                                name="challenge"
                                defaultValue={editingStudy?.challenge || ""}
                                className="form-input min-h-[120px]"
                            />
                        </Field>
                        <Field label="Approach" span={3}>
                            <textarea
                                name="approach"
                                defaultValue={editingStudy?.approach || ""}
                                className="form-input min-h-[120px]"
                            />
                        </Field>
                        <Field label="Impact" span={3}>
                            <textarea
                                name="impact"
                                defaultValue={editingStudy?.impact || ""}
                                className="form-input min-h-[100px]"
                            />
                        </Field>
                    </FormSection>

                    {/* ─── DELIVERABLES ─── */}
                    <FormSection title="Deliverables">
                        <div className="col-span-3">
                            <Repeater
                                items={deliverables}
                                onChange={setDeliverables}
                                placeholder="What we shipped (one bullet)"
                                addLabel="Add deliverable"
                                multiline
                            />
                        </div>
                    </FormSection>

                    {/* ─── TECH STACK ─── */}
                    <FormSection title="Tech Stack">
                        <div className="col-span-3">
                            <Repeater
                                items={stack}
                                onChange={setStack}
                                placeholder="e.g. Azure Synapse"
                                addLabel="Add tool"
                            />
                        </div>
                    </FormSection>

                    {/* ─── SECONDARY METRICS ─── */}
                    <FormSection
                        title="Secondary Metrics"
                        subtitle="Up to 3 stat pills shown in the impact band."
                    >
                        <div className="col-span-3 space-y-3">
                            {secondaryMetrics.map((m, idx) => (
                                <div key={idx} className="grid grid-cols-[140px_1fr_auto] gap-2 items-center">
                                    <input
                                        className="form-input"
                                        placeholder="Value (e.g. 21)"
                                        value={m.value}
                                        onChange={(e) => {
                                            const copy = [...secondaryMetrics];
                                            copy[idx] = { ...m, value: e.currentTarget.value };
                                            setSecondaryMetrics(copy);
                                        }}
                                    />
                                    <input
                                        className="form-input"
                                        placeholder="Label (e.g. source systems consolidated)"
                                        value={m.label}
                                        onChange={(e) => {
                                            const copy = [...secondaryMetrics];
                                            copy[idx] = { ...m, label: e.currentTarget.value };
                                            setSecondaryMetrics(copy);
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSecondaryMetrics(secondaryMetrics.filter((_, i) => i !== idx))
                                        }
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                            {secondaryMetrics.length < 3 && (
                                <button
                                    type="button"
                                    onClick={() => setSecondaryMetrics([...secondaryMetrics, { value: "", label: "" }])}
                                    className="btn-outline text-xs px-4 py-2"
                                >
                                    <Plus size={14} /> Add metric ({secondaryMetrics.length}/3)
                                </button>
                            )}
                        </div>
                    </FormSection>

                    {/* ─── TAGS ─── */}
                    <FormSection title="Tags">
                        <Field label="Tags (comma separated)" span={3}>
                            <input
                                name="tags"
                                defaultValue={editingStudy?.tags?.join(", ") || ""}
                                className="form-input"
                                placeholder="Azure Synapse, Microsoft Fabric"
                            />
                        </Field>
                    </FormSection>

                    {/* ─── MEDIA ─── */}
                    <FormSection title="Media">
                        <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <ImageUpload
                                label="Featured Image"
                                value={featuredImageUrl}
                                onChange={setFeaturedImageUrl}
                                bucket="case-studies"
                            />
                            <ImageUpload
                                label="Thumbnail (card)"
                                value={thumbnailUrl}
                                onChange={setThumbnailUrl}
                                bucket="case-studies"
                            />
                            <ImageUpload
                                label="Architecture Diagram"
                                value={architectureDiagramUrl}
                                onChange={setArchitectureDiagramUrl}
                                bucket="case-studies"
                            />
                        </div>
                        <Field label="Architecture Caption" span={3}>
                            <input
                                name="architecture_caption"
                                defaultValue={editingStudy?.architecture_caption || ""}
                                className="form-input"
                                placeholder="Short caption under the diagram"
                            />
                        </Field>
                    </FormSection>

                    {/* ─── QUOTE ─── */}
                    <FormSection title="Pull Quote (optional)">
                        <Field label="Quote" span={3}>
                            <textarea
                                name="quote_text"
                                defaultValue={editingStudy?.quote_text || ""}
                                className="form-input min-h-[80px]"
                            />
                        </Field>
                        <Field label="Author">
                            <input
                                name="quote_author"
                                defaultValue={editingStudy?.quote_author || ""}
                                className="form-input"
                                placeholder="First name only if client is anonymised"
                            />
                        </Field>
                        <Field label="Role" span={2}>
                            <input
                                name="quote_role"
                                defaultValue={editingStudy?.quote_role || ""}
                                className="form-input"
                                placeholder="e.g. Head of Analytics"
                            />
                        </Field>
                    </FormSection>

                    <div className="sticky bottom-0 bg-white pt-4 pb-2 -mx-8 px-8 border-t border-border/40">
                        <button disabled={isSubmitting} className="btn-primary w-full py-3">
                            {isSubmitting
                                ? "Processing..."
                                : editingStudy
                                ? "Update Case Study"
                                : "Create Case Study"}
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
