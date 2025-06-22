import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const repositoriesTable = sqliteTable("repositories", {
	id: int().primaryKey({ autoIncrement: true }),
	// Optional name of the repository
	name: text(),
	// URL of the git repository
	url: text().notNull().unique(),

	// Credential type: one of 'email_password', 'token', 'none'
	credentialType: text().notNull(),
	email: text(),
	password: text(),
	token: text(),

	// Book keeping fields
	created: int().notNull(),
	updated: int().notNull(),
});
