import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DarkModeToggle from './DarkModeToggle'; // Import toggle

const Header: React.FC = () => {
  const location = useLocation();
  const { username } = useAuth();

  const getTitle = () => {
    const path = location.pathname;

    if (path === "/dashboard") return "Dashboard Overview";
    if (path === "/dashboard/suppliers") return "Supplier Management";
    if (path === "/dashboard/users") return "User Management";
    if (path === "/agencies") return "Agency Management";
    if (path == "/dashboard/apitest") return "Test API";
    return "Admin Panel";
  };

  return (
    <header>
      <h1>{getTitle()}</h1>
      <div className="admin-info">
        <span className="admin-name" role="img" aria-label="admin">
          👤 {username || "Super Admin"}
        </span>
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;
