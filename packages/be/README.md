### API Endpoints

The backend implements two main endpoints for repository management:

- `GET /repositories` - Lists all repositories
- `POST /repositories` - Creates a new repository

### Implementation Details

1. **Backend Structure**
   - `packages/be/src/app/[services]/entrypoint.ts` - Contains the API endpoint implementations
   - `packages/be/src/app/[services]/repository.ts` - Contains the persistence logic
   - `packages/be/src/app/[services]/schema.ts` - Contains the service schema definitions

2. **Request/Response Types**
   - Uses Zod schemas from `multivlibe-model` package for validation
   - Proper error handling with structured response types

3. **Data Storage**
   - Using SQLite for local storage
