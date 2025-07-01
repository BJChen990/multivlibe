import { z } from "zod/v4";

export const RepositorySourceSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("url"), url: z.string() }),
  z.object({ type: z.literal("local"), path: z.string() }),
]);
export const RepositoryCredentialSchema = z.discriminatedUnion(
  "credentialType",
  [
    z.object({
      credentialType: z.literal("email_password"),
      email: z.string(),
      password: z.string(),
    }),
    z.object({
      credentialType: z.literal("token"),
      token: z.string(),
    }),
    z.object({ credentialType: z.literal("none") }),
  ],
);

export type RepositorySource = z.infer<typeof RepositorySourceSchema>;
export type RepositoryCredential = z.infer<typeof RepositoryCredentialSchema>;

export const RepositorySchema = z
  .object({
    name: z.string().optional(),
    id: z.number(),
    created: z.int(),
    updated: z.int(),
  })
  .and(RepositorySourceSchema)
  .and(RepositoryCredentialSchema);

export type Repository = z.infer<typeof RepositorySchema>;
