import { z } from "zod/v4";
import { InstanceSchema } from "./instance";

/** Request payload for creating a new instance */
export const AddInstanceReqSchema = z.object({
        repositoryId: z.number(),
        location: z.string(),
        occupiedBy: z.string().optional(),
});
export type AddInstanceReq = z.infer<typeof AddInstanceReqSchema>;

/** Successful response when instance is created */
export const AddInstanceSuccessResSchema = z.object({
        code: z.literal("ok"),
        instance: InstanceSchema,
});
/** Generic failure response */
export const AddInstanceFailureResSchema = z.object({
        code: z.literal("unknown_error"),
});
/** Union type for success or failure responses */
export const AddInstanceResSchema = z.union([
        AddInstanceSuccessResSchema,
        AddInstanceFailureResSchema,
]);

export type AddInstanceSuccessRes = z.infer<typeof AddInstanceSuccessResSchema>;
export type AddInstanceFailureRes = z.infer<typeof AddInstanceFailureResSchema>;
export type AddInstanceRes = z.infer<typeof AddInstanceResSchema>;
