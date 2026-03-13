"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Search, Edit2, Trash2, GraduationCap, Loader2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { adminCrud } from "@/lib/actions/admin-actions";

export default function AdminBatches() {
    const [batches, setBatches] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBatch, setEditingBatch] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        fetchBatches();
    }, []);

    async function fetchBatches() {
        setIsLoading(true);
        // Using direct supabase client for read if possible, but adminCrud read is safer for bypass RLS
        const result = await adminCrud("cgap_cohorts", "read", null, undefined, {
            orderBy: { column: "cohort_number", ascending: false }
        });

        if (result.success) {
            setBatches(result.data || []);
        } else {
            console.error("Error fetching batches:", result.error);
        }
        setIsLoading(false);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        const batchData = {
            cohort_number: parseInt(formData.get("cohort_number") as string),
            start_date: formData.get("start_date") as string,
            end_date: formData.get("end_date") as string || null,
            status: formData.get("status") as string,
            applications_open: formData.get("applications_open") === "on",
        };

        const result = editingBatch
            ? await adminCrud("cgap_cohorts", "update", batchData, editingBatch.id)
            : await adminCrud("cgap_cohorts", "insert", batchData);

        if (result.success) {
            setIsModalOpen(false);
            setEditingBatch(null);
            fetchBatches();
        } else {
            alert(`Error: ${result.error}`);
        }
        setIsSubmitting(false);
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this batch?")) return;
        const result = await adminCrud("cgap_cohorts", "delete", null, id);
        if (result.success) fetchBatches();
        else alert(`Error: ${result.error}`);
    }

    const filteredBatches = batches.filter(b =>
        String(b.cohort_number).includes(searchTerm) ||
        b.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 font-body">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-text-heading font-heading mb-2">CGAP Batches</h1>
                    <p className="text-sm text-text-body/60">Manage the Graduate Academy training cycles.</p>
                </div>
                <button
                    onClick={() => { setEditingBatch(null); setIsModalOpen(true); }}
                    className="btn-primary py-3 px-6 text-sm"
                >
                    <Plus size={18} />
                    Add Batch
                </button>
            </div>

            <div className="bg-white rounded-[24px] border border-border/40 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border/40 bg-surface/30">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-body/30" size={16} />
                        <input
                            type="text"
                            placeholder="Search batches..."
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
                                <th className="px-8 py-4">Batch #</th>
                                <th className="px-8 py-4">Start Date</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4">Hiring</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20 text-sm">
                            {isLoading ? (
                                <tr><td colSpan={5} className="px-8 py-12 text-center text-text-body/40">Loading...</td></tr>
                            ) : filteredBatches.length > 0 ? (
                                filteredBatches.map((batch) => (
                                    <tr key={batch.id} className="hover:bg-surface/30 group">
                                        <td className="px-8 py-4 font-bold text-text-heading">Batch {batch.cohort_number}</td>
                                        <td className="px-8 py-4 text-text-body/70">{new Date(batch.start_date).toLocaleDateString()}</td>
                                        <td className="px-8 py-4">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${batch.status === 'ongoing' ? 'bg-primary/10 text-primary' :
                                                batch.status === 'upcoming' ? 'bg-blue-50 text-blue-600' : 'bg-surface text-text-muted border border-border/20'
                                                }`}>
                                                {batch.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-4">
                                            {batch.applications_open ? (
                                                <span className="text-primary flex items-center gap-1.5 font-medium">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                                    Open
                                                </span>
                                            ) : (
                                                <span className="text-text-muted">Closed</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="flex justify-end gap-1">
                                                <button onClick={() => { setEditingBatch(batch); setIsModalOpen(true); }} className="p-2 hover:bg-primary/10 text-primary rounded-lg"><Edit2 size={14} /></button>
                                                <button onClick={() => handleDelete(batch.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg"><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={5} className="px-8 py-12 text-center text-text-body/40">No batches found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingBatch ? "Edit Batch" : "Add New Batch"}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Batch Number</label>
                            <input name="cohort_number" type="number" defaultValue={editingBatch?.cohort_number} required className="form-input" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Status</label>
                            <select name="status" defaultValue={editingBatch?.status || "upcoming"} className="form-input">
                                <option value="upcoming">Upcoming</option>
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Start Date</label>
                            <input name="start_date" type="date" defaultValue={editingBatch?.start_date} required className="form-input" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">End Date (Optional)</label>
                            <input name="end_date" type="date" defaultValue={editingBatch?.end_date} className="form-input" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 pt-4">
                        <input name="applications_open" type="checkbox" defaultChecked={editingBatch?.applications_open} id="hiring-check" className="w-5 h-5 accent-primary" />
                        <label htmlFor="hiring-check" className="text-sm font-medium text-text-heading">Applications Open</label>
                    </div>
                    <button disabled={isSubmitting} className="btn-primary w-full py-3 mt-4">
                        {isSubmitting ? "Processing..." : editingBatch ? "Update Batch" : "Create Batch"}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
