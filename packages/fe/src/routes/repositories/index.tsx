import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Repository } from "multivlibe-model/repositories/list_repositories";
import type { RequestStatus } from "multivlibe-model/utils/request_status";
import { useRepositoryService } from '@/context/service_context';

export const Route = createFileRoute("/repositories/")({
  component: Index,
});

function Index() {
  const repositoryService = useRepositoryService();
  const [status, setStatus] = useState<RequestStatus<Repository[]>>({ status: "idle" });

  useEffect(() => {
    const loadRepositories = async () => {
      setStatus({ status: "loading" });
      try {
        const response = await repositoryService.listRepositories({});
        setStatus({ status: "success", data: response.repositories });
      } catch (error) {
        console.error('Failed to load repositories:', error);
        setStatus({ status: "error", error });
      }
    };
    loadRepositories();
  }, [repositoryService]);

  if (status.status === "loading") {
    return (
      <div className="p-2">
        <h3>Loading repositories...</h3>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3>Repositories</h3>
      <div className="mt-4">
        {status.status === "success" && status.data.length === 0 ? (
          <p>No repositories found.</p>
        ) : (
          <ul className="space-y-2">
            {status.status === "success" &&
              status.data.map((repo) => (
                <li key={repo.id} className="border p-2 rounded">
                  <strong>{repo.name}</strong> (ID: {repo.id})
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
