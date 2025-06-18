import type {
  ListRepositoriesReq,
  ListRepositoriesRes,
} from "multivlibe-model/repositories/list_repositories";
import type {
  AddRepositoryReq,
  AddRepositoryRes,
} from "multivlibe-model/repositories/add_repository";
import type { RepositoryService } from "./repository_service";

export class HttpRepositoryClient implements RepositoryService {
  constructor() {}

  async listRepositories(
    _req: ListRepositoriesReq,
  ): Promise<ListRepositoriesRes> {
    try {
      const response = await fetch(`/api/repositories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as ListRepositoriesRes;
    } catch (err) {
      return { code: "unknown_error" };
    }
  }

  async addRepository(req: AddRepositoryReq): Promise<AddRepositoryRes> {
    try {
      const response = await fetch(`/api/repositories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as AddRepositoryRes;
    } catch (err) {
      return { code: "unknown_error" };
    }
  }
}
