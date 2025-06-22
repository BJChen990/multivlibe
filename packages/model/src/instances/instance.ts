import { z } from "zod/v4";

/** Schema describing a repository instance. */

export const InstanceSchema = z.object({
        /** Auto-incremented identifier */
        id: z.number(),
        /** Repository this instance belongs to */
        repositoryId: z.number(),
        /** Clone location on disk */
        location: z.string(),
        /** Optional user currently occupying this instance */
        occupiedBy: z.string().optional(),
        /** Creation timestamp */
        created: z.int(),
        /** Last update timestamp */
        updated: z.int(),
});

export type Instance = z.infer<typeof InstanceSchema>;
