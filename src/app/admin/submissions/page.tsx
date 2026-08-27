"use client";

/**
 * Inbox for public form submissions. See docs/SECURITY_PLAN.md finding 3.
 *
 * Read plus a spam toggle — no delete. Lead data is the one thing on this site
 * that cannot be recreated from anywhere else, so the destructive path simply
 * does not exist here.
 */

import { Fragment, useCallback, useEffect, useState } from "react";
import {
    Inbox,
    ShieldAlert,
    Search,
    Loader2,
    ChevronDown,
    ChevronRight,
    Check,
    Ban,
    ChevronLeft,
    ChevronRight as ChevronRightIcon,
} from "lucide-react";
import {
    listSubmissions,
    setSubmissionSpam,
    addressHistory,
    type SubmissionRow,
    type AddressHistory,
} from "@/lib/actions/submission-actions";

const PAGE_SIZE = 25;

type Tab = { key: string; label: string; table: string; spam: boolean };

const TABS: Tab[] = [
    { key: "contact", label: "Enquiries", table: "contact_submissions", spam: false },
    { key: "contact-spam", label: "Flagged", table: "contact_submissions", spam: true },
    { key: "partner", label: "Partner enquiries", table: "partner_enquiries", spam: false },
    { key: "partner-spam", label: "Partner flagged", table: "partner_enquiries", spam: true },
];

