"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Search, MoreVertical, Edit2, Trash2, ExternalLink, Loader2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { adminCrud } from "@/lib/actions/admin-actions";
import ImageUpload from "@/components/ui/ImageUpload";

export default function AdminClients() {
    const [clients, setClients] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [logoUrl, setLogoUrl] = useState("");

    useEffect(() => {
        fetchClients();
    }, []);

    useEffect(() => {
        if (editingClient) {
            setLogoUrl(editingClient.logo_url || "");
        } else {
            setLogoUrl("");
        }
    }, [editingClient, isModalOpen]);

    async function fetchClients() {
        setIsLoading(true);
        const result = await adminCrud("clients", "read", undefined, undefined, {
            orderBy: { column: "display_order", ascending: true }
        });

        if (result.success) {
            setClients(result.data || []);
        } else {
            console.error("Error fetching clients:", result.error);
        }
        setIsLoading(false);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const clientData = {
            name: formData.get("name") as string,
            industry: formData.get("industry") as string,
            logo_url: logoUrl,
            is_featured: formData.get("is_featured") === "on",
            display_order: parseInt(formData.get("display_order") as string) || 0,
        };

        const result = editingClient
            ? await adminCrud("clients", "update", clientData, editingClient.id)
            : await adminCrud("clients", "insert", clientData);

        if (result.success) {
            setIsModalOpen(false);
            setEditingClient(null);
            fetchClients();
        } else {
            alert(`Error: ${result.error}`);
        }
        setIsSubmitting(false);
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this client?")) return;

        const result = await adminCrud("clients", "delete", null, id);

        if (result.success) {
            fetchClients();
        } else {
            alert(`Error: ${result.error}`);
        }
    }

    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.industry?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 font-body">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-text-heading font-heading mb-2">Clients</h1>
                    <p className="text-sm text-text-body/60">Manage your brand partnerships and featured logos.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingClient(null);
                        setIsModalOpen(true);
                    }}
                    className="btn-primary py-3 px-6 text-sm"
                >
                    <Plus size={18} />
                    Add Client
                </button>
            </div>

            <div className="bg-white rounded-[24px] border border-border/40 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border/40 bg-surface/30">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-body/30" size={16} />
                        <input
                            type="text"
                            placeholder="Search clients..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-border/60 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-surface/50 text-[10px] uppercase tracking-widest font-bold text-text-body/40 border-b border-border/20">
                                <th className="px-8 py-4">Client</th>
                                <th className="px-8 py-4">Industry</th>
                                <th className="px-8 py-4">Featured</th>
                                <th className="px-8 py-4">Order</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20 text-sm">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-12 text-center text-text-body/40">
                                        <Loader2 className="animate-spin mx-auto mb-2 text-primary" />
                                        Loading clients...
                                    </td>
                                </tr>
                            ) : filteredClients.length > 0 ? (
                                filteredClients.map((client) => (
                                    <tr key={client.id} className="hover:bg-surface/30 transition-colors group">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-surface border border-border/20 flex items-center justify-center p-1.5 text-[10px] font-bold text-text-body/30 overflow-hidden">
                                                    {client.logo_url ? (
                                                        <img src={client.logo_url} alt={client.name} className="w-full h-full object-contain" />
                                                    ) : "LOGO"}
                                                </div>
                                                <div className="font-bold text-text-heading">{client.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-text-body/70">{client.industry || "N/A"}</td>
                                        <td className="px-8 py-4">
                                            {client.is_featured ? (
                                                <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary" />
                                            ) : (
                                                <span className="inline-block w-2.5 h-2.5 rounded-full bg-border" />
                                            )}
                                        </td>
                                        <td className="px-8 py-4 font-mono text-xs opacity-40">{client.display_order}</td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => {
                                                        setEditingClient(client);
                                                        setIsModalOpen(true);
                                                    }}
                                                    className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(client.id)}
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
                                    <td colSpan={5} className="px-8 py-12 text-center text-text-body/40">
                                        No clients found.
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
                title={editingClient ? "Edit Client" : "Add New Client"}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <ImageUpload
                        label="Client Logo"
                        value={logoUrl}
                        onChange={setLogoUrl}
                        bucket="clients"
                    />
                    <div className="space-y-2">
                        <label className="form-label">Client Name</label>
                        <input name="name" defaultValue={editingClient?.name} required className="form-input" placeholder="e.g. PepsiCo" />
                    </div>
                    <div className="space-y-2">
                        <label className="form-label">Industry</label>
                        <input name="industry" defaultValue={editingClient?.industry} className="form-input" placeholder="e.g. FMCG" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="form-label">Display Order</label>
                            <input name="display_order" type="number" defaultValue={editingClient?.display_order || 0} className="form-input" />
                        </div>
                        <div className="flex items-center gap-3 pt-8">
                            <input name="is_featured" type="checkbox" defaultChecked={editingClient?.is_featured} id="featured-check" className="w-5 h-5 accent-primary" />
                            <label htmlFor="featured-check" className="text-sm font-medium text-text-heading">Featured on Home</label>
                        </div>
                    </div>
                    <div className="pt-4">
                        <button disabled={isSubmitting} className="btn-primary w-full py-3">
                            {isSubmitting && <Loader2 className="animate-spin" size={18} />}
                            {editingClient ? "Update Client" : "Create Client"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
