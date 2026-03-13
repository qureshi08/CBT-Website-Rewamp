"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Edit2, Trash2, BarChart3, Loader2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { adminCrud } from "@/lib/actions/admin-actions";

export default function AdminStats() {
    const [stats, setStats] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStat, setEditingStat] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchStats();
    }, []);

    async function fetchStats() {
        setIsLoading(true);
        const result = await adminCrud("stats", "read", null, undefined, {
            orderBy: { column: "display_order", ascending: true }
        });

        if (result.success) {
            setStats(result.data || []);
        } else {
            console.error("Error fetching stats:", result.error);
        }
        setIsLoading(false);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        const statData: any = {
            label: formData.get("label") as string,
            value: parseFloat(formData.get("value") as string),
            suffix: formData.get("suffix") as string,
            display_order: parseInt(formData.get("display_order") as string) || 0,
        };

        const result = editingStat
            ? await adminCrud("stats", "update", statData, editingStat.id)
            : await adminCrud("stats", "insert", statData);

        if (result.success) {
            setIsModalOpen(false);
            setEditingStat(null);
            fetchStats();
        } else {
            alert(`Error: ${result.error}`);
        }
        setIsSubmitting(false);
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure? This will remove the stat from the homepage.")) return;
        const result = await adminCrud("stats", "delete", null, id);
        if (result.success) fetchStats();
        else alert(`Error: ${result.error}`);
    }

    return (
        <div className="space-y-8 font-body">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-text-heading font-heading mb-2">Dynamic Statistics</h1>
                    <p className="text-sm text-text-body/60">Manage the numbers and metrics displayed on the homepage.</p>
                </div>
                <button
                    onClick={() => { setEditingStat(null); setIsModalOpen(true); }}
                    className="btn-primary py-3 px-6 text-sm"
                >
                    <Plus size={18} />
                    Add Statistic
                </button>
            </div>

            <div className="bg-white rounded-[24px] border border-border/40 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-surface/50 text-[10px] uppercase tracking-widest font-bold text-text-body/40 border-b border-border/20">
                                <th className="px-8 py-4">Statistic Label</th>
                                <th className="px-8 py-4">Value</th>
                                <th className="px-8 py-4">Suffix</th>
                                <th className="px-8 py-4">Order</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20 text-sm">
                            {isLoading ? (
                                <tr><td colSpan={5} className="px-8 py-12 text-center text-text-body/40">Loading...</td></tr>
                            ) : stats.length > 0 ? (
                                stats.map((stat) => (
                                    <tr key={stat.id} className="hover:bg-surface/30 group transition-colors">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-primary/5 text-primary flex items-center justify-center">
                                                    <BarChart3 size={14} />
                                                </div>
                                                <div className="font-bold text-text-heading">{stat.label}</div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 font-mono font-bold text-text-heading">{stat.value}</td>
                                        <td className="px-8 py-4 text-primary font-bold">{stat.suffix || "None"}</td>
                                        <td className="px-8 py-4 text-text-body/40 font-mono text-xs">{stat.display_order}</td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="flex justify-end gap-1">
                                                <button onClick={() => { setEditingStat(stat); setIsModalOpen(true); }} className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors font-semibold uppercase tracking-widest text-[10px]">Edit</button>
                                                <button onClick={() => handleDelete(stat.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors font-semibold uppercase tracking-widest text-[10px]">Del</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={5} className="px-8 py-12 text-center text-text-body/40">No statistics found. Click "Add Statistic" to begin.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingStat ? "Edit Statistic" : "Add New Statistic"}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Label</label>
                        <input name="label" defaultValue={editingStat?.label} required className="form-input" placeholder="e.g. Projects Delivered" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Numeric Value</label>
                            <input name="value" type="number" step="0.1" defaultValue={editingStat?.value} required className="form-input" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Suffix</label>
                            <input name="suffix" defaultValue={editingStat?.suffix} className="form-input" placeholder="e.g. +, %, ×" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Display Order</label>
                        <input name="display_order" type="number" defaultValue={editingStat?.display_order || 0} className="form-input" />
                    </div>
                    <button disabled={isSubmitting} className="btn-primary w-full py-3 mt-4">
                        {isSubmitting ? "Processing..." : editingStat ? "Update Statistic" : "Create Statistic"}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
