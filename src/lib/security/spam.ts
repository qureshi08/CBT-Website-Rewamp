/**
 * Anti-spam heuristics for the public form endpoints.
 *
 * Design notes (see docs/SECURITY_PLAN.md finding 3):
 * - Nothing here *drops* a submission. Callers get a score plus reasons and
 *   decide what to do; the routes store flagged rows and skip the email send.
 * - The flag threshold is 4. Every *ambiguous* signal is worth 2, so a single
 *   quirky-but-real value (a short all-caps company, a surname like "McDonald")
 *   can never flag a submission on its own — two must agree. Only signals with
 *   no innocent reading are worth 4 or more and flag alone: a filled honeypot
 *   or sub-3-second fill (10), markup in the message body, a link farm, and a
 *   dot-padded Gmail alias (4 each).
 * - False positives cost a real lead's notification email, so the thresholds
 *   deliberately lean towards letting spam through rather than blocking humans.
 */

/** Hidden field name. Bots fill it in; real browsers never show it. */
export const HONEYPOT_FIELD = "website";

/** Minimum plausible time between form render and submit. */
export const MIN_FILL_MS = 3_000;

/** Score at or above which a submission is treated as spam. */
export const SPAM_SCORE_THRESHOLD = 4;

export type SpamVerdict = {
    isSpam: boolean;
    score: number;
    /** Human-readable reasons, joined for the `spam_reason` column. */
    reasons: string[];
};

/**
 * `y` is treated as a vowel throughout. Without that, ordinary words like
 * "rhythms" register a 7-letter consonant run and look like keyboard mash.
 */
const VOWELS = new Set(["a", "e", "i", "o", "u", "y"]);

