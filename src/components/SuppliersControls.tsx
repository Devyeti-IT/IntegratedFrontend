import React from 'react';

type SupplierControlsProps = {
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
};

const SupplierControls: React.FC<SupplierControlsProps> = ({
  onSearchChange,
  onAddClick,
}) => {
  return (
    <section className="user-controls">
      <input
        type="text"
        placeholder="Search suppliers..."
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <button className="add-user-btn" onClick={onAddClick}>
        <i className="fas fa-plus"></i> Add Supplier
      </button>
    </section>
  );
};

export default SupplierControls;
