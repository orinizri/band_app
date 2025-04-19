import React, { useState } from "react";
import { Typography, Container } from "@mui/material";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import musicNote from "../assets/music_note.png";
import { AuthUser, useAuth } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";
import loginImage from "../assets/login.png";
import registerImage from "../assets/register.png";

const HomePage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { login } = useAuth();

  const handleSuccess = (user: AuthUser) => {
    setIsAuthenticated(true);
    login(user);
  };

  if (isAuthenticated) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", py: 8 }}>
        <img
          src={musicNote}
          alt="Waiting for next song..."
          style={{ width: 64, height: 64, marginBottom: 20 }}
        />
        <Typography variant="h5">Waiting for next song…</Typography>
      </Container>
    );
  }

  return (
      <AuthLayout backgroundImage={isLogin ? loginImage : registerImage}>
        {isLogin ? (
          <LoginForm
            onSuccess={handleSuccess}
            toggleMode={() => setIsLogin(false)}
          />
        ) : (
          <RegisterForm
            onSuccess={handleSuccess}
            toggleMode={() => setIsLogin(true)}
          />
        )}
      </AuthLayout>
  );
};

export default HomePage;
