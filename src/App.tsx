import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SuppliersPage from "./pages/SuppliersPage";
import UsersPage from './pages/UsersPage';
import AgencyPage from './pages/AgencyPage'; // ✅ Imported AgencyPage
import "@fortawesome/fontawesome-free/css/all.min.css";
import './styles/login.css';
import './styles/dashboard.css';
import './styles/suppliers.css';
import './styles/users.css';
import 'leaflet/dist/leaflet.css';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/suppliers" element={<SuppliersPage />} />
        <Route path="/dashboard/users" element={<UsersPage />} />
        <Route path="/dashboard/agencies" element={<AgencyPage />} /> {/* ✅ Added route */}

        {/* Optional: Default route */}
        <Route path="/" element={<Navigate to="/dashboard/users" />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
