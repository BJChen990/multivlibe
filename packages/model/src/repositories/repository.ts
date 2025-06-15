import z from 'zod/v4';

export const RepositorySchema = z.object({
  name: z.string(),
  id: z.string(),
});

export type Repository = z.infer<typeof RepositorySchema>;
