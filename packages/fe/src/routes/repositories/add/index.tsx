import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AddRepositoryReqSchema } from "multivlibe-model/repositories/add_repository";
import {
	RepositoryCredentialSchema,
	RepositorySourceSchema,
} from "multivlibe-model/repositories/repository";
import { Preconditions } from "multivlibe-model/utils/preconditions";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRepositoryService } from "@/context/service_context";
import { LocalRepoForm } from "./-components/local-repo-form";
import { UrlRepoForm } from "./-components/url-repo-form";
import { type FormValues, formValuesSchema } from "./-schema";

export const Route = createFileRoute("/repositories/add/")({
	component: AddRepository,
});

function AddRepository() {
	const navigate = useNavigate();
	const repositoryService = useRepositoryService();
	const form = useForm<FormValues>({
		resolver: zodResolver(formValuesSchema),
		defaultValues: {
			type: "url",
			url: "",
			path: "",
			name: "",
			email: "",
			password: "",
			token: "",
		},
	});
	const repoType = useWatch({ control: form.control, name: "type" });
	const onSubmit = async (data: FormValues) => {
		try {
			const { type, url, path, name, email, password, token } = data;
			const source = RepositorySourceSchema.parse(
				type === "url" ? { type: "url", url } : { type: "local", path },
			);
			const hasPassword = email && password;
			Preconditions.assertState(
				!(hasPassword && token),
				"Please provide either username/password or token, not both.",
			);
			const credential = RepositoryCredentialSchema.parse(
				hasPassword
					? { credentialType: "email_password", email, password }
					: token
						? { credentialType: "token", token }
						: { credentialType: "none" },
			);

			const response = await repositoryService.addRepository(
				AddRepositoryReqSchema.parse({ ...source, ...credential, name }),
			);

			if (response.code !== "ok") {
				throw new Error("Failed to add repository");
			}
			navigate({ to: "/repositories" });
		} catch (error) {
			console.error("Failed to create repository:", error);
			form.setError("root", { message: "Failed to add repository" });
		}
	};

	return (
		<div className="p-4 max-w-md mx-auto">
			<div className="mb-6">
				<h1 className="text-2xl font-bold mb-2">Add Repository</h1>
				<p className="text-gray-600">
					Configure a new repository from URL or local folder
				</p>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<Tabs
						value={repoType}
						onValueChange={(value) =>
							form.setValue("type", value as "url" | "local")
						}
					>
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="url">Git URL</TabsTrigger>
							<TabsTrigger value="local">Local Folder</TabsTrigger>
						</TabsList>
						<TabsContent value="url" className="space-y-4">
							<UrlRepoForm control={form.control} />
						</TabsContent>
						<TabsContent value="local" className="space-y-4">
							<LocalRepoForm control={form.control} />
						</TabsContent>
					</Tabs>
					<div className="flex gap-3 pt-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => navigate({ to: "/repositories" })}
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
							{form.formState.isSubmitting ? "Adding..." : "Add Repository"}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
