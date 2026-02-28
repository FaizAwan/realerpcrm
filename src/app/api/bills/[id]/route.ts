import { createIndividualHandler } from "@/lib/api-helper";

const handler = createIndividualHandler("bill");

export const PATCH = handler.PATCH;
export const DELETE = handler.DELETE;
