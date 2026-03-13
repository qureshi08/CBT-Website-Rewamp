"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    FileText,
    Handshake,
    GraduationCap,
    Package,
    Settings,
    LogOut,
    BarChart3
} from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-surface font-body">
            {/* Sidebar */}
            <aside className="w-64 bg-text-heading text-white flex flex-col fixed h-full z-20">
                <div className="p-8 border-b border-white/10">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white">C</div>
                        <span className="font-heading font-bold text-xl tracking-tight">Admin <span className="text-primary">Portal</span></span>
                    </Link>
                </div>

                <nav className="flex-grow p-6 space-y-2">
                    <AdminNavLink href="/admin" icon={<LayoutDashboard size={18} />} label="Dashboard" active={pathname === "/admin"} />
                    <AdminNavLink href="/admin/clients" icon={<Users size={18} />} label="Clients" active={pathname === "/admin/clients"} />
                    <AdminNavLink href="/admin/case-studies" icon={<FileText size={18} />} label="Case Studies" active={pathname === "/admin/case-studies"} />
                    <AdminNavLink href="/admin/partners" icon={<Handshake size={18} />} label="Partners" active={pathname === "/admin/partners"} />
                    <AdminNavLink href="/admin/batches" icon={<GraduationCap size={18} />} label="CGAP Batches" active={pathname === "/admin/batches"} />
                    <AdminNavLink href="/admin/products" icon={<Package size={18} />} label="Products" active={pathname === "/admin/products"} />
                    <AdminNavLink href="/admin/stats" icon={<BarChart3 size={18} />} label="Homepage Stats" active={pathname === "/admin/stats"} />
                </nav>

                <div className="p-6 border-t border-white/10">
                    <button className="flex items-center gap-3 text-white/60 hover:text-white transition-colors w-full px-4 py-2">
                        <LogOut size={18} />
                        <span className="font-medium text-sm">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow ml-64 p-10">
                {children}
            </main>
        </div>
    );
}

function AdminNavLink({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${active
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
        >
            <span className={`${active ? "text-white" : "text-white/40 group-hover:text-primary"} transition-colors`}>{icon}</span>
            <span className="font-medium text-sm">{label}</span>
        </Link>
    );
}
