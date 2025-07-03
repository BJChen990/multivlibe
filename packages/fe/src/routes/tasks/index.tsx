import { createFileRoute, Link } from "@tanstack/react-router";
import type { Task } from "multivlibe-model/tasks/task";
import type { RequestStatus } from "multivlibe-model/utils/request_status";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTaskService } from "@/context/service_context";

export const Route = createFileRoute("/tasks/")({
  component: TasksPage,
});

function TasksPage() {
  const taskService = useTaskService();
  const [status, setStatus] = useState<RequestStatus<Task[]>>({
    status: "idle",
  });

  useEffect(() => {
    const loadTasks = async () => {
      setStatus({ status: "loading" });
      try {
        const response = await taskService.listTasks({});
        if (response.code !== "ok") {
          throw new Error("Failed to load tasks");
        }
        setStatus({ status: "success", data: response.tasks });
      } catch (error) {
        console.error("Failed to load tasks:", error);
        setStatus({ status: "error", error: error as Error });
      }
    };
    loadTasks();
  }, [taskService]);

  if (status.status === "loading") {
    return (
      <div className="p-2">
        <h3>Loading tasks...</h3>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">Tasks</h3>
        <Link to="/tasks/add">
          <Button>Add Task</Button>
        </Link>
      </div>
      <div className="mt-4">
        {status.status === "success" && status.data.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No tasks found.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {status.status === "success" &&
              status.data.map((task) => (
                <li
                  key={task.id}
                  className="border p-3 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                >
                  <strong className="text-lg">{task.title}</strong>
                  <p className="text-sm text-gray-600">ID: {task.id}</p>
                  <p className="text-sm text-gray-600">
                    Instance ID: {task.instanceId}
                  </p>
                  <p className="text-sm text-gray-600">Runner: {task.runner}</p>
                  <p className="text-sm text-gray-600">
                    Created: {new Date(task.created).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Updated: {new Date(task.updated).toLocaleString()}
                  </p>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
