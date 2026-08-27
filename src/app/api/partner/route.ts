import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { guardFormSubmission, insertWithSpamFlags } from "@/lib/security/form-guard";

/**
 * The response bots see when they trip the origin, rate-limit or Turnstile
 * layers. Identical to a real success so there is nothing to tune against.
 * See docs/SECURITY_PLAN.md finding 3.
 */
function fakeSuccess() {
    return NextResponse.json(
        { success: true, message: "Partner registration submitted successfully." },
        { status: 200 }
    );
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            company, contactName, email, region, industry, partnershipType, message,
            // Anti-abuse fields added by PartnerForm — never rendered to a human.
            website: honeypot, renderedAt, turnstileToken,
        } = body;

        // Anti-abuse gate runs before validation so that malformed payloads
        // still consume the attacker's rate-limit budget.
        const decision = await guardFormSubmission(request, {
            scope: "partner",
            honeypot,
            renderedAt,
            turnstileToken,
            identityFields: { company, contactName },
            message,
        });

        if (decision.action === "reject") {
            return fakeSuccess();
        }
        const isSpam = decision.action === "flag";

        // Validate required fields
        if (!company || !contactName || !email || !partnershipType) {
            return NextResponse.json(
                {
                    error:
                        "Company, contact name, email, and partnership type are required.",
                },
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

        // Validate partnership type
        const validTypes = ["technology", "delivery", "referral"];
        if (!validTypes.includes(partnershipType)) {
            return NextResponse.json(
                { error: "Invalid partnership type." },
                { status: 400 }
            );
        }

        // Phase 2 — Insert into Supabase partner_enquiries table. Flagged
        // enquiries are stored too — see "flag, don't drop" in
        // docs/SECURITY_PLAN.md finding 3.
        const { error: dbError } = await insertWithSpamFlags(
            "partner_enquiries",
            {
                company,
                contact_name: contactName,
                email,
                region,
                industry,
                partnership_type: partnershipType as
                    | "technology"
                    | "delivery"
                    | "referral",
                message,
            },
            { isSpam, reason: decision.action === "flag" ? decision.reason : undefined }
        );

        if (dbError) {
            console.error("Supabase Error:", dbError);
            return NextResponse.json(
                { error: "Failed to save partner enquiry." },
                { status: 500 }
            );
        }

        // Stored for the audit trail, but never emailed.
        if (isSpam) {
            return fakeSuccess();
        }

        // Send notification email via Resend
        if (process.env.RESEND_API_KEY) {
            await resend.emails.send({
                from: process.env.EMAIL_FROM || "onboarding@resend.dev",
                to: process.env.EMAIL_TO || "muhammadanasq@gmail.com",
                subject: `New Partner Registration: ${company}`,
                html: `
                    <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                        <h2 style="color: #00994D; margin-top: 0;">New Partner Registration</h2>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                        <p><strong>Company:</strong> ${company}</p>
                        <p><strong>Contact Name:</strong> ${contactName}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Region:</strong> ${region || "Not specified"}</p>
                        <p><strong>Industry:</strong> ${industry || "Not specified"}</p>
                        <p><strong>Partnership Type:</strong> ${partnershipType}</p>
                        <div style="margin-top: 25px; padding: 20px; background: #E6F5ED; border-left: 4px solid #00994D; border-radius: 4px;">
                            <p style="margin: 0 0 10px 0; font-weight: bold; font-size: 14px; text-transform: uppercase; color: #666;">Message/Interest:</p>
                            <p style="white-space: pre-wrap; margin: 0; line-height: 1.6;">${message || "No message provided"}</p>
                        </div>
                    </div>
                `,
            });
        }

        console.log("Partner registration:", {
            company,
            contactName,
            email,
            partnershipType,
            message,
            timestamp: new Date().toISOString(),
        });

        return NextResponse.json(
            { success: true, message: "Partner registration submitted successfully." },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { error: "An unexpected error occurred." },
            { status: 500 }
        );
    }
}
