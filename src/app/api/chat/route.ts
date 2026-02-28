import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json(
            { error: "OpenAI API Key not configured. Please add OPENAI_API_KEY to your .env file." },
            { status: 500 }
        );
    }

    try {
        const { messages, context } = await request.json();

        // System instruction for the Real Estate CRM
        const systemPrompt = `
            You are RealERPCRM Copilot, an expert AI assistant for a Real Estate CRM platform in Pakistan.
            Your goal is to help users manage their projects, leads, bookings, and finances.
            
            Context about the current state:
            ${JSON.stringify(context)}
            
            Guidelines:
            - Be professional, concise, and helpful.
            - Use real estate terminology relevant to the Pakistani market (e.g., Marla, Kanal, Allotment, Installments).
            - If data is provided in context, use it for specific analysis.
            - If asked for financial advice, provide data-backed insights based on the context.
            - Format your responses using markdown for better readability.
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview", // High quality reasoning for real estate analysis using AI
            messages: [
                { role: "system", content: systemPrompt },
                ...messages.map((m: any) => ({
                    role: m.role,
                    content: m.content,
                })),
            ],
            temperature: 0.7,
        });

        const assistantMessage = response.choices[0].message.content;

        return NextResponse.json({ role: "assistant", content: assistantMessage });

    } catch (error: any) {
        console.error("OpenAI API Error:", error);
        return NextResponse.json(
            { error: "Failed to process request: " + error.message },
            { status: 500 }
        );
    }
}
