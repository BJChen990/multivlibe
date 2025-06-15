# Service

Service defines the capabilities provided by an external system, such as an API with HTTP or a capability from hosting
environment like browser API.

## Convention

Service must have a interface defined as `services/[name]/[name]_service.ts`. For example, `services/repository/repository_service.ts`. 

The corresponding type and model should be defined in the `model` shared package in `[workspace]/packages/model/src/[name]`. For
flexibility, the models are usually broken down into smaller files, like each API will be a separate file in the `model` package,
with their request and response types defined in the same file. For shared types that are used in multiple APIs, they should be
defined in a separate file in the `model` package.

The service must always define a Mock service for providing mocking data for testing.

## Mock Service Implementation

Mock services should follow these conventions:

### File Naming
- Mock implementations should be named `mock_[name]_client.ts` in the same directory as the service interface
- Example: `services/repository/mock_repository_client.ts` for `RepositoryService`

### Class Structure
- Mock class should be named `Mock[ServiceName]Client` (e.g., `MockRepositoryClient`)
- Must implement the service interface to ensure type safety
- Should include a configurable timeout parameter in the constructor (default: 1000ms) to simulate network delays
- Use the `delay` utility from `multivlibe-model/utils/delay` to simulate async operations

### Implementation Pattern
```typescript
import { delay } from 'multivlibe-model/utils/delay';
import { ServiceInterface } from './service_name_service';

export class MockServiceNameClient implements ServiceInterface {
  constructor(private readonly timeout: number = 1000) {}

  async methodName(req: RequestType): Promise<ResponseType> {
    await delay(this.timeout);
    
    // Return mock data that matches the expected response structure
    return {
      // Mock response data
    };
  }
}
```
