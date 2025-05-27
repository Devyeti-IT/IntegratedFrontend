import React from 'react';

type AgencyControlsProps = {
  selectedAgencies: number[];
  onSearchChange: (value: string) => void;
  onDeleteSelected: () => void;
  onEnableSelected: () => void;
  onDisableSelected: () => void;
  onAddClick: () => void;
};

const AgencyControls: React.FC<AgencyControlsProps> = ({
  selectedAgencies,
  onSearchChange,
  onDeleteSelected,
  onEnableSelected,
  onDisableSelected,
  onAddClick,
}) => {
  const isAnySelected = selectedAgencies.length > 0;

  return (
    <>
      <section className="user-controls">
        <input
          type="text"
          placeholder="Search agencies..."
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button className="add-user-btn" onClick={onAddClick}>
          <i className="fas fa-user-plus"></i> Add Agency
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
    </>
  );
};

export default AgencyControls;
