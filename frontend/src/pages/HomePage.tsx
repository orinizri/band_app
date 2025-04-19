import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";
import loginImage from "../assets/login.png";
import registerImage from "../assets/register.png";
import AppLayout from "../layouts/AppLayout";
import WaitingForSong from "../components/rehearsal/RehearsalWaitingForSong";

const HomePage: React.FC = () => {
  const { user, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthSuccess = (user: any) => {
    login(user);
  };

  if (!user) {
    return (
      <AuthLayout backgroundImage={isLogin ? loginImage : registerImage}>
        {isLogin ? (
          <LoginForm
            onSuccess={handleAuthSuccess}
            toggleMode={() => setIsLogin(false)}
          />
        ) : (
          <RegisterForm
            onSuccess={handleAuthSuccess}
            toggleMode={() => setIsLogin(true)}
          />
        )}
      </AuthLayout>
    );
  }

  // ✅ User is logged in → show main layout
  return (
    <AppLayout>
      <WaitingForSong />
    </AppLayout>
  );
};

export default HomePage;
