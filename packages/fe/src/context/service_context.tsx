import { Preconditions } from "multivlibe-model/utils/preconditions";
import { createContext, type ReactNode, useContext, useMemo } from "react";
import { HttpInstanceClient } from "../services/instance/http_instance_client";
import type { InstanceService } from "../services/instance/instance_service";
import { MockInstanceClient } from "../services/instance/mock_instance_client";
import { HttpRepositoryClient } from "../services/repository/http_repository_client";
import { MockRepositoryClient } from "../services/repository/mock_repository_client";
import type { RepositoryService } from "../services/repository/repository_service";

// Define the services interface
export interface Services {
	repositories: RepositoryService;
	instances: InstanceService;
}

// Create the context
const ServiceContext = createContext<Services | undefined>(undefined);

// Service provider component
export interface ServiceProviderProps {
	children: ReactNode;
}

export const ServiceProvider = ({ children }: ServiceProviderProps) => {
	const services = useMemo(() => {
		return import.meta.env.VITE_API_MODE === "mock"
			? {
					repositories: new MockRepositoryClient(),
					instances: new MockInstanceClient(),
				}
			: {
					repositories: new HttpRepositoryClient(),
					instances: new HttpInstanceClient(),
				};
	}, []);

	return (
		<ServiceContext.Provider value={services}>
			{children}
		</ServiceContext.Provider>
	);
};

// Hook to use services
export const useServices = (): Services => {
	return Preconditions.notNull(useContext(ServiceContext));
};

// Individual service hooks for convenience
export const useRepositoryService = (): RepositoryService => {
	const { repositories } = useServices();
	return repositories;
};

export const useInstanceService = (): InstanceService => {
	const { instances } = useServices();
	return instances;
};
