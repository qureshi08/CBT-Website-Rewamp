"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Edit2, Trash2, Handshake, Loader2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { adminCrud } from "@/lib/actions/admin-actions";
import ImageUpload from "@/components/ui/ImageUpload";

export default function AdminPartners() {
    const [partners, setPartners] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPartner, setEditingPartner] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [logoUrl, setLogoUrl] = useState("");

    useEffect(() => {
        fetchPartners();
    }, []);

    useEffect(() => {
        if (editingPartner) {
            setLogoUrl(editingPartner.logo_url || "");
        } else {
            setLogoUrl("");
        }
    }, [editingPartner, isModalOpen]);

    async function fetchPartners() {
        setIsLoading(true);
        const result = await adminCrud("partners", "read", null, undefined, {
            orderBy: { column: "display_order", ascending: true }
        });

        if (result.success) {
            setPartners(result.data || []);
        } else {
            console.error("Error fetching partners:", result.error);
        }
        setIsLoading(false);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        const partnerData: any = {
            name: formData.get("name") as string,
            logo_url: logoUrl,
            partner_type: formData.get("partner_type") as "Technology" | "Delivery" | "Referral",
            website_url: formData.get("website_url") as string,
            display_order: parseInt(formData.get("display_order") as string) || 0,
        };

        const result = editingPartner
            ? await adminCrud("partners", "update", partnerData, editingPartner.id)
            : await adminCrud("partners", "insert", partnerData);

        if (result.success) {
            setIsModalOpen(false);
            setEditingPartner(null);
            fetchPartners();
        } else {
            alert(`Error: ${result.error}`);
        }
        setIsSubmitting(false);
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure?")) return;
        const result = await adminCrud("partners", "delete", null, id);
        if (result.success) fetchPartners();
        else alert(`Error: ${result.error}`);
    }

    const filteredPartners = partners.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.partner_type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 font-body">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-text-heading font-heading mb-2">Technology Partners</h1>
                    <p className="text-sm text-text-body/60">Manage your ecosystem and strategic tech alliances.</p>
                </div>
                <button
                    onClick={() => { setEditingPartner(null); setIsModalOpen(true); }}
                    className="btn-primary py-3 px-6 text-sm"
                >
                    <Plus size={18} />
                    Add Partner
                </button>
            </div>

            <div className="bg-white rounded-[24px] border border-border/40 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border/40 bg-surface/30">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-body/30" size={16} />
                        <input
                            type="text"
                            placeholder="Search partners..."
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
                                <th className="px-8 py-4">Partner Brand</th>
                                <th className="px-8 py-4">Type</th>
                                <th className="px-8 py-4">Order</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20 text-sm">
                            {isLoading ? (
                                <tr><td colSpan={4} className="px-8 py-12 text-center text-text-body/40">Loading...</td></tr>
                            ) : filteredPartners.length > 0 ? (
                                filteredPartners.map((partner) => (
                                    <tr key={partner.id} className="hover:bg-surface/30 group">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded bg-white border border-border/20 flex items-center justify-center p-1 overflow-hidden">
                                                    {partner.logo_url && <img src={partner.logo_url} className="w-full h-full object-contain" alt={partner.name} />}
                                                </div>
                                                <div className="font-bold text-text-heading">{partner.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <span className="bg-primary-muted text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">{partner.partner_type}</span>
                                        </td>
                                        <td className="px-8 py-4 text-text-body/40 font-mono text-xs">{partner.display_order}</td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="flex justify-end gap-1">
                                                <button onClick={() => { setEditingPartner(partner); setIsModalOpen(true); }} className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors font-semibold uppercase tracking-widest text-[10px]">Edit</button>
                                                <button onClick={() => handleDelete(partner.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors font-semibold uppercase tracking-widest text-[10px]">Del</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={4} className="px-8 py-12 text-center text-text-body/40">No partners found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingPartner ? "Edit Partner" : "Add New Partner"}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <ImageUpload
                        label="Partner Logo"
                        value={logoUrl}
                        onChange={setLogoUrl}
                        bucket="partners"
                    />
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Brand Name</label>
                        <input name="name" defaultValue={editingPartner?.name} required className="form-input" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Partner Type</label>
                            <select name="partner_type" defaultValue={editingPartner?.partner_type || "Technology"} className="form-input">
                                <option value="Technology">Technology</option>
                                <option value="Delivery">Delivery</option>
                                <option value="Referral">Referral</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Order</label>
                            <input name="display_order" type="number" defaultValue={editingPartner?.display_order || 0} className="form-input" />
                        </div>
                    </div>
                    <button disabled={isSubmitting} className="btn-primary w-full py-3 mt-4">
                        {isSubmitting ? "Processing..." : editingPartner ? "Update Partner" : "Create Partner"}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
