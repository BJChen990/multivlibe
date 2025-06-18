import {
  RepositorySchema,
  type Repository,
} from "multivlibe-model/repositories/repository";
import type { db } from "../../model.js";
import { repositoriesTable } from "./schema.js";

export class RepositoriesRepository {
  constructor(private readonly database: typeof db) {}

  async getAllRepositories(): Promise<Repository[]> {
    const results = await this.database.select().from(repositoriesTable).all();
    return results.map((row) => {
      const { name, id, url, created, updated, ...credentials } = row;
      const sharedContent = { name, id, url, created, updated };
      switch (row.credentialType) {
        case "email_password":
          return RepositorySchema.parse({
            ...sharedContent,
            credentialType: "email_password",
            email: credentials.email,
            password: credentials.password,
          });
        case "token":
          return RepositorySchema.parse({
            ...sharedContent,
            credentialType: "token",
            token: credentials.token,
          });
        case "none":
          return RepositorySchema.parse({
            ...sharedContent,
            credentialType: "none",
          });
        default:
          throw new Error(`Unknown credential type: ${row.credentialType}`);
      }
    });
  }

  async addRepository(
    repository: { name?: string; url: string } & (
      | { credentialType: "email_password"; email: string; password: string }
      | { credentialType: "token"; token: string }
      | { credentialType: "none" }
    ),
  ): Promise<Repository> {
    const now = Date.now();
    const sharedContent = {
      name: repository.name,
      url: repository.url,
      created: now,
      updated: now,
    };
    switch (repository.credentialType) {
      case "email_password":
        return RepositorySchema.parse(
          await this.database
            .insert(repositoriesTable)
            .values({
              ...sharedContent,
              credentialType: "email_password",
              email: repository.email,
              password: repository.password,
            })
            .returning(),
        );
      case "token":
        return RepositorySchema.parse(
          await this.database
            .insert(repositoriesTable)
            .values({
              ...sharedContent,
              credentialType: "token",
              token: repository.token,
            })
            .returning(),
        );
      case "none":
        return RepositorySchema.parse(
          await this.database
            .insert(repositoriesTable)
            .values({
              ...sharedContent,
              credentialType: "none",
            })
            .returning(),
        );
    }
  }
}
