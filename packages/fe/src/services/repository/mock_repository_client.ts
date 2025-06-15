import { ListRepositoriesReq, ListRepositoriesRes } from 'multivlibe-model/repositories/list_repositories';
import { delay } from 'multivlibe-model/utils/delay';
import { RepositoryService } from './repository_service';

export class MockRepositoryClient implements RepositoryService {
  constructor(private readonly timeout: number = 1000) {}

  async listRepositories(req: ListRepositoriesReq): Promise<ListRepositoriesRes> {
    await delay(this.timeout);

    // Mock implementation of the listRepositories method
    return {
      repositories: [
        { id: "1", name: "Repo1" },
        { id: "2", name: "Repo2" },
      ],
    };
  }
}
