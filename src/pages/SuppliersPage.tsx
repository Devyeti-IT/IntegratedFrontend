import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SupplierControls from '../components/SuppliersControls';
import SupplierTable from '../components/SupplierTable';
import '../styles/suppliers.css';

const SuppliersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSuppliers, setSelectedSuppliers] = useState<number[]>([]);

  const suppliers = [
    { id: 1, name: 'Travel Mart', email: 'mart@example.com', status: 'Active' as const },
    { id: 2, name: 'Himal Tours', email: 'himal@example.com', status: 'Inactive' as const },
    { id: 3, name: 'Everest Travels', email: 'everest@example.com', status: 'Active' as const },
    { id: 4, name: 'Kathmandu Expeditions', email: 'ktm@example.com', status: 'Inactive' as const },
  ];

  const filteredSuppliers = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteSelected = () => {
    setSelectedSuppliers([]);
    // Add logic to remove suppliers from the backend if needed
  };

  const handleEnableSelected = () => {
    // Add logic to enable selected suppliers
  };

  const handleDisableSelected = () => {
    // Add logic to disable selected suppliers
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <SupplierControls
          selectedSuppliers={selectedSuppliers}
          onSearchChange={setSearchQuery}
          onDeleteSelected={handleDeleteSelected}
          onEnableSelected={handleEnableSelected}
          onDisableSelected={handleDisableSelected}
        />
        <SupplierTable
          suppliers={filteredSuppliers}
          selectedSuppliers={selectedSuppliers}
          onSelectionChange={setSelectedSuppliers}
        />
      </div>
    </div>
  );
};

export default SuppliersPage;
