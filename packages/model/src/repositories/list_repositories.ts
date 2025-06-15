import { z } from 'zod';

export const ListRepositoriesReqSchema = z.object({});
export type ListRepositoriesReq = z.infer<typeof ListRepositoriesReqSchema>;

export const RepositorySchema = z.object({
  name: z.string(),
  id: z.string(),
});
export type Repository = z.infer<typeof RepositorySchema>;

export const ListRepositoriesResSchema = z.object({
  repositories: z.array(RepositorySchema),
});
export type ListRepositoriesRes = z.infer<typeof ListRepositoriesResSchema>;
