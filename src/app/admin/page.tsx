import { ArrowUpRight, Users, FileText, Package, GraduationCap } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/admin";

export default async function AdminDashboard() {
    // Fetch counts and recent data
    const [
        { count: clientsCount },
        { count: caseStudiesCount },
        { count: productsCount },
        { count: batchesCount },
        { data: recentEnquiries },
        { data: recentStudies }
    ] = await Promise.all([
        supabaseAdmin.from("clients").select("*", { count: 'exact', head: true }),
        supabaseAdmin.from("case_studies").select("*", { count: 'exact', head: true }),
        supabaseAdmin.from("products").select("*", { count: 'exact', head: true }),
        supabaseAdmin.from("cgap_cohorts").select("*", { count: 'exact', head: true }),
        supabaseAdmin.from("contact_submissions").select("*").order("created_at", { ascending: false }).limit(3),
        supabaseAdmin.from("case_studies").select("*").order("created_at", { ascending: false }).limit(2)
    ]);

    const stats = [
        { label: "Total Clients", value: (clientsCount || 0).toString(), icon: <Users size={20} />, trend: "Active brands" },
        { label: "Case Studies", value: (caseStudiesCount || 0).toString(), icon: <FileText size={20} />, trend: "Success stories" },
        { label: "Products", value: (productsCount || 0).toString(), icon: <Package size={20} />, trend: "Custom visuals" },
        { label: "CGAP Batches", value: (batchesCount || 0).toString(), icon: <GraduationCap size={20} />, trend: "Skill programs" },
    ];

    return (
        <div className="space-y-10 font-body">
            <div>
                <h1 className="text-4xl font-bold text-text-heading font-heading mb-2">Welcome Back</h1>
                <p className="text-text-body/60 text-sm">Manage your website content and track growth in real-time.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-8 rounded-3xl border border-border/40 shadow-sm hover:shadow-xl transition-all group">
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                {stat.icon}
                            </div>
                            <span className="text-text-body/30"><ArrowUpRight size={16} /></span>
                        </div>
                        <div className="text-3xl font-bold text-text-heading font-heading mb-1">{stat.value}</div>
                        <div className="text-[11px] font-bold text-text-heading opacity-60 mb-4 uppercase tracking-widest">{stat.label}</div>
                        <div className="text-[10px] uppercase tracking-widest font-bold text-primary bg-primary/5 px-2 py-1 rounded-md inline-block">
                            {stat.trend}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-10 mt-12">
                <div className="bg-white rounded-[40px] p-10 border border-border/40 shadow-sm">
                    <h2 className="text-2xl font-bold text-text-heading font-heading mb-6">Recent Enquiries</h2>
                    <div className="space-y-6">
                        {recentEnquiries && recentEnquiries.length > 0 ? recentEnquiries.map((enquiry) => (
                            <div key={enquiry.id} className="flex items-center gap-4 pb-6 border-b border-border/20 last:border-0 last:pb-0">
                                <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center font-bold text-primary uppercase">
                                    {enquiry.name?.charAt(0) || "U"}
                                </div>
                                <div>
                                    <div className="font-bold text-text-heading text-sm">{enquiry.name} • {enquiry.company || "Individual"}</div>
                                    <div className="text-xs text-text-body/50">
                                        {enquiry.subject || "No subject"} • {new Date(enquiry.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                                <button className="ml-auto text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">View</button>
                            </div>
                        )) : (
                            <div className="text-sm text-text-body/40 py-4 text-center">No recent enquiries found.</div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-[40px] p-10 border border-border/40 shadow-sm">
                    <h2 className="text-2xl font-bold text-text-heading font-heading mb-6">Content Updates</h2>
                    <div className="space-y-6">
                        {recentStudies && recentStudies.length > 0 ? recentStudies.map((study) => (
                            <div key={study.id} className="flex items-center gap-4 pb-6 border-b border-border/20 last:border-0 last:pb-0">
                                <div className="w-10 h-10 rounded-lg bg-primary-muted flex items-center justify-center text-primary">
                                    <FileText size={18} />
                                </div>
                                <div>
                                    <div className="font-bold text-text-heading text-sm">{study.title}</div>
                                    <div className="text-xs text-text-body/50">
                                        Modified recently • {new Date(study.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                                <span className={`ml-auto text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${study.published ? "text-green-500 bg-green-500/10" : "text-amber-500 bg-amber-500/10"
                                    }`}>
                                    {study.published ? "Published" : "Draft"}
                                </span>
                            </div>
                        )) : (
                            <div className="text-sm text-text-body/40 py-4 text-center">No recent content updates.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
