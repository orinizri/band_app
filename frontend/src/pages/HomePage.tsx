import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthUser, useAuth } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";
import loginImage from "../assets/login.png";
import registerImage from "../assets/register.png";
import AppLayout from "../layouts/AppLayout";
import WaitingForSong from "../components/rehearsal/RehearsalWaitingForSong";
import AdminDashboard from "../components/admin/AdminDashboard";

const HomePage = (): React.ReactElement => {
  const { user, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  // Handle successful authentication and update AuthContext
  const handleAuthSuccess = (user: AuthUser) => {
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
  if (user.role === "admin")
    return (
      <AppLayout>
        <AdminDashboard />
      </AppLayout>
    );

  // ✅ User is logged in → show main layout
  return (
    <AppLayout>
      <WaitingForSong />
    </AppLayout>
  );
};

export default HomePage;
