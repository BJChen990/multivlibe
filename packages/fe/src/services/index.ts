import { HttpInstanceClient } from "./instance/http_instance_client";
import type { InstanceService } from "./instance/instance_service";
import { MockInstanceClient } from "./instance/mock_instance_client";
import { HttpRepositoryClient } from "./repository/http_repository_client";
import { MockRepositoryClient } from "./repository/mock_repository_client";
import type { RepositoryService } from "./repository/repository_service";

export type Services = {
	repositories: RepositoryService;
	instances: InstanceService;
};

export const createServices = () => {
	return import.meta.env.VITE_API_MODE === "mock"
		? {
				repositories: new MockRepositoryClient(),
				instances: new MockInstanceClient(),
			}
		: {
				repositories: new HttpRepositoryClient(),
				instances: new HttpInstanceClient(),
			};
};
