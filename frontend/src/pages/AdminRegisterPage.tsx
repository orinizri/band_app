import React from "react";
import { AuthUser, useAuth } from "../context/AuthContext";
import RegisterForm from "../components/auth/RegisterForm";
import AuthLayout from "../layouts/AuthLayout";
import registerImage from "../assets/register.png";
import { useNavigate } from "react-router-dom";

const AdminRegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = (user: AuthUser) => {
    login(user); // Set auth context
    navigate("/admin");
  };

  return (
    <AuthLayout backgroundImage={registerImage}>
      <RegisterForm onSuccess={handleSuccess} toggleMode={() => {}} isAdmin />
    </AuthLayout>
  );
};

export default AdminRegisterPage;
