import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SupplierControls from '../components/SuppliersControls';
import SupplierTable from '../components/SupplierTable';
import '../styles/suppliers.css';

type Supplier = {
  id: number;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
};

const SuppliersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSuppliers, setSelectedSuppliers] = useState<number[]>([]);

  // ✅ Make suppliers stateful!
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: 1, name: 'Travel Mart', email: 'mart@example.com', status: 'Active' },
    { id: 2, name: 'Himal Tours', email: 'himal@example.com', status: 'Inactive' },
    { id: 3, name: 'Everest Travels', email: 'everest@example.com', status: 'Active' },
    { id: 4, name: 'Kathmandu Expeditions', email: 'ktm@example.com', status: 'Inactive' },
  ]);

  const filteredSuppliers = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteSelected = () => {
    setSuppliers(prev => prev.filter(s => !selectedSuppliers.includes(s.id)));
    setSelectedSuppliers([]);
  };

  const handleEnableSelected = () => {
    setSuppliers(prev =>
      prev.map(s =>
        selectedSuppliers.includes(s.id) ? { ...s, status: 'Active' } : s
      )
    );
    setSelectedSuppliers([]);
  };

  const handleDisableSelected = () => {
    setSuppliers(prev =>
      prev.map(s =>
        selectedSuppliers.includes(s.id) ? { ...s, status: 'Inactive' } : s
      )
    );
    setSelectedSuppliers([]);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        {/* <Header username={''} /> */}
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
