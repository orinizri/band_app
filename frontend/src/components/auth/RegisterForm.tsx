import React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Typography, MenuItem, TextField, useTheme, useMediaQuery } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "../../schemas/AuthSchemas";
import { InputField } from "../../components/form/InputField";
import { authService } from "../../services/authService";
import { AuthUser } from "../../context/AuthContext";
import logoMobile from "../../assets/logo.png";



interface RegisterFormProps {
  onSuccess: (user: AuthUser) => void;
  toggleMode: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, toggleMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      instrument: "",
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
        <MenuItem value="">Select instrument</MenuItem>
        <MenuItem value="guitar">Guitar</MenuItem>
        <MenuItem value="bass">Bass</MenuItem>
        <MenuItem value="drums">Drums</MenuItem>
        <MenuItem value="keyboard">Keyboard</MenuItem>
        <MenuItem value="vocals">Vocals</MenuItem>
      </TextField>

      <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 2 }}>
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