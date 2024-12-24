import {
  TextInputProps as $TextInputProps,
  TextInput as $TextInput,
} from "@mantine/core";
import type { FC } from "react";
import { useController } from "react-hook-form";

interface TextInputProps extends Omit<$TextInputProps, "value"> {
  name: string;
}

export const TextInput: FC<TextInputProps> = ({ name, onChange, ...props }) => {
  const {
    field: { value, onChange: fieldOnChange },
    fieldState,
  } = useController({ name });
  return (
    <$TextInput
      {...props}
      error={fieldState.error?.message}
      onChange={(e) => {
        fieldOnChange(e);
        onChange?.(e);
      }}
      value={value}
    />
  );
};
