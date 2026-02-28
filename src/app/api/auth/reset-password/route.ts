import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { email, otp, newPassword } = await req.json();

        if (!email || !otp || !newPassword) {
            return NextResponse.json({ error: "Missing required identity parameters" }, { status: 400 });
        }

        const user = await db.user.findUnique({
            where: { email }
        });

        if (!user || user.otpCode !== otp || !user.otpExpiry || user.otpExpiry < new Date()) {
            return NextResponse.json({ error: "Invalid or expired security token" }, { status: 401 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        await db.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                otpCode: null,
                otpExpiry: null,
                isVerified: true // Verify the account if they could reset password
            }
        });

        return NextResponse.json({ message: "Access key successfully updated. Portal access restored." }, { status: 200 });

    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json({ error: "System failure during credential update" }, { status: 500 });
    }
}
