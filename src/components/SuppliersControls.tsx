import React from 'react';

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

  return (
    <>
      <section className="user-controls">
        <input
          type="text"
          placeholder="Search suppliers..."
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <a href="/addSupplier" className="add-user-btn">
          <i className="fas fa-user-plus"></i> Add Supplier
        </a>
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
    </>
  );
};

export default SupplierControls;
