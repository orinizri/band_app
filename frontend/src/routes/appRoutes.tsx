import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AdminRegisterPage from "../pages/AdminRegisterPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register-admin"
          element={<AdminRegisterPage title="Create Admin Account" isAdmin={true} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
