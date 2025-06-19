import { z } from "zod/v4";

const baseSchema = {
	name: z.string().optional(),
	id: z.number(),
	url: z.url(),
	created: z.int(),
	updated: z.int(),
};

export const RepositorySchema = z.discriminatedUnion("credentialType", [
	z.object({
		...baseSchema,
		credentialType: z.literal("email_password"),
		email: z.string(),
		password: z.string(),
	}),
	z.object({
		...baseSchema,
		credentialType: z.literal("token"),
		token: z.string(),
	}),
	z.object({ ...baseSchema, credentialType: z.literal("none") }),
]);

export type Repository = z.infer<typeof RepositorySchema>;
