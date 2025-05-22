import React, { useState } from 'react';

type SupplierControlsProps = {
  selectedSuppliers: number[];
  onSearchChange: (value: string) => void;
  onDeleteSelected: () => void;
  onEnableSelected: () => void;
  onDisableSelected: () => void;
};

const SupplierControls: React.FC<SupplierControlsProps> = ({
  selectedSuppliers,
  onSearchChange,
  onDeleteSelected,
  onEnableSelected,
  onDisableSelected,
}) => {
  const isAnySelected = selectedSuppliers.length > 0;
  const [showAddModal, setShowAddModal] = useState(false);

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Supplier added');
    handleCloseModal();
  };

  return (
    <>
      <section className="user-controls">
        <input
          type="text"
          placeholder="Search suppliers..."
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button className="add-user-btn" onClick={() => setShowAddModal(true)}>
          <i className="fas fa-user-plus"></i> Add Supplier
        </button>
      </section>

      <section className="bulk-actions">
        <button onClick={onDeleteSelected} disabled={!isAnySelected}>
          <i className="fas fa-trash"></i> Delete Selected
        </button>
        <button onClick={onEnableSelected} disabled={!isAnySelected}>
          <i className="fas fa-check"></i> Enable
        </button>
        <button onClick={onDisableSelected} disabled={!isAnySelected}>
          <i className="fas fa-ban"></i> Disable
        </button>
      </section>

      {showAddModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Supplier</h2>
            <form onSubmit={handleAddSupplier} className="supplier-form">
              <input type="text" placeholder="Supplier Name" required />
              <input type="text" placeholder="Supplier Type" required />
              <input type="text" placeholder="Address" required />
              <input type="text" placeholder="Contact Number" required />
              <input type="email" placeholder="Email" required />
              <input type="text" placeholder="Created By" required />

              <div className="modal-actions">
                <button type="submit" className="submit-btn">Add Supplier</button>
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SupplierControls;
