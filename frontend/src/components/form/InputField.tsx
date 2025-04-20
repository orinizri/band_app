import React from "react";
import { TextField } from "@mui/material";
import { FieldError } from "react-hook-form";

interface Props {
  label: string;
  name: string;
  type?: string;
  register: any;
  error?: FieldError;
  helperText?: string;
}

export const InputField: React.FC<Props> = ({
  label,
  name,
  type = "text",
  register,
  error,
  helperText,
}): React.ReactElement => (
  <TextField
    label={label}
    type={type}
    fullWidth
    margin="normal"
    {...register(name)}
    error={!!error}
    helperText={helperText || error?.message}
  />
);
