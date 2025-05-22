import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/layout.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
