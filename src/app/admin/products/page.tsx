"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Edit2, Trash2, Package, Loader2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { adminCrud } from "@/lib/actions/admin-actions";
import ImageUpload from "@/components/ui/ImageUpload";

export default function AdminProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [logoUrl, setLogoUrl] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (editingProduct) {
            setLogoUrl(editingProduct.screenshot_urls?.[0] || "");
        } else {
            setLogoUrl("");
        }
    }, [editingProduct, isModalOpen]);

    async function fetchProducts() {
        setIsLoading(true);
        const result = await adminCrud("products", "read", undefined, undefined, { orderBy: { column: "display_order", ascending: true } });

        if (result.success) {
            setProducts(result.data || []);
        } else {
            console.error("Error fetching products:", result.error);
            setProducts([]);
        }
        setIsLoading(false);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        const productData = {
            name: formData.get("name") as string,
            slug: (formData.get("name") as string).toLowerCase().replace(/\s+/g, '-'),
            category: formData.get("category") as string,
            industry: formData.get("industry") as string,
            short_description: formData.get("short_description") as string,
            appsource_url: formData.get("appsource_url") as string,
            demo_url: formData.get("demo_url") as string,
            badge_text: (formData.get("badge_text") as string) || null,
            detail_path: (formData.get("detail_path") as string) || null,
            partner_note: (formData.get("partner_note") as string) || null,
            display_order: parseInt(formData.get("display_order") as string) || 0,
            is_featured: formData.get("is_featured") === "on",
            screenshot_urls: logoUrl ? [logoUrl] : [],
        };

        const result = editingProduct
            ? await adminCrud("products", "update", productData, editingProduct.id)
            : await adminCrud("products", "insert", productData);

        if (result.success) {
            setIsModalOpen(false);
            setEditingProduct(null);
            fetchProducts();
        } else {
            alert(`Error: ${result.error}`);
        }
        setIsSubmitting(false);
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this product?")) return;
        const result = await adminCrud("products", "delete", null, id);
        if (result.success) fetchProducts();
        else alert(`Error: ${result.error}`);
    }

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.industry?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 font-body">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-text-heading font-heading mb-2">Products</h1>
                    <p className="text-sm text-text-body/60">Manage your custom visuals and analytics tools portfolio.</p>
                </div>
                <button
                    onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
                    className="btn-primary py-3 px-6 text-sm"
                >
                    <Plus size={18} />
                    Add Product
                </button>
            </div>

            <div className="bg-white rounded-[24px] border border-border/40 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border/40 bg-surface/30">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-body/30" size={16} />
                        <input
                            type="text"
                            placeholder="Search products..."
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
                                <th className="px-8 py-4">Product Name</th>
                                <th className="px-8 py-4">Category</th>
                                <th className="px-8 py-4">Industry</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20 text-sm">
                            {isLoading ? (
                                <tr><td colSpan={5} className="px-8 py-12 text-center text-text-body/40">Loading...</td></tr>
                            ) : filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-surface/30 group">
                                        <td className="px-8 py-4 font-bold text-text-heading">{product.name}</td>
                                        <td className="px-8 py-4 text-text-body/70">{product.category}</td>
                                        <td className="px-8 py-4 text-text-body/70">{product.industry || "General"}</td>
                                        <td className="px-8 py-4">
                                            {product.is_featured ? (
                                                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Featured</span>
                                            ) : (
                                                <span className="text-text-muted text-[10px] uppercase">Standard</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="flex justify-end gap-1">
                                                <button onClick={() => { setEditingProduct(product); setIsModalOpen(true); }} className="p-2 hover:bg-primary/10 text-primary rounded-lg"><Edit2 size={14} /></button>
                                                <button onClick={() => handleDelete(product.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg"><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={5} className="px-8 py-12 text-center text-text-body/40">No products found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingProduct ? "Edit Product" : "Add New Product"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <ImageUpload
                        label="Product Screenshot"
                        value={logoUrl}
                        onChange={setLogoUrl}
                        bucket="products"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Product Name</label>
                            <input name="name" defaultValue={editingProduct?.name} required className="form-input" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Category</label>
                            <select name="category" defaultValue={editingProduct?.category || ""} required className="form-input">
                                <option value="" disabled>Select a category…</option>
                                <option value="Power BI Custom Visuals">Power BI Custom Visuals</option>
                                <option value="ECL Calculator">ECL Calculator</option>
                                <option value="Data Tool">Data Tool</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Industry</label>
                        <input name="industry" defaultValue={editingProduct?.industry} className="form-input" placeholder="e.g. Banking" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Short Description</label>
                        <textarea name="short_description" defaultValue={editingProduct?.short_description} className="form-input min-h-[80px]" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Features (Comma separated)</label>
                        <input name="features" defaultValue={editingProduct?.screenshot_urls?.join(", ")} className="form-input" placeholder="Feature 1, Feature 2..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">AppSource URL</label>
                            <input name="appsource_url" defaultValue={editingProduct?.appsource_url} className="form-input" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Demo URL</label>
                            <input name="demo_url" defaultValue={editingProduct?.demo_url} className="form-input" />
                        </div>
                    </div>
                    <div className="pt-4 mt-2 border-t border-border/40">
                        <p className="text-[10px] uppercase tracking-widest text-text-muted/60 font-bold mb-3">Portfolio positioning (optional)</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Badge Text</label>
                                <input name="badge_text" defaultValue={editingProduct?.badge_text || ""} className="form-input" placeholder="e.g. HERO SKU" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Partner Note</label>
                                <input name="partner_note" defaultValue={editingProduct?.partner_note || ""} className="form-input" placeholder="e.g. Built with KPMG" />
                            </div>
                        </div>
                        <div className="space-y-1 mt-4">
                            <label className="text-[11px] font-bold uppercase text-text-muted tracking-widest">Internal Detail Path</label>
                            <input name="detail_path" defaultValue={editingProduct?.detail_path || ""} className="form-input" placeholder="e.g. /products/ecl-calculator" />
                            <p className="text-[11px] text-text-muted/70 mt-1">If set, the card links to this internal page instead of AppSource.</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-2">
                            <input name="is_featured" type="checkbox" defaultChecked={editingProduct?.is_featured} id="prod-feat" className="accent-primary" />
                            <label htmlFor="prod-feat" className="text-xs font-bold uppercase tracking-wide">Featured</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-[10px] font-bold uppercase">Order</label>
                            <input name="display_order" type="number" defaultValue={editingProduct?.display_order || 0} className="w-16 form-input py-1" />
                        </div>
                    </div>
                    <button disabled={isSubmitting} className="btn-primary w-full py-3 mt-4">
                        {isSubmitting ? "Processing..." : editingProduct ? "Update Product" : "Create Product"}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
