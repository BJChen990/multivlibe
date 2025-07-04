import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const repositoriesTable = sqliteTable("repositories", {
  id: int().primaryKey({ autoIncrement: true }),
  // Optional name of the repository
  name: text(),
  // Type of repository: 'url' or 'local'
  type: text().notNull().default("url"),
  // URL of the git repository (for type: 'url')
  url: text(),
  // Local path to the repository (for type: 'local')
  path: text(),

  // Credential type: one of 'email_password', 'token', 'none'
  credentialType: text().notNull(),
  email: text(),
  password: text(),
  token: text(),

  // Book keeping fields
  created: int().notNull(),
  updated: int().notNull(),
});
