import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Route as IndexRoute } from "./index";

export const Route = createFileRoute("/repositories/$id")({
  loader: async ({
    params,
    context: {
      services: { repositories },
    },
  }) => {
    const repository = await repositories.getRepositoryDetail({
      id: parseInt(params.id),
    });
    return { repository };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { repository } = Route.useLoaderData();

  if (!repository || repository.code !== "ok") {
    return (
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">Repository Not Found</h3>
        <p className="text-gray-500">The repository could not be loaded.</p>
      </div>
    );
  }

  const repo = repository.repository;

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Repository Detail</h1>
        <p className="text-gray-600 mb-2">ID: {repo.id}</p>
      </div>
      <div className="space-y-2 border rounded-lg p-4 bg-white">
        <div>
          <span className="font-semibold">Name:</span>{" "}
          {repo.name || <span className="text-gray-400">(none)</span>}
        </div>
        <div>
          <span className="font-semibold">Created:</span>{" "}
          {new Date(repo.created).toLocaleString()}
        </div>
        <div>
          <span className="font-semibold">Updated:</span>{" "}
          {new Date(repo.updated).toLocaleString()}
        </div>
        <div>
          <span className="font-semibold">Type:</span> {repo.type}
        </div>
        {repo.type === "url" && (
          <div>
            <span className="font-semibold">URL:</span> {repo.url}
          </div>
        )}
        {repo.type === "local" && (
          <div>
            <span className="font-semibold">Path:</span> {repo.path}
          </div>
        )}
        <div>
          <span className="font-semibold">Credential Type:</span>{" "}
          {repo.credentialType}
        </div>
        {repo.credentialType === "email_password" && (
          <>
            <div>
              <span className="font-semibold">Email:</span> {repo.email}
            </div>
            <div>
              <span className="font-semibold">Password:</span> ******
            </div>
          </>
        )}
        {repo.credentialType === "token" && (
          <div>
            <span className="font-semibold">Token:</span> ******
          </div>
        )}
      </div>
      <div className="mt-6">
        <IndexRoute.Link to="/repositories">
          <Button variant="outline">Back to Repositories</Button>
        </IndexRoute.Link>
      </div>
    </div>
  );
}
