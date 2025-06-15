import { createContext, useContext, type ReactNode, useMemo } from 'react';
import { Preconditions } from 'multivlibe-model/utils/preconditions';
import type { RepositoryService } from '../services/repository/repository_service';
import { MockRepositoryClient } from '../services/repository/mock_repository_client';

// Define the services interface
export interface Services {
  repositories: RepositoryService;
}

// Create the context
const ServiceContext = createContext<Services | undefined>(undefined);

// Service provider component
export const ServiceProvider = ({ children }: { children: ReactNode }) => {
  const services = useMemo(() => {
    return {
      repositories: new MockRepositoryClient(),
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
  const { repositories} = useServices();
  return repositories;
};
