import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/LoginPage"; // Login page component
import Dashboard from "./pages/Dashboard"; // Dashboard page component
import SuppliersPage from "./pages/SuppliersPage"; // Suppliers page component
// import UsersPage from "./pages/UsersPage"; // Users page component
// import AgenciesPage from "./pages/AgenciesPage"; // Agencies page component
// import { NotFoundPage } from "./pages/NotFoundPage"; // Not Found page (404) component
import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome icons
import './styles/login.css'; // Login page styles
import './styles/dashboard.css'; // Dashboard page styles
import './styles/suppliers.css'; // Suppliers page styles


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Route for Login Page */}
        <Route path="/login" element={<Login />} />
        
        {/* Route for Dashboard Page */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Route for Suppliers Management */}
        <Route path="/dashboard/suppliers" element={<SuppliersPage />} />
        
        {/* Route for Users Management */}
        {/* <Route path="/dashboard/users" element={<UsersPage />} /> */}

        {/* Route for Agencies Management */}
        {/* <Route path="/dashboard/agencies" element={<AgenciesPage />} /> */}

        {/* Route for API Management */}
        {/* <Route path="/dashboard/api-management" element={<NotFoundPage />} /> */}
        
        {/* Route for Finance Reports */}
        {/* <Route path="/dashboard/finance-reports" element={<NotFoundPage />} /> */}

        {/* Route for Payment Processing */}
        {/* <Route path="/dashboard/payment-processing" element={<NotFoundPage />} /> */}

        {/* Route for Ticket Sales */}
        {/* <Route path="/dashboard/ticket-sales" element={<NotFoundPage />} /> */}

        {/* Route for Revenue Analytics */}
        {/* <Route path="/dashboard/revenue-analytics" element={<NotFoundPage />} /> */}

        {/* Route for Expense Tracking */}
        {/* <Route path="/dashboard/expense-tracking" element={<NotFoundPage />} /> */}

        {/* Route for Settings Page */}
        {/* <Route path="/dashboard/settings" element={<NotFoundPage />} /> */}

        {/* Redirect the root route (/) to /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Catch-all Route for any other paths */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
