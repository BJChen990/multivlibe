import { ListRepositoriesReq, ListRepositoriesRes } from 'multivlibe-model/repositories/list_repositories';


export interface RepositoryService { 
  listRepositories: (req: ListRepositoriesReq) => Promise<ListRepositoriesRes>;
}
