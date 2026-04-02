"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Edit2, Trash2, GraduationCap, Loader2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { adminCrud } from "@/lib/actions/admin-actions";
import ImageUpload from "@/components/ui/ImageUpload";

export default function AdminAlumni() {
    const [alumni, setAlumni] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAlumnus, setEditingAlumnus] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState("");

    useEffect(() => {
        fetchAlumni();
    }, []);

    useEffect(() => {
        setAvatarUrl(editingAlumnus?.avatar_url || "");
    }, [editingAlumnus, isModalOpen]);

    async function fetchAlumni() {
        setIsLoading(true);
        const result = await adminCrud("cgap_alumni", "read", null, undefined, {
            orderBy: { column: "display_order", ascending: true }
        });

        if (result.success) {
            setAlumni(result.data || []);
        }
        setIsLoading(false);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        const alumnusData = {
            name: formData.get("name") as string,
            role: formData.get("role") as string,
            company: formData.get("company") as string,
            cohort: formData.get("cohort") as string,
            quote: formData.get("quote") as string,
            avatar_url: avatarUrl,
            display_order: parseInt(formData.get("display_order") as string) || 0,
        };

        const result = editingAlumnus
            ? await adminCrud("cgap_alumni", "update", alumnusData, editingAlumnus.id)
            : await adminCrud("cgap_alumni", "insert", alumnusData);

        if (result.success) {
            setIsModalOpen(false);
            setEditingAlumnus(null);
            fetchAlumni();
        } else {
            alert(`Error: ${result.error}`);
        }
        setIsSubmitting(false);
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure?")) return;
        const result = await adminCrud("cgap_alumni", "delete", null, id);
        if (result.success) fetchAlumni();
        else alert(`Error: ${result.error}`);
    }

    const filtered = alumni.filter(a =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.cohort?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 font-body">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-text-heading font-heading mb-2">CGAP Alumni Feedback</h1>
                    <p className="text-sm text-text-body/60">Manage transformations and stories from our CGAP graduates.</p>
                </div>
                <button
                    onClick={() => { setEditingAlumnus(null); setIsModalOpen(true); }}
                    className="btn-primary py-3 px-6 text-sm"
                >
                    <Plus size={18} />
                    Add Alumni Feedback
                </button>
            </div>

            <div className="bg-white rounded-[24px] border border-border/40 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border/40 bg-surface/30">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-body/30" size={16} />
                        <input
                            type="text"
                            placeholder="Search alumni..."
                            className="w-full pl-10 pr-4 py-2.5 border border-border/60 rounded-xl outline-none text-sm bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-surface/50 text-[10px] uppercase tracking-widest font-bold text-text-body/40 border-b border-border/20">
                                <th className="px-8 py-4">Alumnus</th>
                                <th className="px-8 py-4">Experience</th>
                                <th className="px-8 py-4">Cohort</th>
                                <th className="px-8 py-4">Order</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20 text-sm">
                            {isLoading ? (
                                <tr><td colSpan={5} className="px-8 py-12 text-center text-text-body/40">Loading...</td></tr>
                            ) : filtered.length > 0 ? (
                                filtered.map((item) => (
                                    <tr key={item.id} className="hover:bg-surface/30 group">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-surface border border-border/20 flex-shrink-0 overflow-hidden">
                                                    {item.avatar_url && <img src={item.avatar_url} className="w-full h-full object-cover" alt="" />}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-text-heading">{item.name}</div>
                                                    <div className="text-[10px] text-text-body/40 uppercase tracking-tighter">{item.role} @ {item.company}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 max-w-md">
                                            <p className="line-clamp-2 italic text-text-body/70 text-xs text-pretty italic">"{item.quote}"</p>
                                        </td>
                                        <td className="px-8 py-4 text-primary font-bold">
                                            {item.cohort}
                                        </td>
                                        <td className="px-8 py-4 text-text-body/40 font-mono text-xs">{item.display_order}</td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="flex justify-end gap-1">
                                                <button onClick={() => { setEditingAlumnus(item); setIsModalOpen(true); }} className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors font-semibold uppercase tracking-widest text-[10px]">Edit</button>
                                                <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors font-semibold uppercase tracking-widest text-[10px]">Del</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={5} className="px-8 py-12 text-center text-text-body/40">No alumni feedback found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingAlumnus ? "Edit Alumnus Story" : "Add Alumnus Story"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <ImageUpload label="Alumnus Avatar" value={avatarUrl} onChange={setAvatarUrl} bucket="alumni" />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Full Name</label>
                            <input name="name" defaultValue={editingAlumnus?.name} required className="form-input" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Cohort</label>
                            <input name="cohort" defaultValue={editingAlumnus?.cohort} className="form-input" placeholder="e.g. Cohort 1" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Role</label>
                            <input name="role" defaultValue={editingAlumnus?.role} className="form-input" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Company</label>
                            <input name="company" defaultValue={editingAlumnus?.company} className="form-input" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Transformational Quote</label>
                        <textarea name="quote" defaultValue={editingAlumnus?.quote} required className="form-input min-h-[100px]" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Display Order</label>
                        <input name="display_order" type="number" defaultValue={editingAlumnus?.display_order || 0} className="form-input" />
                    </div>
                    <button disabled={isSubmitting} className="btn-primary w-full py-3 mt-4">
                        {isSubmitting ? "Processing..." : editingAlumnus ? "Update Alumnus Feedback" : "Create Alumnus Feedback"}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
