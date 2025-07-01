import { z } from "zod/v4";
import { TaskSchema } from "./task";

/** Request for listing tasks */
export const ListTasksReqSchema = z.object({
  /** Optional list of instance IDs to filter tasks */
  instanceIds: z.array(z.number()).optional(),
});
export type ListTasksReq = z.infer<typeof ListTasksReqSchema>;

/** Successful response including all tasks */
export const ListTasksSuccessResSchema = z.object({
  code: z.literal("ok"),
  tasks: z.array(TaskSchema),
});
/** Generic failure response */
export const ListTasksFailureResSchema = z.object({
  code: z.literal("unknown_error"),
});
/** Union type of possible list tasks responses */
export const ListTasksResSchema = z.union([
  ListTasksSuccessResSchema,
  ListTasksFailureResSchema,
]);

export type ListTasksSuccessRes = z.infer<typeof ListTasksSuccessResSchema>;
export type ListTasksFailureRes = z.infer<typeof ListTasksFailureResSchema>;
export type ListTasksRes = z.infer<typeof ListTasksResSchema>;