const URL_PATTERN = /https?:\/\/|www\./gi;
const MARKUP_PATTERN = /<a\s|\[url|\[link|<script/i;

/**
 * Shortest word the letter-frequency signals will look at.
 *
 * Everything shorter is ignored, which is what keeps ordinary input safe:
 * acronyms ("NCTS", "PLC") are legitimately vowel-poor, and short surnames
 * ("McDonald", "O'Brien") are legitimately CamelCase. Generated garbage is
 * almost always one long unbroken token, so it still gets measured.
 */
const MIN_MEASURED_WORD = 8;

/**
 * Capitalisation is measured on a longer minimum than the letter-frequency
 * signals. An 8-letter CamelCase surname ("McDonald") scores 0.375 purely from
 * its two real capitals, and carrying a permanent penalty for a common surname
 * is exactly the false positive this module is trying to avoid. Generated
 * strings run to 15-25 characters, so nothing real is lost.
 */
const MIN_CASE_MEASURED_WORD = 10;

/**
 * Strip diacritics before analysis. Without this, "Müller" loses its ü
 * entirely and reads as consonant-heavy — a false positive on any accented
 * name.
 */
function normalise(value: string): string {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Split into alphabetic words. Measuring per word rather than across the whole
 * string matters: "NCTS HOLDINGS PLC" concatenates to a 6-consonant run that
 * exists in none of its actual words.
 */
function longWords(value: string): string[] {
    return normalise(value)
        .split(/[^A-Za-z]+/)
        .filter((word) => word.length >= MIN_MEASURED_WORD);
}

function vowelRatio(word: string): number {
    const chars = word.toLowerCase().split("");
    return chars.filter((c) => VOWELS.has(c)).length / chars.length;
}

function longestConsonantRun(word: string): number {
    let longest = 0;
    let current = 0;
    for (const c of word.toLowerCase()) {
        if (VOWELS.has(c)) {
            current = 0;
        } else {
            current += 1;
            if (current > longest) longest = current;
        }
    }
    return longest;
}

/**
 * Proportion of adjacent letter pairs *inside a word* that switch case.
 * Random generators produce ~0.4+; real words sit near 0 because their only
 * capital is the first letter — which is why this is measured per word and
 * never across a word boundary.
 */
function caseTransitionRatio(word: string): number {
    let transitions = 0;
    for (let i = 1; i < word.length; i++) {
        const prevUpper = word[i - 1] === word[i - 1].toUpperCase();
        const currUpper = word[i] === word[i].toUpperCase();
        if (prevUpper !== currUpper) transitions += 1;
    }
    return transitions / word.length;
}

type LetterStats = {
    minVowelRatio: number;
    maxConsonantRun: number;
    maxCaseRatio: number;
};

/** Worst-case stats across the long words in a value. */
function letterStats(value: string): LetterStats {
    const words = longWords(value);
    // Sentinels chosen so that "no long words" fires nothing.
    const stats: LetterStats = { minVowelRatio: 1, maxConsonantRun: 0, maxCaseRatio: 0 };
    for (const word of words) {
        stats.minVowelRatio = Math.min(stats.minVowelRatio, vowelRatio(word));
        stats.maxConsonantRun = Math.max(stats.maxConsonantRun, longestConsonantRun(word));
        if (word.length >= MIN_CASE_MEASURED_WORD) {
            stats.maxCaseRatio = Math.max(stats.maxCaseRatio, caseTransitionRatio(word));
        }
    }
    return stats;
}

function countUrls(text: string): number {
    const matches = text.match(URL_PATTERN);
    return matches ? matches.length : 0;
}

/**
 * Gmail ignores dots in the local part entirely, so `s.or.u.to.p.a.c06@gmail.com`
 * and `sorutopac06@gmail.com` are the same mailbox. Heavy dotting is therefore
 * purely cosmetic, and its only practical use is manufacturing an endless supply
 * of distinct-looking senders from one account — which defeats any per-address
 * blocklist or dedup. Two real submissions received by CBT used this (see
 * SECURITY_PLAN finding 3), and it is the one field such a bot cannot clean up
 * without giving up its alias scheme.
 *
 * Scored high enough to flag alone: unlike a vowel-poor company name there is no
 * innocent reading, and a flag is recoverable (the row is stored, only the email
 * is skipped). Deliberately narrow:
 *
 * - Gmail and googlemail only. Everywhere else a dot is a real character, so two
 *   dotted addresses at the same domain are genuinely different mailboxes.
 * - `+tag` suffixes are stripped, never penalised — `sarah+cbt@gmail.com` is a
 *   normal thing for an organised person to do.
 * - Needs 4+ dots *and* a high dot-to-character ratio, so `firstname.lastname`
 *   and `j.smith` stay clean. Both are far below the threshold.
 *
 * Known limit: this does not catch lightly-dotted aliases. The August 2026 sample
 * (`li.teset.el13@gmail.com`) has only two dots and is indistinguishable from a
 * real `firstname.lastname`, so it is left alone rather than risk that pattern.
 */
const GMAIL_DOMAIN = /^(gmail|googlemail)\.com$/i;
const MIN_ALIAS_DOTS = 4;
const MIN_ALIAS_DOT_RATIO = 0.25;

function scoreEmail(value: unknown): { score: number; reasons: string[] } {
    if (typeof value !== "string" || value.trim().length === 0) {
        return { score: 0, reasons: [] };
    }
    const at = value.trim().lastIndexOf("@");
    if (at < 1) return { score: 0, reasons: [] };

    const domain = value.trim().slice(at + 1);
    if (!GMAIL_DOMAIN.test(domain)) return { score: 0, reasons: [] };

    const local = value.trim().slice(0, at).split("+")[0];
    const dots = (local.match(/\./g) ?? []).length;
    const chars = local.replace(/[^A-Za-z0-9]/g, "").length;
    if (dots < MIN_ALIAS_DOTS) return { score: 0, reasons: [] };
    if (dots / Math.max(chars, 1) <= MIN_ALIAS_DOT_RATIO) return { score: 0, reasons: [] };

    return {
        score: 4,
        reasons: [`email: ${dots} dots in gmail local part (delivers to ${local.replace(/\./g, "")})`],
    };
}

/** Letter-frequency signals, shared by identity fields and the message body. */
function scoreLetterStats(label: string, text: string): { score: number; reasons: string[] } {
    const reasons: string[] = [];
    let score = 0;
    const stats = letterStats(text);

    if (stats.minVowelRatio < 0.22) {
        score += 2;
        reasons.push(`${label}: low vowel ratio`);
    }
    if (stats.maxConsonantRun >= 6) {
        score += 2;
        reasons.push(`${label}: long consonant run`);
    }
    if (stats.maxCaseRatio >= 0.3) {
        score += 2;
        reasons.push(`${label}: erratic capitalisation`);
    }

    return { score, reasons };
}

/** Signals for short identity fields — name, company. */
function scoreIdentityField(label: string, value: unknown): { score: number; reasons: string[] } {
    if (typeof value !== "string" || value.trim().length === 0) {
        return { score: 0, reasons: [] };
    }
    const text = value.trim();
    const { score, reasons } = scoreLetterStats(label, text);

    if (countUrls(text) > 0) {
        return {
            score: score + 3,
            reasons: [...reasons, `${label}: contains a URL`],
        };
    }
    return { score, reasons };
}

/** Signals for the free-text message body. */
function scoreMessage(value: unknown): { score: number; reasons: string[] } {
    if (typeof value !== "string" || value.trim().length === 0) {
        return { score: 0, reasons: [] };
    }
    const text = value.trim();
    const { score: letterScore, reasons } = scoreLetterStats("message", text);
    let score = letterScore;

    if (text.length >= 12 && !/\s/.test(text)) {
        score += 2;
        reasons.push("message: no whitespace");
    }

    // A first-contact enquiry legitimately carries several links: a partner
    // introducing themselves might send their site, a case study, a LinkedIn
    // profile and a deck. That exact submission scored 4 under the previous
    // `>= 4` rule and flagged on its own, which is a lost lead — so the
    // flag-alone bar moved to 6 and 3-5 links now merely corroborate.
    const urlCount = countUrls(text);
    if (urlCount >= 6) {
        score += 4;
        reasons.push(`message: ${urlCount} links`);
    } else if (urlCount >= 3) {
        score += 2;
        reasons.push(`message: ${urlCount} links`);
    }

    // Anchors and script tags in a plain-text enquiry box have no innocent
    // reading — this is the exact payload finding 4 is about — so it flags
    // on its own.
    if (MARKUP_PATTERN.test(text)) {
        score += 4;
        reasons.push("message: contains markup");
    }

    return { score, reasons };
}

export type SpamCheckInput = {
    /** Honeypot field value — anything truthy is a bot. */
    honeypot?: unknown;
    /** Epoch ms recorded when the form mounted in the browser. */
    renderedAt?: unknown;
    /** Short identity fields, keyed by label for readable reasons. */
    identityFields?: Record<string, unknown>;
    /** Submitter's email address — checked for disposable-alias patterns. */
    email?: unknown;
    message?: unknown;
};

/**
 * Runs the honeypot, time-trap and content heuristics together.
 *
 * The honeypot and time-trap are scored high enough (10) to flag on their own —
 * a filled hidden field or a sub-3-second fill has no innocent explanation.
 */
export function evaluateSubmission(input: SpamCheckInput): SpamVerdict {
    const reasons: string[] = [];
    let score = 0;

    if (typeof input.honeypot === "string" && input.honeypot.trim().length > 0) {
        score += 10;
        reasons.push("honeypot filled");
    }

    const renderedAt = Number(input.renderedAt);
    if (Number.isFinite(renderedAt) && renderedAt > 0) {
        const elapsed = Date.now() - renderedAt;
        if (elapsed < MIN_FILL_MS) {
            score += 10;
            reasons.push(`submitted in ${Math.max(0, elapsed)}ms`);
        } else if (elapsed < 0 || elapsed > 24 * 60 * 60 * 1000) {
            // Clock skew or a replayed payload — suspicious but not conclusive.
            score += 2;
            reasons.push("implausible form timestamp");
        }
    } else {
        // Field absent entirely: the real forms always send it, so a missing
        // value means the payload wasn't built by our client.
        score += 2;
        reasons.push("missing form timestamp");
    }

    for (const [label, value] of Object.entries(input.identityFields ?? {})) {
        const result = scoreIdentityField(label, value);
        score += result.score;
        reasons.push(...result.reasons);
    }

    const emailResult = scoreEmail(input.email);
    score += emailResult.score;
    reasons.push(...emailResult.reasons);

    const messageResult = scoreMessage(input.message);
    score += messageResult.score;
    reasons.push(...messageResult.reasons);

    return { isSpam: score >= SPAM_SCORE_THRESHOLD, score, reasons };
}
