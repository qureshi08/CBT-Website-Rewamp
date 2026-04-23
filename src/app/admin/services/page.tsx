"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Edit2, Trash2, Layers, Loader2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { adminCrud } from "@/lib/actions/admin-actions";

type Service = {
    id: string;
    slug: string;
    name: string;
    section: "strategy" | "foundations" | "intelligence";
    num: string;
    description: string | null;
    tools: string[];
    icon: string | null;
    emerging: boolean;
    display_order: number;
    is_active: boolean;
};

const SECTIONS: Array<Service["section"]> = ["strategy", "foundations", "intelligence"];

const ICON_OPTIONS = [
    "target", "server", "shield", "pieChart", "brain", "cpu",
    "chart", "users", "graduation", "globe", "database", "award",
    "zap", "building", "handshake", "mail", "search", "bookOpen",
    "layersData", "trendUp", "mapPin", "phone",
];

function toSlug(name: string): string {
    return name.toLowerCase().trim().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function AdminServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState<Service | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    async function fetchServices() {
        setIsLoading(true);
        const result = await adminCrud("services", "read", undefined, undefined, {
            orderBy: { column: "display_order", ascending: true },
        });
        if (result.success) {
            setServices((result.data || []) as Service[]);
        } else {
            console.error("Error fetching services:", result.error);
            setServices([]);
        }
        setIsLoading(false);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        const name = formData.get("name") as string;
        const toolsRaw = (formData.get("tools") as string).trim();

        const data = {
            name,
            slug: editing?.slug || toSlug(name),
            section: formData.get("section") as Service["section"],
            num: formData.get("num") as string,
            description: (formData.get("description") as string) || null,
            tools: toolsRaw ? toolsRaw.split(",").map(t => t.trim()).filter(Boolean) : [],
            icon: (formData.get("icon") as string) || null,
            emerging: formData.get("emerging") === "on",
            display_order: parseInt(formData.get("display_order") as string) || 0,
            is_active: formData.get("is_active") === "on",
        };

        const result = editing
            ? await adminCrud("services", "update", data, editing.id)
            : await adminCrud("services", "insert", data);

        if (result.success) {
            setIsModalOpen(false);
            setEditing(null);
            fetchServices();
        } else {
            alert(`Error: ${result.error}`);
        }
        setIsSubmitting(false);
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this service?")) return;
        const result = await adminCrud("services", "delete", null, id);
        if (result.success) fetchServices();
        else alert(`Error: ${result.error}`);
    }

    const filtered = services.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.num.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 font-body">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-text-heading font-heading mb-2">Services</h1>
                    <p className="text-sm text-text-body/60">Manage the capabilities rendered on /services.</p>
                </div>
                <button
                    onClick={() => { setEditing(null); setIsModalOpen(true); }}
                    className="btn-primary py-3 px-6 text-sm"
                >
                    <Plus size={18} />
                    Add Service
                </button>
            </div>

            <div className="bg-white rounded-[24px] border border-border/40 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border/40 bg-surface/30">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-body/30" size={16} />
                        <input
                            type="text"
                            placeholder="Search services..."
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
                                <th className="px-8 py-4">Section</th>
                                <th className="px-8 py-4">Tools</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20 text-sm">
                            {isLoading ? (
                                <tr><td colSpan={6} className="px-8 py-12 text-center text-text-body/40"><Loader2 className="animate-spin mx-auto" size={20} /></td></tr>
                            ) : filtered.length > 0 ? (
                                filtered.map((s) => (
                                    <tr key={s.id} className="hover:bg-surface/30 group">
                                        <td className="px-8 py-4 font-mono text-xs text-text-muted">{s.num}</td>
                                        <td className="px-8 py-4 font-bold text-text-heading">
                                            {s.name}
                                            {s.emerging && <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">Emerging</span>}
                                        </td>
                                        <td className="px-8 py-4 text-text-body/70 capitalize">{s.section}</td>
                                        <td className="px-8 py-4 text-text-body/50 text-xs">{s.tools?.length || 0}</td>
                                        <td className="px-8 py-4">
                                            {s.is_active ? (
                                                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Active</span>
                                            ) : (
                                                <span className="text-text-muted text-[10px] uppercase">Hidden</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="flex justify-end gap-1">
                                                <button onClick={() => { setEditing(s); setIsModalOpen(true); }} className="p-2 hover:bg-primary/10 text-primary rounded-lg"><Edit2 size={14} /></button>
                                                <button onClick={() => handleDelete(s.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg"><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={6} className="px-8 py-12 text-center text-text-body/40">
                                    <Layers className="mx-auto mb-2 text-text-body/30" size={28} />
                                    No services found.
                                </td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editing ? "Edit Service" : "Add New Service"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1 col-span-2">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Name</label>
                            <input name="name" defaultValue={editing?.name} required className="form-input" placeholder="e.g. Data Engineering & Platforms" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Section</label>
                            <select name="section" defaultValue={editing?.section || ""} required className="form-input">
                                <option value="" disabled>Select section…</option>
                                {SECTIONS.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Number</label>
                            <input name="num" defaultValue={editing?.num} required className="form-input" placeholder="e.g. 02" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Description</label>
                        <textarea name="description" defaultValue={editing?.description || ""} className="form-input min-h-[90px]" placeholder="One or two sentences describing the capability." />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Tools (comma separated)</label>
                        <input name="tools" defaultValue={editing?.tools?.join(", ") || ""} className="form-input" placeholder="Fabric, Snowflake, Power BI" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Icon</label>
                            <select name="icon" defaultValue={editing?.icon || ""} className="form-input">
                                <option value="">(none)</option>
                                {ICON_OPTIONS.map(i => (
                                    <option key={i} value={i}>{i}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Display Order</label>
                            <input name="display_order" type="number" defaultValue={editing?.display_order || 0} className="form-input" />
                        </div>
                    </div>

                    <div className="flex items-center gap-8 pt-4 border-t border-border/40">
                        <div className="flex items-center gap-2">
                            <input name="emerging" type="checkbox" defaultChecked={editing?.emerging} id="svc-emerging" className="accent-primary" />
                            <label htmlFor="svc-emerging" className="text-xs font-bold uppercase tracking-wide">Emerging</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input name="is_active" type="checkbox" defaultChecked={editing ? editing.is_active : true} id="svc-active" className="accent-primary" />
                            <label htmlFor="svc-active" className="text-xs font-bold uppercase tracking-wide">Active (show on /services)</label>
                        </div>
                    </div>

                    <button disabled={isSubmitting} className="btn-primary w-full py-3 mt-4">
                        {isSubmitting ? "Processing..." : editing ? "Update Service" : "Create Service"}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
