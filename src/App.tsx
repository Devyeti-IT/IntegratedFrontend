import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SuppliersPage from "./pages/SuppliersPage";
import { AuthProvider } from "./context/AuthContext";
import APITestPage from "./pages/APITestPage";
import AgencyPage from "./pages/AgencyPage";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/suppliers" element={<SuppliersPage />} />
          <Route path="/dashboard/apitest" element={<APITestPage />} />
          <Route path="/dashboard/agencies" element={<AgencyPage />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
