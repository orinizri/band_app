import React from "react";
import { isValid } from "zod";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "../../schemas/AuthSchemas";
import { InputField } from "../../components/form/InputField";
import { authService } from "../../services/authService";
import { AuthUser } from "../../context/AuthContext";
import logoMobile from "../../assets/logo.png";
import { SelectField } from "../form/SelectField";
import { instrumentOptions } from "../../constants/instruments";

interface RegisterFormProps {
  onSuccess: (user: AuthUser) => void;
  toggleMode: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  toggleMode,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      instrument: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const res = await authService.register(data);
      const { user, token } = res.data;
      onSuccess({ ...user, token });
    } catch (err) {
      console.error("Register failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {isMobile && (
        <Box mb={3} textAlign="center">
          <img src={logoMobile} alt="JaMoveo Logo" style={{ maxWidth: 120 }} />
          <Typography variant="body2" color="text.secondary" mt={1}>
            Welcome to JaMoveo
          </Typography>
        </Box>
      )}

      {!isMobile && (
        <Typography variant="body2" color="text.secondary" mb={1}>
          Welcome to JaMoveo
        </Typography>
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
        helperText={
          errors.password?.message || "Password must be at least 6 characters"
        }
      />

      <SelectField
        label="Instrument"
        options={instrumentOptions}
        registration={register("instrument")}
        error={errors.instrument}
      />

      <Button
        disabled={!isValid}
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
        <button
          type="button"
          aria-label="Switch to login form"
          onClick={toggleMode}
          style={{
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
