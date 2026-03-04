import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { resend } from "@/lib/resend";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { company, contactName, email, partnershipType, message } = body;

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

        // Phase 2 — Insert into Supabase partner_enquiries table
        const { error: dbError } = await supabaseAdmin
            .from("partner_enquiries")
            .insert([
                {
                    company,
                    contact_name: contactName,
                    email,
                    partnership_type: partnershipType as
                        | "technology"
                        | "delivery"
                        | "referral",
                    message,
                },
            ]);

        if (dbError) {
            console.error("Supabase Error:", dbError);
            return NextResponse.json(
                { error: "Failed to save partner enquiry." },
                { status: 500 }
            );
        }

        // Send notification email via Resend
        if (process.env.RESEND_API_KEY) {
            await resend.emails.send({
                from: process.env.EMAIL_FROM || "onboarding@resend.dev",
                to: process.env.EMAIL_TO || "muhammadanasq@gmail.com",
                subject: `New Partner Registration: ${company}`,
                html: `
                    <div style="font-family: sans-serif; color: #333;">
                        <h2 style="color: #2D7D46;">New Partner Registration</h2>
                        <p><strong>Company:</strong> ${company}</p>
                        <p><strong>Contact Name:</strong> ${contactName}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Partnership Type:</strong> ${partnershipType}</p>
                        <div style="margin-top: 20px; padding: 15px; background: #F2F2F2; border-left: 4px solid #2D7D46;">
                            <p style="margin: 0;"><strong>Message/Interest:</strong></p>
                            <p style="white-space: pre-wrap;">${message || "No message provided"}</p>
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
