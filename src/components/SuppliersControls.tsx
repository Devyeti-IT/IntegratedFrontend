
import React, { useState } from 'react';
import '../styles/suppliers.css'; // Import your CSS file for styling

const SupplierControls: React.FC = () => {
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]); // Track selected suppliers

  const handleSupplierSelect = (supplierId: string) => {
    setSelectedSuppliers((prevSelected) => {
      if (prevSelected.includes(supplierId)) {
        return prevSelected.filter(id => id !== supplierId);
      } else {
        return [...prevSelected, supplierId];
      }
    });
  };

  const isAnySupplierSelected = selectedSuppliers.length > 0;

  return (
    <>
      <section className="user-controls">
        <input
          type="text"
          id="supplierSearch"
          placeholder="Search suppliers..."
          aria-label="Search for suppliers"
        />
        <a href="/addSupplier" className="add-user-btn" aria-label="Add a new supplier">
          <i className="fas fa-user-plus"></i> Add Supplier
        </a>
      </section>

      <section className="bulk-actions">
        <button
          id="bulkDelete"
          disabled={!isAnySupplierSelected}
          aria-label="Delete selected suppliers"
        >
          <i className="fas fa-trash"></i> Delete Selected
        </button>
        <button
          id="bulkEnable"
          disabled={!isAnySupplierSelected}
          aria-label="Enable selected suppliers"
        >
          <i className="fas fa-check"></i> Enable
        </button>
        <button
          id="bulkDisable"
          disabled={!isAnySupplierSelected}
          aria-label="Disable selected suppliers"
        >
          <i className="fas fa-ban"></i> Disable
        </button>
      </section>
    </>
  );
};

export default SupplierControls;
