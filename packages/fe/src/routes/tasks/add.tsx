import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { Instance } from "multivlibe-model/instances/instance";
import type { Repository } from "multivlibe-model/repositories/repository";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useInstanceService,
  useRepositoryService,
  useTaskService,
} from "@/context/service_context";

const formValuesSchema = z.object({
  repositoryId: z.number({ required_error: "Repository is required" }),
  instanceId: z.union([z.number(), z.literal("new")]),
  title: z.string().min(1, "Title is required"),
  runner: z.literal("DryRun"),
  prompt: z.string().min(1, "Prompt is required"),
});
type FormValues = z.infer<typeof formValuesSchema>;

export const Route = createFileRoute("/tasks/add")({
  component: AddTask,
});

function AddTask() {
  const navigate = useNavigate();
  const taskService = useTaskService();
  const repositoryService = useRepositoryService();
  const instanceService = useInstanceService();

  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [instances, setInstances] = useState<Instance[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [loadingInstances, setLoadingInstances] = useState(true);
  const [repoError, setRepoError] = useState<string | null>(null);
  const [instanceError, setInstanceError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formValuesSchema),
    defaultValues: {
      repositoryId: undefined,
      instanceId: undefined,
      title: "",
      runner: "DryRun",
      prompt: "",
    },
  });

  // Fetch repositories
  useEffect(() => {
    setLoadingRepos(true);
    repositoryService
      .listRepositories({})
      .then((res) => {
        if (res.code === "ok") {
          setRepositories(res.repositories);
        } else {
          setRepoError("Failed to load repositories");
        }
      })
      .catch(() => setRepoError("Failed to load repositories"))
      .finally(() => setLoadingRepos(false));
  }, [repositoryService]);

  // Fetch all instances
  useEffect(() => {
    setLoadingInstances(true);
    instanceService
      .listInstances({})
      .then((res) => {
        if (res.code === "ok") {
          setInstances(res.instances);
        } else {
          setInstanceError("Failed to load instances");
        }
      })
      .catch(() => setInstanceError("Failed to load instances"))
      .finally(() => setLoadingInstances(false));
  }, [instanceService]);

  // Filter instances by selected repository
  const selectedRepoId = form.watch("repositoryId");
  const filteredInstances = instances.filter(
    (i) => i.repositoryId === selectedRepoId,
  );

  const onSubmit = async (data: FormValues) => {
    try {
      // If "new" instance, you might want to handle instance creation here
      // For now, just send the selected instanceId or handle accordingly
      const req = {
        instanceId: data.instanceId === "new" ? undefined : data.instanceId,
        runner: data.runner,
        title: data.title,
        prompt: data.prompt,
        repositoryId: data.repositoryId,
      };
      // Remove repositoryId from req if not needed by BE
      const response = await taskService.addTask(req as any);
      if (response.code !== "ok") {
        throw new Error("Failed to add task");
      }
      navigate({ to: "/tasks" });
    } catch (error) {
      form.setError("root", { message: "Failed to add task" });
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Add Task</h1>
        <p className="text-gray-600">Create a new task for an instance</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="repositoryId">
              Repository
            </Label>
            <Select
              value={
                form.watch("repositoryId")
                  ? String(form.watch("repositoryId"))
                  : ""
              }
              onValueChange={(val) => {
                if (val) {
                  form.setValue("repositoryId", Number(val));
                  form.setValue("instanceId", undefined as any); // reset instance when repo changes
                }
              }}
              disabled={loadingRepos}
            >
              <SelectTrigger id="repositoryId" className="w-full">
                <SelectValue placeholder="Select a repository" />
              </SelectTrigger>
              <SelectContent>
                {repositories.map((repo) => (
                  <SelectItem key={repo.id} value={repo.id.toString()}>
                    {repo.name || `Repo #${repo.id}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {repoError && (
              <div className="text-red-500 text-sm">{repoError}</div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="instanceId">
              Instance
            </Label>
            <Select
              value={
                form.watch("instanceId") ? String(form.watch("instanceId")) : ""
              }
              onValueChange={(val) => {
                if (val === "new") {
                  form.setValue("instanceId", "new");
                } else if (val) {
                  form.setValue("instanceId", Number(val));
                }
              }}
              disabled={!selectedRepoId || loadingInstances}
            >
              <SelectTrigger id="instanceId" className="w-full">
                <SelectValue placeholder="Select an instance" />
              </SelectTrigger>
              <SelectContent>
                {filteredInstances.map((inst) => (
                  <SelectItem key={inst.id} value={inst.id.toString()}>
                    ID: {inst.id} - {inst.location}
                  </SelectItem>
                ))}
                <SelectItem value="new">New Instance</SelectItem>
              </SelectContent>
            </Select>
            {instanceError && (
              <div className="text-red-500 text-sm">{instanceError}</div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">
              Title
            </Label>
            <Input
              id="title"
              type="text"
              {...form.register("title")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="prompt">
              Prompt
            </Label>
            <Textarea
              id="prompt"
              {...form.register("prompt")}
              placeholder='Prompt'
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="runner">
              Runner
            </Label>
            <Select
              value={form.watch("runner")}
              onValueChange={(val) => form.setValue("runner", val as any)}
            >
              <SelectTrigger id="runner" className="w-full">
                <SelectValue placeholder="Select a runner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DryRun">DryRun</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: "/tasks" })}
              disabled={form.formState.isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="flex-1"
            >
              {form.formState.isSubmitting ? "Adding..." : "Add Task"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
