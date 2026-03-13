"use client";

import { useState } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { uploadFile } from "@/lib/actions/storage-actions";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label: string;
    bucket?: string;
}

export default function ImageUpload({ value, onChange, label, bucket = "uploads" }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("bucket", bucket);

        try {
            const result = await uploadFile(formData);
            if (result.success && result.url) {
                onChange(result.url);
            } else {
                alert(`Upload failed: ${result.error}`);
            }
        } catch (error) {
            alert("An error occurred during upload");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">{label}</label>
            <div className="mt-1 flex items-center gap-4">
                {value ? (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-border group">
                        <img src={value} alt="Preview" className="w-full h-full object-cover" />
                        <button
                            type="button"
                            onClick={() => onChange("")}
                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>
                ) : (
                    <div className="w-20 h-20 rounded-xl border-2 border-dashed border-border flex items-center justify-center text-text-body/20">
                        <ImageIcon size={24} />
                    </div>
                )}

                <div className="flex-grow">
                    <label className={`
                        flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide cursor-pointer transition-all
                        ${isUploading ? "bg-surface text-text-muted cursor-not-allowed" : "bg-white border border-border hover:bg-surface text-text-body"}
                    `}>
                        {isUploading ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <Upload size={16} />
                        )}
                        {isUploading ? "Uploading..." : "Click to upload"}
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={isUploading}
                        />
                    </label>
                    <p className="text-[10px] text-text-muted mt-2">Recommended: PNG or JPG, max 5MB</p>
                </div>
            </div>
            {/* Hidden input to keep it compatible with form data if needed, but we use onChange */}
            <input type="hidden" name={label.toLowerCase().replace(/\s+/g, '_')} value={value || ""} />
        </div>
    );
}
