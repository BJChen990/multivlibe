import { createFileRoute } from "@tanstack/react-router";
import type { Instance } from "multivlibe-model/instances/instance";
import type { Repository } from "multivlibe-model/repositories/repository";
import type { RequestStatus } from "multivlibe-model/utils/request_status";
import { useEffect, useState } from "react";
import {
	useInstanceService,
	useRepositoryService,
} from "@/context/service_context";

export const Route = createFileRoute("/instances/")({
	component: InstancesPage,
});

function InstancesPage() {
	const repositoryService = useRepositoryService();
	const instanceService = useInstanceService();
	const [status, setStatus] = useState<
		RequestStatus<{ repositories: Repository[]; instances: Instance[] }>
	>({
		status: "idle",
	});

	useEffect(() => {
		const loadData = async () => {
			setStatus({ status: "loading" });
			try {
				const [reposRes, instancesRes] = await Promise.all([
					repositoryService.listRepositories({}),
					instanceService.listInstances({}),
				]);
				if (reposRes.code !== "ok" || instancesRes.code !== "ok") {
					throw new Error("Failed to load instances");
				}
				setStatus({
					status: "success",
					data: {
						repositories: reposRes.repositories,
						instances: instancesRes.instances,
					},
				});
			} catch (error) {
				console.error("Failed to load instances", error);
				setStatus({ status: "error", error: error as Error });
			}
		};
		loadData();
	}, [repositoryService, instanceService]);

	if (status.status === "loading") {
		return (
			<div className="p-2">
				<h3>Loading instances...</h3>
			</div>
		);
	}

	if (status.status !== "success") {
		return null;
	}

	const { repositories, instances } = status.data;

	return (
		<div className="p-4 space-y-4">
			<h3 className="text-2xl font-bold">Instances</h3>
			{repositories.map((repo) => {
				const repoInstances = instances.filter(
					(i) => i.repositoryId === repo.id,
				);
				return (
					<div key={repo.id} className="border p-3 rounded-lg">
						<h4 className="font-semibold mb-2">{repo.name}</h4>
						{repoInstances.length === 0 ? (
							<p className="text-gray-500">
								No instance associate to this repository.
							</p>
						) : (
							<ul className="space-y-2">
								{repoInstances.map((inst) => (
									<li key={inst.id} className="border p-2 rounded-md">
										<div className="text-sm">Location: {inst.location}</div>
										<div className="text-sm text-gray-600">
											{inst.occupiedBy
												? `Occupied by task: ${inst.occupiedBy}`
												: "Reserved for user"}
										</div>
									</li>
								))}
							</ul>
						)}
					</div>
				);
			})}
		</div>
	);
}
