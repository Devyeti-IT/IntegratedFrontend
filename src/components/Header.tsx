import React from "react";
import { useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname;

    if (path === "/dashboard") return "Dashboard Overview";
    if (path === "/dashboard/suppliers") return "Supplier Management";
    if (path === "/dashboard/users") return "User Management";
    if (path === "/dashboard/agencies") return "Agency Management";

    // fallback title
    return "Admin Panel";
  };

  return (
    <header>
      <h1>{getTitle()}</h1>
      <div className="admin-info" style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <span
          className="icon"
          role="img"
          aria-label="notifications"
          style={{ cursor: "pointer" }}
        >
          🔔
        </span>
        <span
          className="admin-name"
          role="img"
          aria-label="admin"
          style={{ cursor: "default" }}
        >
          👤 Super Admin
        </span>
      </div>
    </header>
  );
};

export default Header;
