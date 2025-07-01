import { z } from "zod/v4";
import { InstanceSchema } from "./instance";

export const ListInstancesReqSchema = z.object({
  /** Optional list of repository IDs to filter instances */
  repositoryIds: z.array(z.number()).optional(),
});
export type ListInstancesReq = z.infer<typeof ListInstancesReqSchema>;

/** Successful response including all repository instances */
export const ListInstancesSuccessResSchema = z.object({
  code: z.literal("ok"),
  instances: z.array(InstanceSchema),
});
/** Generic failure response */
export const ListInstancesFailureResSchema = z.object({
  code: z.literal("unknown_error"),
});
/** Union type of possible list instances responses */
export const ListInstancesResSchema = z.union([
  ListInstancesSuccessResSchema,
  ListInstancesFailureResSchema,
]);

export type ListInstancesSuccessRes = z.infer<
  typeof ListInstancesSuccessResSchema
>;
export type ListInstancesFailureRes = z.infer<
  typeof ListInstancesFailureResSchema
>;
export type ListInstancesRes = z.infer<typeof ListInstancesResSchema>;
