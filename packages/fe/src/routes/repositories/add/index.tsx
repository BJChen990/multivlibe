import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Preconditions } from 'multivlibe-model/utils/preconditions'
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { HTMLInputTypeAttribute } from 'react';
import { useRepositoryService } from '@/context/service_context';

export const Route = createFileRoute("/repositories/add/")({
  component: AddRepository,
});

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  name: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  token: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const SimpleFormField = ({
  label, required, type, placeholder, control, name, description
}: { label: string, required?: boolean, type?: HTMLInputTypeAttribute, placeholder?: string, control: Control<FormValues>, name: keyof FormValues, description?: string }) => {
  return <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}{required && "*"}</FormLabel>
        <FormControl>
          <Input
            type={type}
            placeholder={placeholder}
            {...field}
          />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
}

function AddRepository() {
  const navigate = useNavigate();
  const repositoryService = useRepositoryService();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: "", name: "", username: "", password: "", token: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const validUserPassword = data.username && data.password;
      const validToken = data.token;
      if ((validToken && validUserPassword)) {
        throw new Error("Please provide either username/password or token, not both.");
      }
      await repositoryService.addRepository({
        url: data.url,
        name: data.name,
        ...(validUserPassword
          ? {
            credentialType: "email_password",
            email: Preconditions.notNull(data.username),
            password: Preconditions.notNull(data.password)
          }
          : validToken
            ? { credentialType: "token", token: Preconditions.notNull(data.token) }
            : { credentialType: "none" }),
      })
      // Navigate back to repositories list
      navigate({ to: "/repositories" });
    } catch (error) {
      console.error("Failed to create repository:", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Add Repository</h1>
        <p className="text-gray-600">Configure a new repository</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <SimpleFormField
            control={form.control}
            name="url"
            label="Repository URL"
            required
            type="url"
            placeholder="https://github.com/username/repository"
          />
          <SimpleFormField
            control={form.control}
            name="name"
            label="Repository Name"
            type="text"
            placeholder="Optional custom name"
            description="If not provided, the URL will be used as the name"
          />

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-3">Credentials (Optional)</h3>
            <div className="space-y-3">
              <SimpleFormField
                control={form.control}
                name="username"
                label="Username"
                type="text"
                placeholder="Username"
              />
              <SimpleFormField
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="Password"
              />
              <div className="text-center text-sm text-gray-500">
                — OR —
              </div>
              <SimpleFormField
                control={form.control}
                name="token"
                label="Access Token"
                type="password"
                placeholder="Personal access token or API key"
              />
            </div>
          </div>
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
