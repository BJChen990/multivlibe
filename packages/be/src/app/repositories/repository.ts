import {
	type Repository,
	RepositorySchema,
} from "multivlibe-model/repositories/repository";
import type { db } from "@/model.js";
import { repositoriesTable } from "./schema.js";

type RepositoryDraft = { name?: string; url: string } & (
	| { credentialType: "email_password"; email: string; password: string }
	| { credentialType: "token"; token: string }
	| { credentialType: "none" }
);

export class RepositoriesRepository {
	constructor(private readonly database: typeof db) {}

	async getAllRepositories(): Promise<Repository[]> {
		const results = await this.database.select().from(repositoriesTable).all();
		return results.map((row) => {
			const { name, id, url, created, updated, ...credentials } = row;
			const params = { name, id, url, created, updated };
			switch (row.credentialType) {
				case "email_password":
					return RepositorySchema.parse({
						...params,
						credentialType: "email_password",
						email: credentials.email,
						password: credentials.password,
					});
				case "token":
					return RepositorySchema.parse({
						...params,
						credentialType: "token",
						token: credentials.token,
					});
				case "none":
					return RepositorySchema.parse({ ...params, credentialType: "none" });
				default:
					throw new Error(`Unknown credential type: ${row.credentialType}`);
			}
		});
	}

	async addRepository(repository: RepositoryDraft): Promise<Repository> {
		const now = Date.now();
		const [record] = await this.database
			.insert(repositoriesTable)
			.values({ ...repository, created: now, updated: now })
			.returning();
		return RepositorySchema.parse(record);
	}
}
