import React from 'react';

type Props = {
  selectedAgencies: number[];
  onSearchChange: (value: string) => void;
  onDeleteSelected: () => void;
  onEnableSelected: () => void;
  onDisableSelected: () => void;
  onAddAgencyClick: () => void;
};

const AgencyControls: React.FC<Props> = ({
  selectedAgencies,
  onSearchChange,
  onDeleteSelected,
  onEnableSelected,
  onDisableSelected,
  onAddAgencyClick,
}) => {
  const isAnySelected = selectedAgencies.length > 0;

  return (
    <>
      <section className="agency-controls">
        <input type="text" placeholder="Search agencies..." onChange={(e) => onSearchChange(e.target.value)} />
        <button className="add-btn" onClick={onAddAgencyClick}>
          <i className="fas fa-plus"></i> Add Agency
        </button>
      </section>
      <section className="bulk-actions">
        <button onClick={onDeleteSelected} disabled={!isAnySelected}>Delete</button>
        <button onClick={onEnableSelected} disabled={!isAnySelected}>Enable</button>
        <button onClick={onDisableSelected} disabled={!isAnySelected}>Disable</button>
      </section>
    </>
  );
};

export default AgencyControls;
