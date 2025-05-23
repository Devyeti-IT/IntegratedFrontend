import React from 'react';

type UserControlsProps = {
  selectedUsers: number[];
  onSearchChange: (value: string) => void;
  onDeleteSelected: () => void;
  onEnableSelected: () => void;
  onDisableSelected: () => void;
  onAddUserClick: () => void;  // <-- Added prop for modal open
};

const UserControls: React.FC<UserControlsProps> = ({
  selectedUsers,
  onSearchChange,
  onDeleteSelected,
  onEnableSelected,
  onDisableSelected,
  onAddUserClick,
}) => {
  const isAnySelected = selectedUsers.length > 0;

  return (
    <>
      <section className="user-controls">
        <input
          type="text"
          placeholder="Search users..."
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button
          type="button"
          className="add-user-btn"
          onClick={onAddUserClick}  // <-- open modal on click
        >
          <i className="fas fa-user-plus"></i> Add User
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

export default UserControls;
