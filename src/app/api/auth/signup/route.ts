import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { name, email, company, password } = await req.json();

        if (!name || !email || !company || !password) {
            return NextResponse.json(
                { error: "Required fields are missing" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await db.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 400 }
            );
        }

        // Create Tenant
        const slug = company.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        // Ensure slug is unique
        let uniqueSlug = slug;
        let counter = 1;
        while (await db.tenant.findUnique({ where: { slug: uniqueSlug } })) {
            uniqueSlug = `${slug}-${counter}`;
            counter++;
        }

        const tenant = await db.tenant.create({
            data: {
                name: company,
                slug: uniqueSlug,
                plan: "basic"
            }
        });

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Generate OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Create User
        const user = await db.user.create({
            data: {
                username: name,
                email: email,
                password: hashedPassword,
                tenantId: tenant.id,
                role: "admin",
                isVerified: false, // Set to false since we are sending OTP
                otpCode: otpCode,
                otpExpiry: new Date(Date.now() + 1000 * 60 * 60) // 1 hour
            }
        });

        // Send Welcome Email
        const { sendEmail } = await import("@/lib/mail");
        await sendEmail({
            to: email,
            subject: "Identity Verification Required",
            title: "Access Granted",
            message: `Official infrastructure deployment for ${company} is almost complete. Please use the following security token to verify your identity and activate your instance.`,
            otp: otpCode
        });

        return NextResponse.json({
            message: "User registered successfully. Verification token sent.",
            userId: user.id
        }, { status: 201 });

    } catch (error: any) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "An error occurred during registration" },
            { status: 500 }
        );
    }
}
