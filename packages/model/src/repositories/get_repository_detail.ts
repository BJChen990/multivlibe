import { z } from "zod/v4";
import { RepositorySchema } from "./repository";

// Request
export const GetRepositoryDetailReqSchema = z.object({
  id: z.number(),
});
export type GetRepositoryDetailReq = z.infer<typeof GetRepositoryDetailReqSchema>;

// Response
export const GetRepositoryDetailSuccessResSchema = z.object({
  code: z.literal("ok"),
  repository: RepositorySchema,
});
export const GetRepositoryDetailFailureResSchema = z.object({
  code: z.literal("unknown_error"),
});
export const GetRepositoryDetailResSchema = z.union([
  GetRepositoryDetailSuccessResSchema,
  GetRepositoryDetailFailureResSchema,
]);

export type GetRepositoryDetailSuccessRes = z.infer<
  typeof GetRepositoryDetailSuccessResSchema
>;
export type GetRepositoryDetailFailureRes = z.infer<
  typeof GetRepositoryDetailFailureResSchema
>;
export type GetRepositoryDetailRes = z.infer<typeof GetRepositoryDetailResSchema>; 
