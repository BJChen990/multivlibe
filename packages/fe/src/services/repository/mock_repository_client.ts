import type {
	AddRepositoryReq,
	AddRepositoryRes,
} from "multivlibe-model/repositories/add_repository";
import type {
	GetRepositoryDetailReq,
	GetRepositoryDetailRes,
} from "multivlibe-model/repositories/get_repository_detail";
import type {
	ListRepositoriesReq,
	ListRepositoriesRes,
} from "multivlibe-model/repositories/list_repositories";
import type {
	Repository,
	RepositoryCredential,
	RepositorySource,
} from "multivlibe-model/repositories/repository";
import { delay } from "multivlibe-model/utils/delay";
import type { RepositoryService } from "./repository_service";

const DEFAULT_DATE = new Date("2023-01-01T00:00:00Z").valueOf();

export class MockRepositoryClient implements RepositoryService {
	private repositories: Repository[] = [
		{
			id: 1,
			name: "Repo1",
			type: "url",
			url: "https://github.com/user/repo1.git",
			created: DEFAULT_DATE,
			updated: DEFAULT_DATE,
			credentialType: "none",
		},
		{
			id: 2,
			name: "Repo2",
			type: "url",
			url: "https://github.com/user/repo2.git",
			created: DEFAULT_DATE,
			updated: DEFAULT_DATE,
			credentialType: "none",
		},
	];
	private nextId = 3;

	constructor(private readonly timeout: number = 1000) {}

	async listRepositories(
		_req: ListRepositoriesReq,
	): Promise<ListRepositoriesRes> {
		await delay(this.timeout);

		return {
			code: "ok",
			repositories: this.repositories,
		};
	}

	async addRepository(req: AddRepositoryReq): Promise<AddRepositoryRes> {
		await delay(this.timeout);

		const now = Date.now();
		const repoSource: RepositorySource =
			req.type === "url"
				? { type: "url", url: req.url }
				: { type: "local", path: req.path };
		const credentials: RepositoryCredential =
			req.credentialType === "email_password"
				? {
						credentialType: "email_password",
						email: req.email,
						password: req.password,
					}
				: req.credentialType === "token"
					? { credentialType: "token", token: req.token }
					: { credentialType: "none" };

		const repository = {
			id: this.nextId++,
			name: req.name,
			created: now,
			updated: now,
			...repoSource,
			...credentials,
		};

		this.repositories.push(repository);
		return { code: "ok", repository };
	}

	async getRepositoryDetail(
		req: GetRepositoryDetailReq,
	): Promise<GetRepositoryDetailRes> {
		await delay(this.timeout);
		const repository = this.repositories.find((r) => r.id === req.id);
		return repository ? { code: "ok", repository } : { code: "unknown_error" };
	}
}
