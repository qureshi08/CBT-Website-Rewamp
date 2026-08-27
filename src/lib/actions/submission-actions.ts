"use server";

/**
 * Server actions for reading and triaging public form submissions.
 * See docs/SECURITY_PLAN.md findings 1 and 3.
 *
 * `contact_submissions` and `partner_enquiries` are deliberately absent from
 * ALLOWED_TABLES in admin-actions.ts — the generic CRUD action must never be a
 * route to lead data, and it exposes `delete`. These purpose-built actions are
 * the only way in: read, and flip the spam flag. There is no delete, by design.
 *
 * Every action calls requireAdmin() first, because it throws and the catch below
 * converts that into the standard { success: false, error } shape. The proxy is
 * not a sufficient boundary for server actions — see require-admin.ts.
 */

import { requireAdmin } from "@/lib/auth/require-admin";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type SubmissionTable = "contact_submissions" | "partner_enquiries";

const TABLES: SubmissionTable[] = ["contact_submissions", "partner_enquiries"];

/** The address column differs per table; everything else is shared. */
function assertTable(table: string): SubmissionTable {
    if (!TABLES.includes(table as SubmissionTable)) {
        throw new Error(`Unknown submissions table: ${table}`);
    }
    return table as SubmissionTable;
}

export type SubmissionRow = {
    id: string;
    created_at: string;
    email: string;
    name: string;
    company: string | null;
    subject: string | null;
    message: string | null;
    region: string | null;
    industry: string | null;
    is_spam: boolean;
    spam_reason: string | null;
};

export type ListResult =
    | { success: true; rows: SubmissionRow[]; total: number }
    | { success: false; error: string };

/**
 * One page of submissions, newest first.
 *
 * `spam` selects the tab rather than filtering it out: the flagged list has to
 * be readable, because that is what makes a false positive recoverable.
 */
export async function listSubmissions(
    table: string,
    options: { spam: boolean; page?: number; pageSize?: number; search?: string }
): Promise<ListResult> {
    try {
        await requireAdmin();
        const target = assertTable(table);

        const page = Math.max(0, options.page ?? 0);
        const pageSize = Math.min(100, Math.max(1, options.pageSize ?? 25));
        const from = page * pageSize;

        let query = supabaseAdmin
            .from(target)
            .select("*", { count: "exact" })
            .eq("is_spam", options.spam)
            .order("created_at", { ascending: false })
            .range(from, from + pageSize - 1);

        const search = options.search?.trim();
        if (search) {
            // Escape PostgREST's or() delimiters so a search term cannot break
            // out of the filter expression.
            const safe = search.replace(/[,()"\\]/g, " ");
            const nameColumn = target === "contact_submissions" ? "name" : "contact_name";
            query = query.or(
                `email.ilike.%${safe}%,${nameColumn}.ilike.%${safe}%,company.ilike.%${safe}%`
            );
        }

        const { data, error, count } = await query;
        if (error) {
            console.error("[submissions] read failed:", error);
            return { success: false, error: "Could not load submissions." };
        }

        const rows = (data ?? []).map((row: Record<string, unknown>) => ({
            id: String(row.id),
            created_at: String(row.created_at),
            email: String(row.email ?? ""),
            // partner_enquiries calls it contact_name; normalise for the UI.
            name: String(row.name ?? row.contact_name ?? ""),
            company: (row.company as string) ?? null,
            subject: (row.subject as string) ?? (row.partnership_type as string) ?? null,
            message: (row.message as string) ?? null,
            region: (row.region as string) ?? null,
            industry: (row.industry as string) ?? null,
            is_spam: Boolean(row.is_spam),
            spam_reason: (row.spam_reason as string) ?? null,
        }));

        return { success: true, rows, total: count ?? rows.length };
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return { success: false, error: message };
    }
}

/**
 * Manual override of the spam flag.
 *
 * This is the point of the whole feature: the heuristics will eventually be
 * wrong about someone, and a human needs to be able to say so. The override is
 * recorded in `spam_reason` rather than clearing it, so the original machine
 * verdict survives for threshold tuning — a corrected false positive is the most
 * valuable row in the table.
 */
export async function setSubmissionSpam(
    table: string,
    id: string,
    isSpam: boolean
): Promise<{ success: boolean; error?: string }> {
    try {
        const admin = await requireAdmin();
        const target = assertTable(table);

        const { data: existing, error: readError } = await supabaseAdmin
            .from(target)
            .select("spam_reason")
            .eq("id", id)
            .single();

        if (readError) {
            console.error("[submissions] read-before-update failed:", readError);
            return { success: false, error: "Could not find that submission." };
        }

        const stamp = `[${new Date().toISOString().slice(0, 10)}] marked ${
            isSpam ? "spam" : "not spam"
        } by ${admin.email}`;
        const previous = (existing as { spam_reason?: string | null })?.spam_reason;
        const spam_reason = previous ? `${previous} | ${stamp}` : stamp;

        const { error } = await supabaseAdmin
            .from(target)
            .update({ is_spam: isSpam, spam_reason: spam_reason.slice(-1000) })
            .eq("id", id);

        if (error) {
            console.error("[submissions] update failed:", error);
            return { success: false, error: "Could not update that submission." };
        }
        return { success: true };
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return { success: false, error: message };
    }
}

export type AddressHistory = {
    flaggedSubmissions: number;
    rejections: number;
};

/**
 * How often this address has been turned away before, across both the stored
 * submissions and the abuse log.
 *
 * Advisory only — deliberately not fed back into scoring. A single false
 * positive would otherwise compound: flag a real lead once and every later
 * attempt inherits the penalty, invisibly to them.
 */
export async function addressHistory(
    email: string
): Promise<{ success: boolean; history?: AddressHistory; error?: string }> {
    try {
        await requireAdmin();
        const address = email.trim();
        if (!address) return { success: true, history: { flaggedSubmissions: 0, rejections: 0 } };

        const [contact, partner, abuse] = await Promise.all([
            supabaseAdmin
                .from("contact_submissions")
                .select("id", { count: "exact", head: true })
                .eq("email", address)
                .eq("is_spam", true),
            supabaseAdmin
                .from("partner_enquiries")
                .select("id", { count: "exact", head: true })
                .eq("email", address)
                .eq("is_spam", true),
            supabaseAdmin
                .from("form_abuse_log")
                .select("id", { count: "exact", head: true })
                .eq("email", address),
        ]);

        return {
            success: true,
            history: {
                flaggedSubmissions: (contact.count ?? 0) + (partner.count ?? 0),
                // The abuse log only exists once 0004 has been run; treat an
                // error as "no data" rather than failing the whole lookup.
                rejections: abuse.error ? 0 : abuse.count ?? 0,
            },
        };
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return { success: false, error: message };
    }
}
