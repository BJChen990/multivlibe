import type { Control } from "react-hook-form";
import type { FormValues } from "../-schema";
import { SimpleFormField } from "./simple-form-field";

export const UrlRepoForm = ({ control }: { control: Control<FormValues> }) => {
  return (
    <>
      <SimpleFormField
        control={control}
        name="url"
        label="Repository URL"
        required
        type="url"
        placeholder="https://github.com/username/repository"
      />

      <SimpleFormField
        control={control}
        name="name"
        label="Repository Name"
        type="text"
        placeholder="Optional custom name"
        description="If not provided, a name will be derived from the URL"
      />

      <div className="border-t pt-4">
        <h3 className="text-lg font-medium mb-3">Credentials (Optional)</h3>
        <div className="space-y-3">
          <SimpleFormField
            control={control}
            name="email"
            label="Email"
            type="text"
            placeholder="Email"
          />
          <SimpleFormField
            control={control}
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
          />
          <div className="text-center text-sm text-gray-500">— OR —</div>
          <SimpleFormField
            control={control}
            name="token"
            label="Access Token"
            type="password"
            placeholder="Personal access token or API key"
          />
        </div>
      </div>
    </>
  );
};
