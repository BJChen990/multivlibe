import { z } from 'zod/v4';
import { RepositorySchema } from './repository';

// Request
export const ListRepositoriesReqSchema = z.object({});
export type ListRepositoriesReq = z.infer<typeof ListRepositoriesReqSchema>;

// Response
export const ListRepositoriesSuccessResSchema = z.object({
  code: z.literal('ok'),
  repositories: z.array(RepositorySchema),
});
export const ListRepositoriesFailureResSchema = z.object({
  code: z.literal('unknown_error'),
});
export const ListRepositoriesResSchema = z.union([
  ListRepositoriesSuccessResSchema,
  ListRepositoriesFailureResSchema,
]);

export type ListRepositoriesSuccessRes = z.infer<typeof ListRepositoriesSuccessResSchema>;
export type ListRepositoriesFailureRes = z.infer<typeof ListRepositoriesFailureResSchema>;
export type ListRepositoriesRes = z.infer<typeof ListRepositoriesResSchema>;
