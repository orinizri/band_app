import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout

// Pages
import RehearsalPage from "./pages/RehearsalPage";
import { ROUTES } from "./constants/routes";
import HomePage from "./pages/Home";
import AppLayout from "./layouts/AppLayout";

// Constants

const App: React.FC = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.LOGIN} element={<div>Login Page</div>} />
          <Route path={ROUTES.REGISTER} element={<div>Register Page</div>} />
          <Route path={ROUTES.REHEARSAL} element={<RehearsalPage />} />
          <Route path={ROUTES.NOT_FOUND} element={<div>404 Not Found</div>} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;