import { z } from "zod/v4";
import {
  RepositoryCredentialSchema,
  RepositorySchema,
  RepositorySourceSchema,
} from "./repository";

export const AddRepositoryReqSchema = z
  .object({ name: z.string().optional() })
  .and(RepositoryCredentialSchema)
  .and(RepositorySourceSchema);

export type AddRepositoryReq = z.infer<typeof AddRepositoryReqSchema>;

// Response
export const AddRepositorySuccessResSchema = z.object({
  code: z.literal("ok"),
  repository: RepositorySchema,
});
export const AddRepositoryFailureResSchema = z.object({
  code: z.literal("unknown_error"),
});
export const AddRepositoryResSchema = z.union([
  AddRepositorySuccessResSchema,
  AddRepositoryFailureResSchema,
]);

export type AddRepositorySuccessRes = z.infer<
  typeof AddRepositorySuccessResSchema
>;
export type AddRepositoryFailureRes = z.infer<
  typeof AddRepositoryFailureResSchema
>;
export type AddRepositoryRes = z.infer<typeof AddRepositoryResSchema>;
