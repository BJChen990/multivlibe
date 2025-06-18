import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Repository } from "multivlibe-model/repositories/repository";
import type { RequestStatus } from "multivlibe-model/utils/request_status";
import { useRepositoryService } from '@/context/service_context';
import { Button } from "@/components/ui/button";

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
        if (response.code !== 'ok') {
          throw new Error('Failed to load repositories');
        }
        setStatus({ status: "success", data: response.repositories });
      } catch (error) {
        console.error('Failed to load repositories:', error);
        setStatus({ status: "error", error: error as Error });
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
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">Repositories</h3>
        <Link to="/repositories/add">
          <Button>Add Repository</Button>
        </Link>
      </div>
      <div className="mt-4">
        {status.status === "success" && status.data.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No repositories found.</p>
            <Link to="/repositories/add">
              <Button>Add Your First Repository</Button>
            </Link>
          </div>
        ) : (
          <ul className="space-y-2">
            {status.status === "success" &&
              status.data.map((repo) => (
                <li key={repo.id} className="border p-3 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                  <strong className="text-lg">{repo.name}</strong>
                  <p className="text-sm text-gray-600">ID: {repo.id}</p>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
