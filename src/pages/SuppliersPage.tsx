import React from 'react';
import Sidebar from '../components/Sidebar';
// import SupplierControls from '../components/SupplierControls';
// Please ensure the file exists at ../components/SupplierControls.tsx or update the path below if it's located elsewhere.
import SupplierControls from '../components/SuppliersControls'; // Update this path if necessary
import SupplierTable from '../components/SupplierTable';
import '../styles/suppliers.css';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
      {/* header content */}
    </header>
  );
};

const SuppliersPage: React.FC = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main">
        <Header title="Supplier Management" />
        <SupplierControls />
        <SupplierTable />
      </main>
    </div>
  );
};

export default SuppliersPage;
