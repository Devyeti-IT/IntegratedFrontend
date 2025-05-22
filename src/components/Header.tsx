import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // import

const Header: React.FC = () => {
  const location = useLocation();
  const { username } = useAuth(); // get username

  const getTitle = () => {
    const path = location.pathname;

    if (path === "/dashboard") return "Dashboard Overview";
    if (path === "/dashboard/suppliers") return "Supplier Management";
    if (path === "/users") return "User Management";
    if (path === "/agencies") return "Agency Management";
    return "Admin Panel";
  };

  return (
    <header>
      <h1>{getTitle()}</h1>
      <div className="admin-info">
        <span className="admin-name" role="img" aria-label="admin">
          👤 {username || "Super Admin"}
        </span>
      </div>
    </header>
  );
};

export default Header;
