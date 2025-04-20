import React from "react";
import { AuthUser, useAuth } from "../context/AuthContext";
import RegisterForm from "../components/auth/RegisterForm";
import AuthLayout from "../layouts/AuthLayout";
import registerImage from "../assets/register.png";
// import { useNavigate } from "react-router-dom";

const AdminRegisterPage = ({ title, isAdmin  } : { title: string, isAdmin: boolean }) => {
  const { login } = useAuth();
  // const navigate = useNavigate();

  const handleSuccess = (user: AuthUser) => {
    console.log("Admin register success", user);
    login(user); // Set auth context
  };

  return (
    <AuthLayout backgroundImage={registerImage}>
      <RegisterForm
        onSuccess={handleSuccess}
        toggleMode={() => {}}
        isAdmin={isAdmin}
        title={title}
      />
    </AuthLayout>
  );
};

export default AdminRegisterPage;
