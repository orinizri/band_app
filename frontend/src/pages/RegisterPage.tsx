import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import registerImage from "../assets/register.png";
import logoMobile from "../assets/logo.png";
import { authService } from "../services/authService";
import AuthLayout from "../layouts/AuthLayout";
import { registerSchema, RegisterSchema } from "../schemas/AuthSchemas";
import { InputField } from "../components/form/InputField";

const RegisterPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const res = await authService.register(data);
      console.log("✅ Registered!", res.data);
      // TODO: redirect to login or show success toast
    } catch (err) {
      console.error("❌ Registration failed", err);
    }
  };

  return (
    <AuthLayout backgroundImage={registerImage}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {isMobile && (
          <Box mb={3} textAlign="center">
            <img src={logoMobile} alt="Logo" style={{ maxWidth: 120 }} />
          </Box>
        )}

        <Typography variant="h4" fontWeight={600} mb={1}>
          Create Account
        </Typography>
        <Typography variant="body1" mb={3} color="text.secondary">
          Join the band and start rehearsing 🎶
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

        <TextField
          label="Instrument"
          fullWidth
          margin="normal"
          select
          {...register("instrument")}
          error={!!errors.instrument}
          helperText={errors.instrument?.message}
        >
          <MenuItem value="guitar">Guitar</MenuItem>
          <MenuItem value="bass">Bass</MenuItem>
          <MenuItem value="drums">Drums</MenuItem>
          <MenuItem value="keyboard">Keyboard</MenuItem>
          <MenuItem value="vocals">Vocals</MenuItem>
        </TextField>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
        >
          Register
        </Button>

        <Typography textAlign="center" mt={2}>
          Already have an account?{" "}
          <a href="/login" style={{ textDecoration: "none", color: theme.palette.primary.main }}>
            Log in
          </a>
        </Typography>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;