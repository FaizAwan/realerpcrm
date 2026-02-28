import { createIndividualHandler } from "@/lib/api-helper";
const handler = createIndividualHandler("recovery");
export const PATCH = handler.PATCH;
export const DELETE = handler.DELETE;
