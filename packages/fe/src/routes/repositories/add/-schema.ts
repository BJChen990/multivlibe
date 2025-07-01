import { z } from "zod/v4";

export const formValuesSchema = z.object({
  type: z.enum(["url", "local"]),
  url: z.string().optional(),
  path: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  token: z.string().optional(),
});

export type FormValues = z.infer<typeof formValuesSchema>;
