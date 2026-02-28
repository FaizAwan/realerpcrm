import { createIndividualHandler } from "@/lib/api-helper";
const handler = createIndividualHandler("agency");
export const PATCH = handler.PATCH;
export const DELETE = handler.DELETE;
