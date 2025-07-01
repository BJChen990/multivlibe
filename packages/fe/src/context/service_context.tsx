import { Preconditions } from "multivlibe-model/utils/preconditions";
import { createContext, type ReactNode, useContext } from "react";
import type { InstanceService } from "../services/instance/instance_service";
import type { RepositoryService } from "../services/repository/repository_service";

// Define the services interface
export interface Services {
	repositories: RepositoryService;
	instances: InstanceService;
}

// Create the context
export const ServiceContext = createContext<Services | undefined>(undefined);

// Service provider component
export interface ServiceProviderProps {
	children: ReactNode;
}

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
