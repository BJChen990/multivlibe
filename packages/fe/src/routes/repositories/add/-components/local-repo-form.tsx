import type { Control } from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { FormValues } from "../-schema";
import { SimpleFormField } from "./simple-form-field";

export const LocalRepoForm = ({
	control,
}: {
	control: Control<FormValues>;
}) => {
	return (
		<>
			<FormField
				control={control}
				name="path"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Local Repository Path*</FormLabel>
						<FormControl>
							<Input placeholder="/path/to/your/repository" {...field} />
						</FormControl>
						<FormDescription>
							Select a folder containing a Git repository
						</FormDescription>
						<FormMessage />
					</FormItem>
				)}
			/>

			<SimpleFormField
				control={control}
				name="name"
				label="Repository Name"
				type="text"
				placeholder="Optional custom name"
				description="If not provided, a name will be derived from the path"
			/>
		</>
	);
};
