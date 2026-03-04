import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

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

        // TODO: Phase 2 — Send confirmation email via Resend
        // await resend.emails.send({
        //   from: process.env.EMAIL_FROM,
        //   to: process.env.EMAIL_TO,
        //   subject: `New Contact: ${subject}`,
        //   html: `...`
        // });

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
