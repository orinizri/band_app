import React from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import RehearsalPage from "./pages/RehearsalPage";

const App = () => {
  return (
    <Routes>
      {/* Auth pages - no layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* App routes - wrapped in AppLayout */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/rehearsal" element={<RehearsalPage />} />
        {/* <Route path="/admin" element={<AdminPage />} /> */}
      </Route>
    </Routes>
  );
};

export default App;