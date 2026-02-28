import { createIndividualHandler } from "@/lib/api-helper";
const handler = createIndividualHandler("journal");
export const PATCH = handler.PATCH;
export const DELETE = handler.DELETE;
