import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AdminRegisterPage from "../pages/AdminRegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register-admin" element={<AdminRegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
