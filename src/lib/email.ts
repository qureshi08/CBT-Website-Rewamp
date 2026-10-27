import { ConfidentialClientApplication } from "@azure/msal-node";

/**
 * Microsoft Graph (application permissions) mail sender.
 *
 * Required environment variables:
 *   MAIL_MS_CLIENT_ID     – app registration's Application (client) ID
 *   MAIL_MS_TENANT_ID     – app registration's Directory (tenant) ID
 *   MAIL_MS_CLIENT_SECRET – app registration's client secret value
 *   MAIL_MS_USER_ID       – mailbox to send as, e.g. no-reply@convergentbt.com
 *                           (the app's Mail.Send permission should be scoped to
 *                           this mailbox via an Exchange Online Application
 *                           Access Policy)
 *
 * Replaces Gmail SMTP (nodemailer) and Resend. The CBT org's Microsoft 365
 * Security Defaults policy blocks basic/SMTP AUTH tenant-wide (535 5.7.139),
 * so a password-based sender always fails. Graph's application-permission flow
 * uses OAuth2 client credentials, which Security Defaults doesn't touch, and
 * a Global/Exchange admin grants consent once rather than per-send.
 *
 * Mirrors the approach used by the CBT Recruitment Portal — single wrapper,
 * single mailbox, one consent.
 */

const msalClient = new ConfidentialClientApplication({
    auth: {
        clientId: process.env.MAIL_MS_CLIENT_ID ?? "",
        authority: `https://login.microsoftonline.com/${process.env.MAIL_MS_TENANT_ID ?? ""}`,
        clientSecret: process.env.MAIL_MS_CLIENT_SECRET ?? "",
    },
});

async function getGraphToken(): Promise<string> {
    const result = await msalClient.acquireTokenByClientCredential({
        scopes: ["https://graph.microsoft.com/.default"],
    });
    if (!result?.accessToken) {
        throw new Error("Failed to acquire Microsoft Graph access token");
    }
    return result.accessToken;
}

const toRecipient = (address: string) => ({
    emailAddress: { address: address.trim() },
});

export type MailAttachment = {
    filename: string;
    content: Buffer | string;
    contentType?: string;
};

export type MailOptions = {
    to: string | string[];
    cc?: string | string[];
    replyTo?: string;
    subject: string;
    html: string;
    attachments?: MailAttachment[];
};

function toList(value: string | string[] | undefined): string[] {
    if (!value) return [];
    if (Array.isArray(value)) return value.map((v) => v.trim()).filter(Boolean);
    return value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
}

/** True when every required MAIL_MS_* env var is present. */
export function isGraphMailConfigured(): boolean {
    return Boolean(
        process.env.MAIL_MS_CLIENT_ID &&
            process.env.MAIL_MS_TENANT_ID &&
            process.env.MAIL_MS_CLIENT_SECRET &&
            process.env.MAIL_MS_USER_ID
    );
}

/**
 * Sends one email via the Microsoft Graph API, using application permissions.
 * Throws on failure — callers should catch to keep a failed send from taking
 * the whole request down with it.
 */
export async function sendMail(options: MailOptions): Promise<void> {
    const to = toList(options.to);
    const cc = toList(options.cc);

    if (to.length === 0) {
        throw new Error("sendMail: no recipients");
    }

    const message: Record<string, unknown> = {
        subject: options.subject,
        body: { contentType: "HTML", content: options.html },
        toRecipients: to.map(toRecipient),
        ccRecipients: cc.map(toRecipient),
    };

    if (options.replyTo) {
        message.replyTo = [toRecipient(options.replyTo)];
    }

    if (options.attachments?.length) {
        message.attachments = options.attachments.map((att) => ({
            "@odata.type": "#microsoft.graph.fileAttachment",
            name: att.filename,
            contentType: att.contentType || "application/octet-stream",
            contentBytes: (Buffer.isBuffer(att.content)
                ? att.content
                : Buffer.from(att.content)
            ).toString("base64"),
        }));
    }

    const token = await getGraphToken();
    const sender = process.env.MAIL_MS_USER_ID ?? "";
    const res = await fetch(
        `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message, saveToSentItems: true }),
        }
    );

    if (!res.ok) {
        throw new Error(
            `Graph sendMail failed (${res.status}): ${await res.text()}`
        );
    }
}
