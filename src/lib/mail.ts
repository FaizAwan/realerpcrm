import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: process.env.MAIL_PORT === "465", // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

interface SendEmailOptions {
    to: string;
    subject: string;
    title: string;
    message: string;
    otp?: string;
    buttonText?: string;
    buttonUrl?: string;
}

export async function sendEmail({ to, subject, title, message, otp, buttonText, buttonUrl }: SendEmailOptions) {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&family=Inter:wght@400;700&display=swap');
            body { font-family: 'Inter', sans-serif; background-color: #F0F4F4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 40px; overflow: hidden; box-shadow: 0 40px 100px rgba(0,0,0,0.05); border: 1px solid #eef2f2; }
            .header { background: #00a99d; padding: 60px 40px; text-align: center; }
            .content { padding: 60px 40px; text-align: center; }
            .logo { width: 64px; height: 64px; background: rgba(255,255,255,0.2); border-radius: 20px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 24px; }
            h1 { font-family: 'Outfit', sans-serif; font-weight: 900; font-style: italic; font-size: 32px; color: #ffffff; margin: 0; text-transform: uppercase; letter-spacing: -1px; }
            .subtitle { color: #e0f2f1; font-size: 14px; font-weight: 700; font-style: italic; margin-top: 8px; opacity: 0.8; }
            h2 { font-family: 'Outfit', sans-serif; font-weight: 900; font-style: italic; font-size: 40px; color: #1a2b2b; margin-bottom: 24px; letter-spacing: -1px; line-height: 1; }
            p { color: #64748b; line-height: 1.8; font-size: 16px; margin-bottom: 32px; font-weight: 500; }
            .otp-container { background: #f8fafc; border: 2px dashed #00a99d; border-radius: 24px; padding: 40px; margin: 32px 0; display: inline-block; width: 80%; }
            .otp-code { font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 56px; color: #00a99d; letter-spacing: 12px; margin: 0; }
            .btn { display: inline-block; padding: 22px 48px; background: #00a99d; color: #ffffff; text-decoration: none; border-radius: 100px; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; box-shadow: 0 20px 40px rgba(0,169,157,0.3); transition: transform 0.3s ease; }
            .footer { background: #f8fafc; padding: 40px; text-align: center; border-top: 1px solid #eef2f2; }
            .footer p { font-size: 12px; color: #94a3b8; margin: 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; }
            .brand { color: #00a99d; font-weight: 900; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m9 12 3-3 3 3"/><path d="M12 9v12"/></svg>
                </div>
                <h1>${title}</h1>
                <div class="subtitle">REALERPCRM INFRASTRUCTURE PROTOCOL</div>
            </div>
            <div class="content">
                <h2>${subject}</h2>
                <p>${message}</p>
                
                ${otp ? `
                    <div class="otp-container">
                        <div class="otp-code">${otp}</div>
                        <p style="margin: 20px 0 0 0; font-size: 12px; color: #94a3b8; letter-spacing: 2px; text-transform: uppercase; font-weight: 900;">SECURITY PROTOCOL ACTIVE</p>
                    </div>
                ` : ''}

                ${buttonText && buttonUrl ? `
                    <a href="${buttonUrl}" class="btn">${buttonText}</a>
                ` : ''}
            </div>
            <div class="footer">
                <p>PROTECTED BY <span class="brand">REALERPCRM</span> ENCRYPTION</p>
                <div style="margin-top: 20px; font-size: 11px; color: #cbd5e1; font-style: italic;">This is an automated system message. Please do not reply.</div>
            </div>
        </div>
    </body>
    </html>
    `;

    try {
        await transporter.sendMail({
            from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
            to,
            subject: `${subject} | RealERPCRM Protocol`,
            html,
        });
        return { success: true };
    } catch (error) {
        console.error("Email send error:", error);
        return { success: false, error };
    }
}
