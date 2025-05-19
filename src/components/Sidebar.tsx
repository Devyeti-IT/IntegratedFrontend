import React, { useEffect, useState } from "react";

const navSections = [
  {
    title: "Main",
    links: [{ href: "#", icon: "fas fa-tachometer-alt", label: "Dashboard" }],
  },
  {
    title: "Management",
    links: [
      { href: "suppliers", icon: "fas fa-plane", label: "Suppliers" },
      { href: "users", icon: "fas fa-users", label: "Users" },
      { href: "agencies", icon: "fas fa-building", label: "Agencies" },
      { href: "#", icon: "fas fa-plug", label: "API Management" },
      { href: "#", icon: "fas fa-file-alt", label: "Logs" },
      { href: "#", icon: "fas fa-chart-line", label: "Finance Reports" },
      { href: "#", icon: "fas fa-credit-card", label: "Payment Processing" },
      { href: "#", icon: "fas fa-ticket-alt", label: "Ticket Sales" },
      { href: "#", icon: "fas fa-chart-pie", label: "Revenue Analytics" },
      { href: "#", icon: "fas fa-money-bill-wave", label: "Expense Tracking" },
    ],
  },
  {
    title: "Settings",
    links: [
      { href: "#", icon: "fas fa-cogs", label: "System Settings" },
      { href: "#", icon: "fas fa-shield-alt", label: "Security" },
      { href: "/login", icon: "fas fa-sign-out-alt", label: "Logout" },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const storedCollapsed = localStorage.getItem("sidebarCollapsed") === "true";
    setCollapsed(storedCollapsed);
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed.toString());
  }, [collapsed]);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <h2>
        <button
          id="menu-toggle"
          aria-label="Toggle Sidebar"
          aria-expanded={!collapsed}
          onClick={() => setCollapsed((prev) => !prev)}
        >
          <i className="fas fa-bars" />
        </button>
        <span className="sidebar-title">Admin Panel</span>
      </h2>
      <hr />
      {navSections.map(({ title, links }) => (
        <nav className="nav-section" key={title}>
          <p>{title}</p>
          {links.map(({ href, icon, label }) => (
            <a href={href} key={label}>
              <i className={icon} />
              {collapsed ? null : label}
            </a>
          ))}
        </nav>
      ))}
    </aside>
  );
}
