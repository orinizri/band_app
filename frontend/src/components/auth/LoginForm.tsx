import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSchema, LoginSchema } from "../../schemas/AuthSchemas";
import { InputField } from "../../components/form/InputField";
import { authService } from "../../services/authService";
import { AuthUser } from "@/context/AuthContext";
import logoMobile from "../../assets/logo.png";
import JamoveoWelcome from "./shared/JaMoveoWelcome";
import AuthTitle from "./shared/AuthTitle";

interface LoginFormProps {
  onSuccess: (user: AuthUser) => void;
  toggleMode: () => void;
  title?: string;
  isAdmin?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  toggleMode,
  title,
  isAdmin = false,
}): React.ReactElement => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // Get the schema based on the isAdmin prop + the form type
  const schema = getSchema("login", isAdmin || false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await authService.login(data);
      const { user, token } = res.data;
      onSuccess({ ...user, token });
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
          errors.username?.message || "Username must be at least 2 characters"
        }
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        register={register}
        error={errors.password}
        helperText={
          errors.password?.message || "Password must be at least 4 characters"
        }
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
        Log In
      </Button>

      <Typography variant="body2" textAlign="center" fontSize="1rem">
        Don’t have an account?{" "}
        <button
          type="button"
          aria-label="Switch to register form"
          onClick={toggleMode}
          style={{
            fontSize: "inherit",
            background: "none",
            border: "none",
            padding: 0,
            color: theme.palette.primary.main,
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </Typography>
    </Box>
  );
};

export default LoginForm;
