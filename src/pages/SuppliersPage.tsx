import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SupplierControls from '../components/SuppliersControls';
import SupplierTable from '../components/SupplierTable';
import '../styles/suppliers.css';
import AddSupplierModal from '../components/AddSupplierModal';


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
    { id: 1, name: 'Yeti Airlines', email: 'yeti@yetiairlines.com', status: 'Active' },
    { id: 2, name: 'Tara Air', email: 'tara@taraair.com', status: 'Inactive' },
    
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

  // Add Supplier Modal 
const [showAddModal, setShowAddModal] = useState(false);
const handleAddSupplier = (newSupplierData: any) => {
  const newSupplier: Supplier = {
    id: suppliers.length + 1,
    name: newSupplierData.name,
    email: newSupplierData.email,
    status: 'Active', // Default
  };
  setSuppliers([...suppliers, newSupplier]);
};

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header username={''} />
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
        {showAddModal && (
          <AddSupplierModal
            onClose={() => setShowAddModal(false)}
            onAddSupplier={handleAddSupplier}
          />
        )}
      </div>
    </div>
  );
};

export default SuppliersPage;
