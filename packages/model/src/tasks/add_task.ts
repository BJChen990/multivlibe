import { z } from "zod/v4";
import { TaskSchema } from "./task";

/** Request payload for creating a new task */
export const AddTaskReqSchema = z.object({
        instanceId: z.number(),
        runner: z.literal("DryRun"),
        title: z.string(),
});
export type AddTaskReq = z.infer<typeof AddTaskReqSchema>;

/** Successful response when task is created */
export const AddTaskSuccessResSchema = z.object({
        code: z.literal("ok"),
        task: TaskSchema,
});
/** Generic failure response */
export const AddTaskFailureResSchema = z.object({
        code: z.literal("unknown_error"),
});
/** Union type for success or failure responses */
export const AddTaskResSchema = z.union([
        AddTaskSuccessResSchema,
        AddTaskFailureResSchema,
]);

export type AddTaskSuccessRes = z.infer<typeof AddTaskSuccessResSchema>;
export type AddTaskFailureRes = z.infer<typeof AddTaskFailureResSchema>;
export type AddTaskRes = z.infer<typeof AddTaskResSchema>;
