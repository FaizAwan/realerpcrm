import { createIndividualHandler } from "@/lib/api-helper";
const handler = createIndividualHandler("chartOfAccount");
export const PATCH = handler.PATCH;
export const DELETE = handler.DELETE;
