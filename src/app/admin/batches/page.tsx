"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Loader2, Save, ArrowRight } from "lucide-react";
import { adminCrud } from "@/lib/actions/admin-actions";

export default function AdminBatches() {
    const [batchCount, setBatchCount] = useState<number>(0);
    const [statId, setStatId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchBatchStat();
    }, []);

    async function fetchBatchStat() {
        setIsLoading(true);
        // Try to find the CGAP Batches stat
        const result = await adminCrud("stats", "read", null, undefined, {
            filter: { column: "label", value: "CGAP Batches" }
        });

        if (result.success && result.data && result.data.length > 0) {
            const stat = result.data[0] as any;
            setBatchCount(stat.value);
            setStatId(stat.id);
        } else {
            // If it doesn't exist, we'll create it on the first save or just handle it
            console.log("CGAP Batches stat not found in stats table.");
        }
        setIsLoading(false);
    }

    async function handleSave() {
        setIsSaving(true);
        setMessage(null);

        const statData = {
            label: "CGAP Batches",
            value: batchCount,
            suffix: "+",
            display_order: 10 // Arbitrary order
        };

        const result = statId
            ? await adminCrud("stats", "update", statData, statId)
            : await adminCrud("stats", "insert", statData);

        if (result.success) {
            setMessage({ type: 'success', text: 'Batch count updated successfully!' });
            if (!statId && result.data) {
                setStatId((result.data as any)[0]?.id || null);
            }
        } else {
            setMessage({ type: 'error', text: `Failed to update: ${result.error}` });
        }
        setIsSaving(false);
    }

    return (
        <div className="space-y-8 font-body max-w-2xl">
            <div>
                <h1 className="text-3xl font-bold text-text-heading font-heading mb-2">CGAP Batch Management</h1>
                <p className="text-sm text-text-body/60">Update the total number of CGAP batches conducted globally.</p>
            </div>

            {isLoading ? (
                <div className="p-20 flex justify-center">
                    <Loader2 className="animate-spin text-primary" size={32} />
                </div>
            ) : (
                <div className="bg-white rounded-[24px] border border-border/40 shadow-sm p-8 space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                            <GraduationCap size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-text-heading">Total Batches</h3>
                            <p className="text-xs text-text-body/50">This number is reflected across the entire website.</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Number of Batches</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={batchCount}
                                onChange={(e) => setBatchCount(parseInt(e.target.value) || 0)}
                                className="w-full pl-6 pr-16 py-4 border border-border/60 rounded-2xl outline-none text-2xl font-bold font-heading focus:border-primary/50 transition-colors"
                            />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-primary font-bold text-xl">+</div>
                        </div>
                    </div>

                    {message && (
                        <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                            {message.text}
                        </div>
                    )}

                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-base shadow-lg shadow-primary/20"
                    >
                        {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        {isSaving ? 'Updating...' : 'Update Static Count'}
                    </button>

                    <div className="pt-4 border-t border-border/20">
                        <div className="text-[11px] font-bold uppercase text-text-muted tracking-widest mb-3">Live Preview (Stats Bar)</div>
                        <div className="flex items-center gap-3 bg-surface p-4 rounded-xl border border-border/40">
                            <div className="font-heading text-2xl font-bold text-primary">{batchCount}+</div>
                            <div className="text-xs text-text-body/60 font-medium">CGAP Batches Conducted</div>
                            <ArrowRight size={14} className="ml-auto text-primary opacity-30" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
