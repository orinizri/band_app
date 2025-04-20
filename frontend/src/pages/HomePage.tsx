import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthUser, useAuth } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";
import loginImage from "../assets/login.png";
import registerImage from "../assets/register.png";
import WaitingForSong from "../components/rehearsal/RehearsalWaitingForSong";
import AdminDashboard from "../components/admin/AdminDashboard";

const HomePage = (): React.ReactElement => {
  const { user, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

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
            title="Login"
          />
        ) : (
          <RegisterForm
            onSuccess={handleAuthSuccess}
            toggleMode={() => setIsLogin(true)}
            title="Create Account"
            isAdmin={false}
          />
        )}
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
