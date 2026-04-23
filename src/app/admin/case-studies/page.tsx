"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Edit2, Trash2, FileText, Loader2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { adminCrud } from "@/lib/actions/admin-actions";
import ImageUpload from "@/components/ui/ImageUpload";

export default function AdminCaseStudies() {
    const [caseStudies, setCaseStudies] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);
    const [industries, setIndustries] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudy, setEditingStudy] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (editingStudy) {
            setImageUrl(editingStudy.thumbnail_url || editingStudy.image_url || "");
        } else {
            setImageUrl("");
        }
    }, [editingStudy, isModalOpen]);

    async function fetchData() {
        setIsLoading(true);
        const [studiesRes, clientsRes, industriesRes] = await Promise.all([
            adminCrud("case_studies", "read", null, undefined, { orderBy: { column: "created_at", ascending: false } }),
            adminCrud("clients", "read", null, undefined, { orderBy: { column: "name", ascending: true } }),
            adminCrud("industries", "read", null, undefined, { orderBy: { column: "display_order", ascending: true } })
        ]);

        if (studiesRes.success) setCaseStudies(studiesRes.data || []);
        if (clientsRes.success) setClients(clientsRes.data || []);
        if (industriesRes.success) setIndustries(industriesRes.data || []);
        setIsLoading(false);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        const studyData: any = {
            title: formData.get("title") as string,
            slug: (formData.get("title") as string).toLowerCase().replace(/\s+/g, '-'),
            client_id: formData.get("client_id") as string,
            service_area: formData.get("service_area") as string,
            industry_slug: (formData.get("industry_slug") as string) || null,
            summary: formData.get("summary") as string,
            content: formData.get("content") as string,
            published: formData.get("published") === "on",
            tags: (formData.get("tags") as string)?.split(",").map(t => t.trim()).filter(Boolean) || [],
            thumbnail_url: imageUrl,
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
        const result = await adminCrud("case_studies", "delete", null, id);
        if (result.success) fetchData();
        else alert(`Error: ${result.error}`);
    }

    const filteredStudies = caseStudies.filter(s =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.service_area?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.clients?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 font-body">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-text-heading font-heading mb-2">Case Studies</h1>
                    <p className="text-sm text-text-body/60">Showcase your success stories and project outcomes.</p>
                </div>
                <button
                    onClick={() => { setEditingStudy(null); setIsModalOpen(true); }}
                    className="btn-primary py-3 px-6 text-sm"
                >
                    <Plus size={18} />
                    Add Case Study
                </button>
            </div>

            <div className="bg-white rounded-[24px] border border-border/40 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border/40 bg-surface/30">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-body/30" size={16} />
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
                                <th className="px-8 py-4">Client</th>
                                <th className="px-8 py-4">Service Area</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20 text-sm">
                            {isLoading ? (
                                <tr><td colSpan={5} className="px-8 py-12 text-center text-text-body/40">Loading...</td></tr>
                            ) : filteredStudies.length > 0 ? (
                                filteredStudies.map((study) => (
                                    <tr key={study.id} className="hover:bg-surface/30 group">
                                        <td className="px-8 py-4">
                                            <div className="font-bold text-text-heading">{study.title}</div>
                                        </td>
                                        <td className="px-8 py-4 text-text-body/70">{study.clients?.name || "N/A"}</td>
                                        <td className="px-8 py-4 text-text-body/70">{study.service_area}</td>
                                        <td className="px-8 py-4">
                                            {study.published ? (
                                                <span className="text-primary font-bold text-[10px] uppercase tracking-wider">Published</span>
                                            ) : (
                                                <span className="text-text-muted text-[10px] uppercase tracking-wider">Draft</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="flex justify-end gap-1">
                                                <button onClick={() => { setEditingStudy(study); setIsModalOpen(true); }} className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"><Edit2 size={14} /></button>
                                                <button onClick={() => handleDelete(study.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={5} className="px-8 py-12 text-center text-text-body/40">No case studies found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingStudy ? "Edit Case Study" : "Add New Case Study"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <ImageUpload
                        label="Featured Image"
                        value={imageUrl}
                        onChange={setImageUrl}
                        bucket="case-studies"
                    />
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Study Title</label>
                        <input name="title" defaultValue={editingStudy?.title} required className="form-input" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Client</label>
                            <select name="client_id" defaultValue={editingStudy?.client_id || ""} required className="form-input">
                                <option value="">Select a client...</option>
                                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Service Area</label>
                            <input name="service_area" defaultValue={editingStudy?.service_area} className="form-input" placeholder="e.g. Data Strategy" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Industry (drives /industries/[slug] grouping)</label>
                        <select name="industry_slug" defaultValue={editingStudy?.industry_slug || ""} className="form-input">
                            <option value="">(none — won't appear on any industry page)</option>
                            {industries.map(i => <option key={i.slug} value={i.slug}>{i.label}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Summary (Short)</label>
                        <textarea name="summary" defaultValue={editingStudy?.summary} className="form-input min-h-[60px]" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Full Content</label>
                        <textarea name="content" defaultValue={editingStudy?.content} className="form-input min-h-[120px]" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Tags (Comma separated)</label>
                        <input name="tags" defaultValue={editingStudy?.tags?.join(", ")} className="form-input" placeholder="Tag 1, Tag 2..." />
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                        <input name="published" type="checkbox" defaultChecked={editingStudy?.published} id="study-pub" className="accent-primary w-4 h-4" />
                        <label htmlFor="study-pub" className="text-sm font-medium">Published</label>
                    </div>
                    <button disabled={isSubmitting} className="btn-primary w-full py-3 mt-4">
                        {isSubmitting ? "Processing..." : editingStudy ? "Update Case Study" : "Create Case Study"}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
