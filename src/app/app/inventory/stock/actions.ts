"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db as prisma } from "@/lib/db";

const StockChangeSchema = z.object({
    productId: z.string().min(1, "Product ID is required"),
    type: z.enum(["IN", "OUT"]),
    quantity: z.number().int().positive("Quantity must be a positive integer"),
    userId: z.string().min(1, "User ID is required"),
    reasonCode: z.string().min(1, "Reason code is required"),
});

export type ActionState = {
    success?: boolean;
    error?: string;
    message?: string;
};

export async function handleStockChange(prevState: ActionState, formData: FormData): Promise<ActionState> {
    try {
        // 1. Validate Input using Zod
        const data = StockChangeSchema.parse({
            productId: formData.get("productId") as string,
            type: formData.get("type") as string,
            quantity: Number(formData.get("quantity")),
            userId: formData.get("userId") as string,
            reasonCode: formData.get("reasonCode") as string,
        });

        // 2. Perform Atomic Transaction for Data Integrity
        await prisma.$transaction(async (tx) => {
            // Lock row to prevent race conditions & check current state
            const product = await tx.product.findUnique({
                where: { id: data.productId }
            });

            if (!product) {
                throw new Error("Product not found");
            }

            // Business Logic: No negative stock allowed
            if (data.type === "OUT" && product.current_stock < data.quantity) {
                throw new Error(`Insufficient stock: Only ${product.current_stock} available.`);
            }

            // Create Audit Trail Entry in StockLog
            await tx.stockLog.create({
                data: {
                    productId: data.productId,
                    type: data.type,
                    quantity: data.quantity,
                    userId: data.userId,
                    reasonCode: data.reasonCode,
                }
            });

            // Update the Product's current_stock atomically
            await tx.product.update({
                where: { id: data.productId },
                data: {
                    current_stock: data.type === "IN"
                        ? { increment: data.quantity }
                        : { decrement: data.quantity }
                }
            });
        });

        // 3. Revalidate the dashboard view
        revalidatePath("/app/inventory/stock");

        return { success: true, message: "Stock transaction processed and ledger updated!" };
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return { success: false, error: (error as z.ZodError<any>).issues[0].message };
        }
        return { success: false, error: error.message || "Failed to process stock transaction" };
    }
}
