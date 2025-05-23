import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSchema, RegisterSchema } from "../../schemas/AuthSchemas";
import { InputField } from "../../components/form/InputField";
import { authService } from "../../services/authService";
import { AuthUser } from "../../context/AuthContext";
import logoMobile from "../../assets/logo.png";
import { SelectField } from "../form/SelectField";
import { instrumentOptions } from "../../constants/instruments";
import JamoveoWelcome from "./shared/JaMoveoWelcome";
import AuthTitle from "./shared/AuthTitle";

interface RegisterFormProps {
  onSuccess: (user: AuthUser) => void;
  toggleMode: () => void;
  isAdmin?: boolean;
  title?: string;
}

enum RoleTypes {
  "admin" = "admin",
  "player" = "player",
  "singer" = "singer",
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  toggleMode,
  isAdmin,
  title,
}): React.ReactElement => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // Get the schema based on the isAdmin prop + the form type
  const schema = getSchema("register", isAdmin || false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
      instrument: isAdmin ? undefined : "",
    },
    shouldUnregister: false,
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      if (isAdmin) {
        data.role = RoleTypes.admin;
        data.instrument = undefined; // Remove instrument if admin
      } else if (data.instrument === "vocals") {
        data.role = RoleTypes.singer;
      } else {
        data.role = RoleTypes.player;
      }
      const res = await authService.register({ ...data });
      const { user, token, error } = res.data;
      if (error) {
        console.error("Register error", error);
        return;
      }
      onSuccess({ ...user, token });
    } catch (err) {
      console.error("Register failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {isMobile ? (
        <Box mb={3} textAlign="center">
          <img src={logoMobile} alt="JaMoveo Logo" style={{ maxWidth: 120 }} />
          <JamoveoWelcome />
        </Box>
      ) : (
        <JamoveoWelcome />
      )}

      <AuthTitle
        title={title || "Log In"}
        fontWeight={600}
        mb={2}
        fontSize="2rem"
      />

      <InputField
        label="Username"
        name="username"
        register={register}
        error={errors.username}
        helperText={
          errors.username?.message || "Username must be at least 3 characters"
        }
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        register={register}
        error={errors.password}
        helperText={
          errors.password?.message || "Password must be at least 6 characters"
        }
      />

      {!isAdmin && (
        <SelectField
          label="Instrument"
          options={instrumentOptions}
          registration={register("instrument")}
          error={errors.instrument}
          helperText={errors.instrument?.message || "Instrument is required"}
          onChange={(e) => {
            register("instrument").onChange(e);
          }}
        />
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        sx={{ mt: 2 }}
      >
        Register
      </Button>

      <Typography textAlign="center" fontSize="1rem">
        Already have an account?{" "}
        <button
          type="button"
          aria-label="Switch to login form"
          onClick={toggleMode}
          style={{
            fontSize: "inherit",
            background: "none",
            border: "none",
            padding: 0,
            textDecoration: "none",
            color: theme.palette.primary.main,
            cursor: "pointer",
          }}
        >
          Log in
        </button>
      </Typography>
    </form>
  );
};

export default RegisterForm;
