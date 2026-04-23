"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Edit2, Trash2, Globe, Loader2, X } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { adminCrud } from "@/lib/actions/admin-actions";

type HelpItem = { num: string; title: string; body: string };
type OutcomeItem = { number: string; label: string; note: string };

type Industry = {
    id: string;
    slug: string;
    label: string;
    tagline: string | null;
    hero_headline: string;
    hero_italic: string | null;
    hero_sub: string | null;
    context_title: string | null;
    context_italic: string | null;
    context_body: string | null;
    where_we_help: HelpItem[];
    outcome_highlights: OutcomeItem[];
    display_order: number;
    is_active: boolean;
};

export default function AdminIndustries() {
    const [industries, setIndustries] = useState<Industry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState<Industry | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [help, setHelp] = useState<HelpItem[]>([]);
    const [outcomes, setOutcomes] = useState<OutcomeItem[]>([]);

    useEffect(() => {
        fetchIndustries();
    }, []);

    useEffect(() => {
        if (editing) {
            setHelp(editing.where_we_help || []);
            setOutcomes(editing.outcome_highlights || []);
        } else {
            setHelp([]);
            setOutcomes([]);
        }
    }, [editing, isModalOpen]);

    async function fetchIndustries() {
        setIsLoading(true);
        const result = await adminCrud("industries", "read", undefined, undefined, {
            orderBy: { column: "display_order", ascending: true },
        });
        if (result.success) {
            setIndustries((result.data || []) as Industry[]);
        } else {
            console.error("Error fetching industries:", result.error);
            setIndustries([]);
        }
        setIsLoading(false);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        const data = {
            slug: (formData.get("slug") as string).trim(),
            label: formData.get("label") as string,
            tagline: (formData.get("tagline") as string) || null,
            hero_headline: formData.get("hero_headline") as string,
            hero_italic: (formData.get("hero_italic") as string) || null,
            hero_sub: (formData.get("hero_sub") as string) || null,
            context_title: (formData.get("context_title") as string) || null,
            context_italic: (formData.get("context_italic") as string) || null,
            context_body: (formData.get("context_body") as string) || null,
            where_we_help: help.filter(h => h.title.trim() || h.body.trim()),
            outcome_highlights: outcomes.filter(o => o.number.trim() || o.label.trim()),
            display_order: parseInt(formData.get("display_order") as string) || 0,
            is_active: formData.get("is_active") === "on",
        };

        const result = editing
            ? await adminCrud("industries", "update", data, editing.id)
            : await adminCrud("industries", "insert", data);

        if (result.success) {
            setIsModalOpen(false);
            setEditing(null);
            fetchIndustries();
        } else {
            alert(`Error: ${result.error}`);
        }
        setIsSubmitting(false);
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this industry?")) return;
        const result = await adminCrud("industries", "delete", null, id);
        if (result.success) fetchIndustries();
        else alert(`Error: ${result.error}`);
    }

    const filtered = industries.filter(i =>
        i.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 font-body">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-text-heading font-heading mb-2">Industries</h1>
                    <p className="text-sm text-text-body/60">Manage the per-industry landing pages at /industries/[slug].</p>
                </div>
                <button
                    onClick={() => { setEditing(null); setIsModalOpen(true); }}
                    className="btn-primary py-3 px-6 text-sm"
                >
                    <Plus size={18} />
                    Add Industry
                </button>
            </div>

            <div className="bg-white rounded-[24px] border border-border/40 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border/40 bg-surface/30">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-body/30" size={16} />
                        <input
                            type="text"
                            placeholder="Search industries..."
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
                                <th className="px-8 py-4">Slug</th>
                                <th className="px-8 py-4">Label</th>
                                <th className="px-8 py-4">Tagline</th>
                                <th className="px-8 py-4">Order</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20 text-sm">
                            {isLoading ? (
                                <tr><td colSpan={6} className="px-8 py-12 text-center text-text-body/40"><Loader2 className="animate-spin mx-auto" size={20} /></td></tr>
                            ) : filtered.length > 0 ? (
                                filtered.map((i) => (
                                    <tr key={i.id} className="hover:bg-surface/30 group">
                                        <td className="px-8 py-4 font-mono text-xs text-text-muted">{i.slug}</td>
                                        <td className="px-8 py-4 font-bold text-text-heading">{i.label}</td>
                                        <td className="px-8 py-4 text-text-body/70 max-w-xs truncate">{i.tagline || "—"}</td>
                                        <td className="px-8 py-4 text-text-body/50 text-xs">{i.display_order}</td>
                                        <td className="px-8 py-4">
                                            {i.is_active ? (
                                                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Active</span>
                                            ) : (
                                                <span className="text-text-muted text-[10px] uppercase">Hidden</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="flex justify-end gap-1">
                                                <button onClick={() => { setEditing(i); setIsModalOpen(true); }} className="p-2 hover:bg-primary/10 text-primary rounded-lg"><Edit2 size={14} /></button>
                                                <button onClick={() => handleDelete(i.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg"><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={6} className="px-8 py-12 text-center text-text-body/40">
                                    <Globe className="mx-auto mb-2 text-text-body/30" size={28} />
                                    No industries found.
                                </td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editing ? `Edit Industry · ${editing.label}` : "Add New Industry"}
            >
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1 col-span-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Slug</label>
                            <input name="slug" defaultValue={editing?.slug} required className="form-input" placeholder="e.g. retail" />
                        </div>
                        <div className="space-y-1 col-span-2">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Label (display name)</label>
                            <input name="label" defaultValue={editing?.label} required className="form-input" placeholder="e.g. Retail" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Tagline</label>
                        <input name="tagline" defaultValue={editing?.tagline || ""} className="form-input" placeholder="Short one-liner next to the label." />
                    </div>

                    <div className="pt-4 mt-2 border-t border-border/40">
                        <p className="text-[10px] uppercase tracking-widest text-text-muted/60 font-bold mb-3">Hero</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Headline lead</label>
                                <input name="hero_headline" defaultValue={editing?.hero_headline} required className="form-input" placeholder="Data where the transaction" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Headline italic</label>
                                <input name="hero_italic" defaultValue={editing?.hero_italic || ""} className="form-input" placeholder="happens." />
                            </div>
                        </div>
                        <div className="space-y-1 mt-3">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Hero subcopy</label>
                            <textarea name="hero_sub" defaultValue={editing?.hero_sub || ""} className="form-input min-h-[80px]" />
                        </div>
                    </div>

                    <div className="pt-4 mt-2 border-t border-border/40">
                        <p className="text-[10px] uppercase tracking-widest text-text-muted/60 font-bold mb-3">Context narrative</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Title lead</label>
                                <input name="context_title" defaultValue={editing?.context_title || ""} className="form-input" placeholder="The shelf is the" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Title italic</label>
                                <input name="context_italic" defaultValue={editing?.context_italic || ""} className="form-input" placeholder="feedback loop." />
                            </div>
                        </div>
                        <div className="space-y-1 mt-3">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Context body</label>
                            <textarea name="context_body" defaultValue={editing?.context_body || ""} className="form-input min-h-[100px]" />
                        </div>
                    </div>

                    <div className="pt-4 mt-2 border-t border-border/40">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-[10px] uppercase tracking-widest text-text-muted/60 font-bold">Where we help ({help.length})</p>
                            <button type="button" className="text-xs text-primary font-bold uppercase tracking-wide" onClick={() => setHelp([...help, { num: String(help.length + 1).padStart(2, "0"), title: "", body: "" }])}>
                                + Add item
                            </button>
                        </div>
                        <div className="space-y-3">
                            {help.map((h, idx) => (
                                <div key={idx} className="grid grid-cols-[60px_1fr_2fr_28px] gap-3 items-start bg-surface/40 p-3 rounded-lg">
                                    <input
                                        className="form-input py-2 text-xs"
                                        value={h.num}
                                        onChange={(e) => setHelp(help.map((x, i) => i === idx ? { ...x, num: e.target.value } : x))}
                                        placeholder="01"
                                    />
                                    <input
                                        className="form-input py-2 text-xs"
                                        value={h.title}
                                        onChange={(e) => setHelp(help.map((x, i) => i === idx ? { ...x, title: e.target.value } : x))}
                                        placeholder="Title"
                                    />
                                    <textarea
                                        className="form-input py-2 text-xs min-h-[44px]"
                                        value={h.body}
                                        onChange={(e) => setHelp(help.map((x, i) => i === idx ? { ...x, body: e.target.value } : x))}
                                        placeholder="Body"
                                    />
                                    <button type="button" className="p-1.5 hover:bg-red-50 text-red-500 rounded" onClick={() => setHelp(help.filter((_, i) => i !== idx))}>
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 mt-2 border-t border-border/40">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-[10px] uppercase tracking-widest text-text-muted/60 font-bold">Outcome highlights ({outcomes.length})</p>
                            <button type="button" className="text-xs text-primary font-bold uppercase tracking-wide" onClick={() => setOutcomes([...outcomes, { number: "", label: "", note: "" }])}>
                                + Add stat
                            </button>
                        </div>
                        <div className="space-y-3">
                            {outcomes.map((o, idx) => (
                                <div key={idx} className="grid grid-cols-[1fr_1fr_2fr_28px] gap-3 items-start bg-surface/40 p-3 rounded-lg">
                                    <input
                                        className="form-input py-2 text-xs"
                                        value={o.number}
                                        onChange={(e) => setOutcomes(outcomes.map((x, i) => i === idx ? { ...x, number: e.target.value } : x))}
                                        placeholder="+32%"
                                    />
                                    <input
                                        className="form-input py-2 text-xs"
                                        value={o.label}
                                        onChange={(e) => setOutcomes(outcomes.map((x, i) => i === idx ? { ...x, label: e.target.value } : x))}
                                        placeholder="margin"
                                    />
                                    <input
                                        className="form-input py-2 text-xs"
                                        value={o.note}
                                        onChange={(e) => setOutcomes(outcomes.map((x, i) => i === idx ? { ...x, note: e.target.value } : x))}
                                        placeholder="pilot category uplift"
                                    />
                                    <button type="button" className="p-1.5 hover:bg-red-50 text-red-500 rounded" onClick={() => setOutcomes(outcomes.filter((_, i) => i !== idx))}>
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-8 pt-4 border-t border-border/40">
                        <div className="flex items-center gap-2">
                            <input name="is_active" type="checkbox" defaultChecked={editing ? editing.is_active : true} id="ind-active" className="accent-primary" />
                            <label htmlFor="ind-active" className="text-xs font-bold uppercase tracking-wide">Active (show on /industries/…)</label>
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                            <label className="text-[10px] font-bold uppercase">Order</label>
                            <input name="display_order" type="number" defaultValue={editing?.display_order || 0} className="w-20 form-input py-1" />
                        </div>
                    </div>

                    <button disabled={isSubmitting} className="btn-primary w-full py-3 mt-2">
                        {isSubmitting ? "Processing..." : editing ? "Update Industry" : "Create Industry"}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
