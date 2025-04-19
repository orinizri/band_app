import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { loginSchema, LoginSchema } from "../schemas/AuthSchemas";
import { InputField } from "../components/form/InputField";
import loginImage from "../assets/login.png";
import logoMobile from "../assets/logo.png";
import { authService } from "../services/authService";
import AuthLayout from "../layouts/AuthLayout";

const LoginPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await authService.login(data);
      console.log("✅ Logged in!", res.data);
      // TODO: store token, redirect
    } catch (err) {
      console.error("❌ Login failed", err);
    }
  };

  return (
    <AuthLayout backgroundImage={loginImage}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {isMobile && (
          <Box mb={3} textAlign="center">
            <img src={logoMobile} alt="JaMoveo Logo" style={{ maxWidth: 120 }} />
          </Box>
        )}

        <Typography variant="h4" fontWeight={600} mb={1}>
          Log In
        </Typography>
        <Typography variant="body1" mb={3} color="text.secondary">
          Welcome back! Let’s jam 🎵
        </Typography>

        <InputField
          label="Username"
          name="username"
          register={register}
          error={errors.username}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
        >
          Log In
        </Button>

        <Typography textAlign="center" mt={2}>
          Don’t have an account?{" "}
          <a href="/register" style={{ textDecoration: "none", color: theme.palette.primary.main }}>
            Register
          </a>
        </Typography>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;