import { NextRequest, NextResponse } from "next/server";

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

        // TODO: Phase 2 — Insert into Supabase partner_enquiries table
        // const { data, error } = await supabaseAdmin
        //   .from("partner_enquiries")
        //   .insert({
        //     company,
        //     contact_name: contactName,
        //     email,
        //     partnership_type: partnershipType,
        //     message,
        //   });

        // TODO: Phase 2 — Send notification email via Resend
        // await resend.emails.send({
        //   from: process.env.EMAIL_FROM,
        //   to: process.env.EMAIL_TO,
        //   subject: `New Partner Registration: ${company}`,
        //   html: `...`
        // });

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
