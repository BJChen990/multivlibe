import { eq, type InferSelectModel } from "drizzle-orm";
import {
	type Repository,
	RepositorySchema,
} from "multivlibe-model/repositories/repository";
import { Preconditions } from "multivlibe-model/utils/preconditions";
import type { db } from "@/model.js";
import { repositoriesTable } from "./schema.js";

type RepositoryDraft = { name?: string } & (
	| { type: "url"; url: string }
	| { type: "local"; path: string }
) &
	(
		| { credentialType: "email_password"; email: string; password: string }
		| { credentialType: "token"; token: string }
		| { credentialType: "none" }
	);

export class RepositoriesRepository {
	constructor(private readonly database: typeof db) {}

	private getRepoSource(row: InferSelectModel<typeof repositoriesTable>) {
		if (row.type === "url") {
			return { type: "url" as const, url: Preconditions.notNull(row.url) };
		} else if (row.type === "local") {
			return { type: "local" as const, path: Preconditions.notNull(row.path) };
		}
		throw new Error(`Unknown repository type: ${row.type}`);
	}

	async getAllRepositories(): Promise<Repository[]> {
		const results = await this.database.select().from(repositoriesTable).all();
		return results.map((row) => {
			const { name, id, created, updated, ...credentials } = row;
			const commonParams = { name, id, created, updated };
			const repoSource = this.getRepoSource(row);

			switch (row.credentialType) {
				case "email_password":
					return RepositorySchema.parse({
						...repoSource,
						...commonParams,
						credentialType: "email_password",
						email: credentials.email,
						password: credentials.password,
					});
				case "token":
					return RepositorySchema.parse({
						...repoSource,
						...commonParams,
						credentialType: "token",
						token: credentials.token,
					});
				case "none":
					return RepositorySchema.parse({
						...repoSource,
						...commonParams,
						credentialType: "none",
					});
				default:
					throw new Error(`Unknown credential type: ${row.credentialType}`);
			}
		});
	}

	async getRepositoryDetail(id: number): Promise<Repository> {
		return RepositorySchema.parse(
			await this.database
				.select()
				.from(repositoriesTable)
				.where(eq(repositoriesTable.id, id))
				.get(),
		);
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
