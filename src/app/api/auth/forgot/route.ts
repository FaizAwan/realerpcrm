import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const user = await db.user.findUnique({
            where: { email }
        });

        if (!user) {
            // Return success even if user doesn't exist to prevent email enumeration
            // But for this task, let's keep it simple
            return NextResponse.json({ message: "Recovery protocol initiated if account exists." }, { status: 200 });
        }

        // Generate 6-digit OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        await db.user.update({
            where: { id: user.id },
            data: {
                otpCode: otpCode,
                otpExpiry: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
            }
        });

        await sendEmail({
            to: email,
            subject: "Security Access Recovery",
            title: "Access Override",
            message: "A request for security access recovery was initiated. Use the following dynamic key to override your current credentials and reset your access key.",
            otp: otpCode
        });

        return NextResponse.json({ message: "Security token sent to your work identity." }, { status: 200 });

    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json({ error: "System failure during recovery protocol" }, { status: 500 });
    }
}
