import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { guardFormSubmission, insertWithSpamFlags } from "@/lib/security/form-guard";

/**
 * The response bots see when they trip the origin, rate-limit or Turnstile
 * layers. Identical to a real success so there is nothing to tune against.
 * See docs/SECURITY_PLAN.md finding 3.
 */
function fakeSuccess() {
    return NextResponse.json(
        { success: true, message: "Contact form submitted successfully." },
        { status: 200 }
    );
}

// Create reusable transporter using Gmail SMTP
function createTransporter() {
    return nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,   // your Gmail address
            pass: process.env.SMTP_PASS,   // your Gmail App Password
        },
    });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            name, email, company, region, industry, subject, message, intent,
            // Anti-abuse fields added by ContactForm — never rendered to a human.
            website: honeypot, renderedAt, turnstileToken,
        } = body;

        // Anti-abuse gate runs before validation so that malformed payloads
        // still consume the attacker's rate-limit budget.
        const decision = await guardFormSubmission(request, {
            scope: "contact",
            honeypot,
            renderedAt,
            turnstileToken,
            identityFields: { name, company },
            message,
        });

        if (decision.action === "reject") {
            return fakeSuccess();
        }
        const isSpam = decision.action === "flag";

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "Name, email, subject, and message are required." },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email address." },
                { status: 400 }
            );
        }

        // Save to Supabase. Flagged submissions are stored too — see
        // "flag, don't drop" in docs/SECURITY_PLAN.md finding 3.
        const { error: dbError } = await insertWithSpamFlags(
            "contact_submissions",
            {
                name,
                email,
                subject,
                message,
                ...(company && { company }),
                ...(region && { region }),
                ...(industry && { industry }),
            },
            { isSpam, reason: decision.action === "flag" ? decision.reason : undefined }
        );

        if (dbError) {
            console.error("Supabase Error:", dbError);
            return NextResponse.json(
                { error: "Failed to save submission. Please try again." },
                { status: 500 }
            );
        }

        // Stored for the audit trail, but never emailed — that is the whole
        // point of the exercise: keep the inbox clean without losing the record.
        if (isSpam) {
            return fakeSuccess();
        }

        // Send email via Gmail SMTP (Nodemailer)
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            const intentStr = intent ? intent.toLowerCase() : "";

            // Determine recipient based on intent/subject
            let emailTo = process.env.EMAIL_TO || "book_a_call@convergentbt.com";
            if (
                intentStr.includes("power bi") ||
                intentStr.includes("pbi") ||
                intentStr === "custom-visual" ||
                subject?.toLowerCase().includes("power bi")
            ) {
                emailTo = process.env.EMAIL_TO_PBI || "pbi_contact_form@convergentbt.com";
            }

            const intentPrefix = intent ? `[${intent}] ` : "";
            const transporter = createTransporter();

            const { accepted, rejected } = await transporter.sendMail({
                from: `"CBT Website" <${process.env.SMTP_USER}>`,
                to: emailTo,
                replyTo: email,
                subject: `${intentPrefix}New Contact Submission: ${subject}`,
                html: `
                    <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                        <h2 style="color: #2D7D46; margin-top: 0;">New Contact Form Submission</h2>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Company:</strong> ${company || "Not provided"}</p>
                        <p><strong>Region:</strong> ${region || "Not specified"}</p>
                        <p><strong>Industry:</strong> ${industry || "Not specified"}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                        ${intent ? `<p><strong>Intent:</strong> ${intent}</p>` : ""}
                        <div style="margin-top: 25px; padding: 20px; background: #F9F9F9; border-left: 4px solid #2D7D46; border-radius: 4px;">
                            <p style="margin: 0 0 10px 0; font-weight: bold; font-size: 14px; text-transform: uppercase; color: #666;">Message:</p>
                            <p style="white-space: pre-wrap; margin: 0; line-height: 1.6;">${message}</p>
                        </div>
                        <p style="font-size: 12px; color: #999; margin-top: 30px; text-align: center;">
                            This message was sent from the CBT Website contact form.
                        </p>
                    </div>
                `,
            });

            console.log("Email sent to:", accepted);
            if (rejected.length > 0) console.warn("Rejected:", rejected);
        } else {
            console.warn("SMTP credentials not set — email not sent.");
        }

        return NextResponse.json(
            { success: true, message: "Contact form submitted successfully." },
            { status: 200 }
        );
    } catch (err) {
        console.error("Contact form error:", err);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
