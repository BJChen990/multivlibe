import type { HTMLInputTypeAttribute } from "react";
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

export const SimpleFormField = ({
  label,
  required,
  type,
  placeholder,
  control,
  name,
  description,
}: {
  label: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  control: Control<FormValues>;
  name: keyof FormValues;
  description?: string;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && "*"}
          </FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
