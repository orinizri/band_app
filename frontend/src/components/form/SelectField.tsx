import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface SelectFieldProps {
  label: string;
  options: { label: string; value: string }[];
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  registration,
  error,
}) => {
  return (
    <TextField
      label={label}
      fullWidth
      margin="normal"
      select
      {...registration}
      error={!!error}
      helperText={error?.message}
    >
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
