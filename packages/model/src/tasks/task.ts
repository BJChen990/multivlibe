import { z } from "zod/v4";

/** Schema describing a task that runs on a repository instance. */
export const TaskSchema = z.object({
        /** Auto-incremented identifier */
        id: z.number(),
        /** Instance this task is attached to */
        instanceId: z.number(),
        /** Runner implementation executing this task */
        runner: z.literal("DryRun"),
        /** Title provided by the runner describing the task */
        title: z.string(),
        /** Creation timestamp */
        created: z.int(),
        /** Last update timestamp */
        updated: z.int(),
});

export type Task = z.infer<typeof TaskSchema>;
