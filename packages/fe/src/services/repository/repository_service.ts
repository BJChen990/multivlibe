import type {
	AddRepositoryReq,
	AddRepositoryRes,
} from "multivlibe-model/repositories/add_repository";
import type {
	ListRepositoriesReq,
	ListRepositoriesRes,
} from "multivlibe-model/repositories/list_repositories";

export interface RepositoryService {
	listRepositories: (req: ListRepositoriesReq) => Promise<ListRepositoriesRes>;
	addRepository: (req: AddRepositoryReq) => Promise<AddRepositoryRes>;
}
