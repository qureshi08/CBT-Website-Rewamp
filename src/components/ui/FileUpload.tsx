"use client";

import { useState } from "react";
import { Upload, X, Loader2, FileText } from "lucide-react";
import { uploadFile } from "@/lib/actions/storage-actions";

interface FileUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label: string;
    bucket?: string;
    accept?: string;
    hint?: string;
}

// Derives a readable filename from a stored public URL. Storage keys look like
// "ab12cd-1700000000.pdf", so we just show the trailing segment.
function fileNameFromUrl(url: string): string {
    try {
        const path = new URL(url).pathname;
        return decodeURIComponent(path.split("/").pop() || url);
    } catch {
        return url.split("/").pop() || url;
    }
}

export default function FileUpload({
    value,
    onChange,
    label,
    bucket = "uploads",
    accept = "application/pdf",
    hint = "PDF, max 10MB",
}: FileUploadProps) {
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
        } catch {
            alert("An error occurred during upload");
        } finally {
            setIsUploading(false);
            // Reset so re-selecting the same file fires onChange again.
            e.target.value = "";
        }
    };

    return (
        <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">{label}</label>
            <div className="mt-1 flex items-center gap-4">
                {value ? (
                    <div className="relative flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-surface/40 max-w-full">
                        <FileText size={20} className="text-primary shrink-0" />
                        <a
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-text-body truncate max-w-[200px] underline"
                            title={fileNameFromUrl(value)}
                        >
                            {fileNameFromUrl(value)}
                        </a>
                        <button
                            type="button"
                            onClick={() => onChange("")}
                            className="p-1 text-red-500 hover:bg-red-50 rounded-lg shrink-0"
                            aria-label="Remove file"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <div className="w-20 h-20 rounded-xl border-2 border-dashed border-border flex items-center justify-center text-text-body/20">
                        <FileText size={24} />
                    </div>
                )}

                <div className="flex-grow">
                    <label className={`
                        flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide cursor-pointer transition-all
                        ${isUploading ? "bg-surface text-text-muted cursor-not-allowed" : "bg-white border border-border hover:bg-surface text-text-body"}
                    `}>
                        {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                        {isUploading ? "Uploading..." : value ? "Replace file" : "Click to upload"}
                        <input
                            type="file"
                            className="hidden"
                            accept={accept}
                            onChange={handleUpload}
                            disabled={isUploading}
                        />
                    </label>
                    <p className="text-[10px] text-text-muted mt-2">{hint}</p>
                </div>
            </div>
        </div>
    );
}
