"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Edit2, Trash2, MessageSquare, Loader2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { adminCrud } from "@/lib/actions/admin-actions";
import ImageUpload from "@/components/ui/ImageUpload";

export default function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTesti, setEditingTesti] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState("");

    useEffect(() => {
        fetchTestimonials();
    }, []);

    useEffect(() => {
        setAvatarUrl(editingTesti?.avatar_url || "");
    }, [editingTesti, isModalOpen]);

    async function fetchTestimonials() {
        setIsLoading(true);
        const result = await adminCrud("testimonials", "read", null, undefined, {
            orderBy: { column: "display_order", ascending: true }
        });

        if (result.success) {
            setTestimonials(result.data || []);
        }
        setIsLoading(false);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        const testiData = {
            quote: formData.get("quote") as string,
            author: formData.get("author") as string,
            company: formData.get("company") as string,
            role: formData.get("role") as string,
            avatar_url: avatarUrl,
            page: formData.get("page") as string || "General",
            display_order: parseInt(formData.get("display_order") as string) || 0,
        };

        const result = editingTesti
            ? await adminCrud("testimonials", "update", testiData, editingTesti.id)
            : await adminCrud("testimonials", "insert", testiData);

        if (result.success) {
            setIsModalOpen(false);
            setEditingTesti(null);
            fetchTestimonials();
        } else {
            alert(`Error: ${result.error}`);
        }
        setIsSubmitting(false);
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure?")) return;
        const result = await adminCrud("testimonials", "delete", null, id);
        if (result.success) fetchTestimonials();
        else alert(`Error: ${result.error}`);
    }

    const filtered = testimonials.filter(t =>
        t.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 font-body">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-text-heading font-heading mb-2">Testimonials</h1>
                    <p className="text-sm text-text-body/60">Manage client reviews and executive feedback across the site.</p>
                </div>
                <button
                    onClick={() => { setEditingTesti(null); setIsModalOpen(true); }}
                    className="btn-primary py-3 px-6 text-sm"
                >
                    <Plus size={18} />
                    Add Testimonial
                </button>
            </div>

            <div className="bg-white rounded-[24px] border border-border/40 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border/40 bg-surface/30 flex justify-between items-center">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-body/30" size={16} />
                        <input
                            type="text"
                            placeholder="Search testimonials..."
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
                                <th className="px-8 py-4">Author</th>
                                <th className="px-8 py-4">Quote</th>
                                <th className="px-8 py-4">Target Page</th>
                                <th className="px-8 py-4">Order</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20 text-sm">
                            {isLoading ? (
                                <tr><td colSpan={5} className="px-8 py-12 text-center text-text-body/40">Loading...</td></tr>
                            ) : filtered.length > 0 ? (
                                filtered.map((testi) => (
                                    <tr key={testi.id} className="hover:bg-surface/30 group">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-surface border border-border/20 flex-shrink-0 overflow-hidden">
                                                    {testi.avatar_url && <img src={testi.avatar_url} className="w-full h-full object-cover" alt="" />}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-text-heading leading-tight">{testi.author}</div>
                                                    <div className="text-[10px] text-text-body/40 uppercase tracking-tighter">{testi.role} @ {testi.company}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 max-w-md">
                                            <p className="line-clamp-2 italic text-text-body/70 text-xs text-pretty italic">"{testi.quote}"</p>
                                        </td>
                                        <td className="px-8 py-4">
                                            <span className="bg-primary/5 text-primary text-[10px] font-bold px-2 py-0.5 rounded border border-primary/20">{testi.page}</span>
                                        </td>
                                        <td className="px-8 py-4 text-text-body/40 font-mono text-xs">{testi.display_order}</td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="flex justify-end gap-1">
                                                <button onClick={() => { setEditingTesti(testi); setIsModalOpen(true); }} className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors font-semibold uppercase tracking-widest text-[10px]">Edit</button>
                                                <button onClick={() => handleDelete(testi.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors font-semibold uppercase tracking-widest text-[10px]">Del</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={5} className="px-8 py-12 text-center text-text-body/40">No testimonials found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingTesti ? "Edit Testimonial" : "Add New Testimonial"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <ImageUpload label="Author Avatar" value={avatarUrl} onChange={setAvatarUrl} bucket="testimonials" />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Author Name</label>
                            <input name="author" defaultValue={editingTesti?.author} required className="form-input" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Role</label>
                            <input name="role" defaultValue={editingTesti?.role} required className="form-input" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Company</label>
                        <input name="company" defaultValue={editingTesti?.company} required className="form-input" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Quote</label>
                        <textarea name="quote" defaultValue={editingTesti?.quote} required className="form-input min-h-[100px]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Target Page</label>
                            <select name="page" defaultValue={editingTesti?.page || "General"} className="form-input">
                                <option value="Home">Home</option>
                                <option value="CGAP">CGAP</option>
                                <option value="Partners">Partners</option>
                                <option value="Products">Products</option>
                                <option value="General">General</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Order</label>
                            <input name="display_order" type="number" defaultValue={editingTesti?.display_order || 0} className="form-input" />
                        </div>
                    </div>
                    <button disabled={isSubmitting} className="btn-primary w-full py-3 mt-4">
                        {isSubmitting ? "Processing..." : editingTesti ? "Update Testimonial" : "Create Testimonial"}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
