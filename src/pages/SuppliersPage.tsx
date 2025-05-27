import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SupplierControls from '../components/SuppliersControls';
import SupplierTable from '../components/SupplierTable';
import AddSupplierModal from '../components/AddSupplierModal';
import BulkActions from '../components/BulkActions';
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
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: 1, name: 'Yeti Airlines', email: 'yeti@yetiairlines.com', status: 'Active' },
    { id: 2, name: 'Tara Air', email: 'tara@taraair.com', status: 'Inactive' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredSuppliers = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEnableSelected = () => {
    setSuppliers(prev =>
      prev.map(s => selectedSuppliers.includes(s.id) ? { ...s, status: 'Active' } : s)
    );
    setSelectedSuppliers([]);
  };

  const handleDisableSelected = () => {
    setSuppliers(prev =>
      prev.map(s => selectedSuppliers.includes(s.id) ? { ...s, status: 'Inactive' } : s)
    );
    setSelectedSuppliers([]);
  };

  const handleDeleteUser = (id: number) => {
    const supplier = suppliers.find(s => s.id === id);
    if (supplier && window.confirm(`Are you sure you want to delete ${supplier.name}?`)) {
      setSuppliers(prev => prev.filter(s => s.id !== id));
      setSelectedSuppliers(prev => prev.filter(selectedId => selectedId !== id));
    }
  };

  const handleAddSupplier = (newSupplierData: {
    name: string;
    type: string;
    address: string;
    contact: string;
    email: string;
    updatedBy: string;
  }) => {
    const newSupplier: Supplier = {
      id: suppliers.length + 1,
      name: newSupplierData.name,
      email: newSupplierData.email,
      status: 'Active',
    };
    setSuppliers(prev => [...prev, newSupplier]);
    setShowAddModal(false);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header username={''} />

        <SupplierControls
          onSearchChange={setSearchQuery}
          onAddClick={() => setShowAddModal(true)}
        />

        <BulkActions
          selectedCount={selectedSuppliers.length}
          onEnableSelected={handleEnableSelected}
          onDisableSelected={handleDisableSelected}
        />

        <SupplierTable
          suppliers={filteredSuppliers}
          selectedSuppliers={selectedSuppliers}
          onSelectionChange={setSelectedSuppliers}
          onDeleteUser={handleDeleteUser}
        />

        {showAddModal && ( 
          <AddSupplierModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddSupplier}
          />
        )}
      </div>
    </div>
  );
};

export default SuppliersPage;
