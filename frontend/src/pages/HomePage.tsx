import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthUser, useAuth } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";
import loginImage from "../assets/login.png";
import registerImage from "../assets/register.png";
import WaitingForSong from "../components/rehearsal/RehearsalWaitingForSong";
import AdminDashboard from "../components/admin/AdminDashboard";
import RoleToggle from "../components/shared/RoleToggle";

const HomePage = (): React.ReactElement => {
  const { user, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAuthSuccess = (user: AuthUser) => {
    // This function is called when the user successfully logs in or registers
    // Including token inside the AuthUser object
    login(user);
  };

  if (!user) {
    return (
      <AuthLayout backgroundImage={isLogin ? loginImage : registerImage}>
        {isLogin ? (
          <LoginForm
            onSuccess={handleAuthSuccess}
            toggleMode={() => setIsLogin(false)}
            title={isAdmin ? "Admin Log In" : "Log In"}
            isAdmin={isAdmin}
          />
        ) : (
          <RegisterForm
            onSuccess={handleAuthSuccess}
            toggleMode={() => setIsLogin(true)}
            title={isAdmin ? "Create Admin Account" : "Create Account"}
            isAdmin={isAdmin}
          />
        )}
        <RoleToggle
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          isLogin={isLogin}
        />
      </AuthLayout>
    );
  }
  if (user.role === "admin")
    return (
      <AuthLayout>
        <AdminDashboard />
      </AuthLayout>
    );

  // ✅ User is logged in → show main layout
  return (
    <AuthLayout>
      <WaitingForSong />
    </AuthLayout>
  );
};

export default HomePage;
