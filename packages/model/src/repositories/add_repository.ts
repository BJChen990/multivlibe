import { z } from "zod/v4";
import { RepositorySchema } from "./repository";

// Request
export const AddRepositoryReqSchema = z
	.object({
		url: z.string(),
		name: z.string().optional(),
	})
	.and(
		z.discriminatedUnion("credentialType", [
			z.object({
				credentialType: z.literal("email_password"),
				email: z.string(),
				password: z.string(),
			}),
			z.object({
				credentialType: z.literal("token"),
				token: z.string(),
			}),
			z.object({
				credentialType: z.literal("none"),
			}),
		]),
	);

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
