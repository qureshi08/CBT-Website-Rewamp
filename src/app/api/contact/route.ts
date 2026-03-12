import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { resend } from "@/lib/resend";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, company, region, industry, subject, message } = body;

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

        // Phase 2 — Insert into Supabase contact_submissions table
        const { error: dbError } = await supabaseAdmin
            .from("contact_submissions")
            .insert([{ name, email, company, region, industry, subject, message }]);

        if (dbError) {
            console.error("Supabase Error:", dbError);
            return NextResponse.json(
                { error: "Failed to save submission." },
                { status: 500 }
            );
        }

        // Send confirmation email via Resend
        if (process.env.RESEND_API_KEY) {
            await resend.emails.send({
                from: process.env.EMAIL_FROM || "onboarding@resend.dev",
                to: process.env.EMAIL_TO || "muhammadanasq@gmail.com",
                subject: `New Contact Submission: ${subject}`,
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
        }

        console.log("Contact form submission:", {
            name,
            email,
            company,
            region,
            industry,
            subject,
            message,
            timestamp: new Date().toISOString(),
        });

        return NextResponse.json(
            { success: true, message: "Contact form submitted successfully." },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { error: "An unexpected error occurred." },
            { status: 500 }
        );
    }
}
