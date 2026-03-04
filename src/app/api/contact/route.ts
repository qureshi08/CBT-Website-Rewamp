import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { resend } from "@/lib/resend";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, company, subject, message } = body;

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
            .insert([{ name, email, company, subject, message }]);

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
                    <div style="font-family: sans-serif; color: #333;">
                        <h2 style="color: #2D7D46;">New Contact Form Submission</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Company:</strong> ${company || "Not provided"}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                        <div style="margin-top: 20px; padding: 15px; background: #F2F2F2; border-left: 4px solid #2D7D46;">
                            <p style="margin: 0;"><strong>Message:</strong></p>
                            <p style="white-space: pre-wrap;">${message}</p>
                        </div>
                    </div>
                `,
            });
        }

        console.log("Contact form submission:", {
            name,
            email,
            company,
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