export default function AdminSubmissions() {
    const [tabKey, setTabKey] = useState<string>("contact");
    const [rows, setRows] = useState<SubmissionRow[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expanded, setExpanded] = useState<string | null>(null);
    const [busyId, setBusyId] = useState<string | null>(null);
    const [history, setHistory] = useState<Record<string, AddressHistory>>({});

    const tab = TABS.find((t) => t.key === tabKey) ?? TABS[0];

    const load = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        const result = await listSubmissions(tab.table, {
            spam: tab.spam,
            page,
            pageSize: PAGE_SIZE,
            search,
        });
        if (result.success) {
            setRows(result.rows);
            setTotal(result.total);
        } else {
            setError(result.error);
            setRows([]);
            setTotal(0);
        }
        setIsLoading(false);
    }, [tab.table, tab.spam, page, search]);

    useEffect(() => {
        load();
    }, [load]);

    // Reset to the first page whenever the tab or the search term changes,
    // otherwise page 3 of one tab lands on an empty page 3 of another.
    useEffect(() => {
        setPage(0);
        setExpanded(null);
    }, [tabKey, search]);

    async function toggleExpand(row: SubmissionRow) {
        const next = expanded === row.id ? null : row.id;
        setExpanded(next);
        if (next && !history[row.email] && row.email) {
            const result = await addressHistory(row.email);
            if (result.success && result.history) {
                setHistory((h) => ({ ...h, [row.email]: result.history! }));
            }
        }
    }

    async function toggleSpam(row: SubmissionRow) {
        setBusyId(row.id);
        const result = await setSubmissionSpam(tab.table, row.id, !row.is_spam);
        setBusyId(null);
        if (!result.success) {
            setError(result.error ?? "Could not update that submission.");
            return;
        }
        // The row no longer belongs in this tab, so drop it locally rather than
        // refetching the whole page.
        setRows((current) => current.filter((r) => r.id !== row.id));
        setTotal((t) => Math.max(0, t - 1));
    }

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    return (
        <div className="space-y-8 font-body">
            <div>
                <h1 className="text-4xl font-bold text-text-heading font-heading mb-2">Submissions</h1>
                <p className="text-text-body/60">
                    Enquiries from the public forms. Flagged items are stored but never emailed —
                    check them for anything the filters got wrong.
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                {TABS.map((t) => {
                    const active = t.key === tabKey;
                    return (
                        <button
                            key={t.key}
                            onClick={() => setTabKey(t.key)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                active
                                    ? "bg-primary text-white"
                                    : "bg-surface text-text-body/70 hover:bg-primary/10 hover:text-primary"
                            }`}
                        >
                            {t.spam ? <ShieldAlert size={16} /> : <Inbox size={16} />}
                            {t.label}
                        </button>
                    );
                })}
            </div>

            <div className="relative max-w-md">
                <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-body/40"
                />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search name, email or company"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:border-primary"
                />
            </div>

            {error && (
                <div className="px-4 py-3 rounded-lg bg-red-50 text-red-600 text-sm" role="alert">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-2xl border border-border overflow-hidden">
                {isLoading ? (
                    <div className="px-8 py-16 flex items-center justify-center text-text-body/40">
                        <Loader2 size={20} className="animate-spin" />
                    </div>
                ) : rows.length === 0 ? (
                    <div className="px-8 py-16 text-center text-text-body/40">
                        {tab.spam ? "Nothing flagged here." : "No submissions yet."}
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead className="bg-surface text-left text-xs uppercase tracking-wider text-text-body/50">
                            <tr>
                                <th className="px-6 py-4 w-8" />
                                <th className="px-6 py-4">Received</th>
                                <th className="px-6 py-4">From</th>
                                <th className="px-6 py-4">Company</th>
                                <th className="px-6 py-4">Subject</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                            {rows.map((row) => {
                                const open = expanded === row.id;
                                const seen = history[row.email];
                                return (
                                    <Fragment key={row.id}>
                                        <tr
                                            className="hover:bg-surface/60 cursor-pointer"
                                            onClick={() => toggleExpand(row)}
                                        >
                                            <td className="px-6 py-4 text-text-body/40">
                                                {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-text-body/70">
                                                {new Date(row.created_at).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-text-heading">{row.name || "—"}</div>
                                                <div className="text-xs text-text-body/50 font-mono">{row.email}</div>
                                            </td>
                                            <td className="px-6 py-4 text-text-body/70">{row.company || "—"}</td>
                                            <td className="px-6 py-4 text-text-body/70">{row.subject || "—"}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleSpam(row);
                                                    }}
                                                    disabled={busyId === row.id}
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 ${
                                                        row.is_spam
                                                            ? "text-primary hover:bg-primary/10"
                                                            : "text-red-500 hover:bg-red-50"
                                                    }`}
                                                >
                                                    {busyId === row.id ? (
                                                        <Loader2 size={13} className="animate-spin" />
                                                    ) : row.is_spam ? (
                                                        <Check size={13} />
                                                    ) : (
                                                        <Ban size={13} />
                                                    )}
                                                    {row.is_spam ? "Not spam" : "Mark spam"}
                                                </button>
                                            </td>
                                        </tr>
                                        {open && (
                                            <tr className="bg-surface/40">
                                                <td />
                                                <td colSpan={5} className="px-6 py-5 space-y-4">
                                                    <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-text-body/60">
                                                        <span>
                                                            <strong className="text-text-body/80">Received:</strong>{" "}
                                                            {new Date(row.created_at).toLocaleString("en-GB")}
                                                        </span>
                                                        {row.region && (
                                                            <span>
                                                                <strong className="text-text-body/80">Region:</strong> {row.region}
                                                            </span>
                                                        )}
                                                        {row.industry && (
                                                            <span>
                                                                <strong className="text-text-body/80">Industry:</strong> {row.industry}
                                                            </span>
                                                        )}
                                                        {seen && (seen.flaggedSubmissions > 0 || seen.rejections > 0) && (
                                                            <span className="text-amber-600">
                                                                <strong>Seen before:</strong>{" "}
                                                                {seen.flaggedSubmissions} flagged, {seen.rejections} rejected
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <div className="text-xs uppercase tracking-wider text-text-body/40 mb-1.5">
                                                            Message
                                                        </div>
                                                        <p className="whitespace-pre-wrap text-text-body leading-relaxed">
                                                            {row.message || "—"}
                                                        </p>
                                                    </div>

                                                    {row.spam_reason && (
                                                        <div>
                                                            <div className="text-xs uppercase tracking-wider text-text-body/40 mb-1.5">
                                                                Why it was flagged
                                                            </div>
                                                            <p className="font-mono text-xs text-text-body/60 leading-relaxed">
                                                                {row.spam_reason}
                                                            </p>
                                                        </div>
                                                    )}

                                                    <a
                                                        href={`mailto:${row.email}`}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="inline-block text-xs font-medium text-primary hover:underline"
                                                    >
                                                        Reply to {row.email}
                                                    </a>
                                                </td>
                                            </tr>
                                        )}
                                    </Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {total > PAGE_SIZE && (
                <div className="flex items-center justify-between text-sm text-text-body/60">
                    <span>
                        {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, total)} of {total}
                    </span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(0, p - 1))}
                            disabled={page === 0}
                            className="p-2 rounded-lg hover:bg-surface disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <span className="font-mono text-xs">
                            {page + 1} / {totalPages}
                        </span>
                        <button
                            onClick={() => setPage((p) => (p + 1 < totalPages ? p + 1 : p))}
                            disabled={page + 1 >= totalPages}
                            className="p-2 rounded-lg hover:bg-surface disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                            <ChevronRightIcon size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
