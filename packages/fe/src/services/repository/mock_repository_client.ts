import type { ListRepositoriesReq, ListRepositoriesRes } from 'multivlibe-model/repositories/list_repositories';
import type { AddRepositoryReq, AddRepositoryRes } from 'multivlibe-model/repositories/add_repository';
import type { Repository } from 'multivlibe-model/repositories/repository';
import { delay } from 'multivlibe-model/utils/delay';
import type { RepositoryService } from './repository_service';

export class MockRepositoryClient implements RepositoryService {
  private static readonly GIT_NAME_REGEX = /\/([^/]+)(?:\.git)?$/;

  private repositories: Repository[] = [
    { id: "1", name: "Repo1" },
    { id: "2", name: "Repo2" },
  ];
  private nextId = 3;

  constructor(private readonly timeout: number = 1000) { }

  async listRepositories(_req: ListRepositoriesReq): Promise<ListRepositoriesRes> {
    await delay(this.timeout);

    return {
      code: "ok",
      repositories: this.repositories,
    };
  }

  async addRepository(req: AddRepositoryReq): Promise<AddRepositoryRes> {
    await delay(this.timeout);

    try {
      // Extract repository name from request - use provided name or derive from URL
      const repositoryName = req.name || this.extractNameFromUrl(req.url);
      if (!repositoryName) {
        throw new Error("Repository name is required and could not be derived from URL.");
      }

      // Create new repository
      const repository = { id: this.nextId.toString(), name: repositoryName, };

      // Add to the repositories list
      this.repositories.push(repository);
      this.nextId++;

      return { code: "ok", repository, };
    } catch (error) {
      return { code: "unknown_error", };
    }
  }

  private extractNameFromUrl(url: string): string | undefined {
    // Extract repository name from URL (e.g., from GitHub URL)
    const match = url.match(MockRepositoryClient.GIT_NAME_REGEX);
    return match ? match[1] : undefined;
  }
}
