import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UserControls from '../components/UsersControl';
import UserTable from '../components/UserTable';
import AddUserModal from '../components/AddUserModal'; // Make sure the path is correct
import '../styles/users.css';

const UsersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', email: 'alice@example.com', status: 'Active' as const },
    { id: 2, name: 'Bob', email: 'bob@example.com', status: 'Inactive' as const },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', status: 'Active' as const },
    { id: 4, name: 'Diana', email: 'diana@example.com', status: 'Inactive' as const },
  ]);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteSelected = () => {
    setSelectedUsers([]);
    // Logic to delete users
  };

  const handleEnableSelected = () => {
    // Logic to enable users
  };

  const handleDisableSelected = () => {
    // Logic to disable users
  };

  interface NewUser {
    firstName: string;
    lastName: string;
    email: string;
  }

  function handleAddUser(newUser: NewUser): void {
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const fullName = `${newUser.firstName} ${newUser.lastName}`;
    const userToAdd = {
      id: newId,
      name: fullName,
      email: newUser.email,
      status: 'Active' as const,
    };
    setUsers([...users, userToAdd]);
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <UserControls
          selectedUsers={selectedUsers}
          onSearchChange={setSearchQuery}
          onDeleteSelected={handleDeleteSelected}
          onEnableSelected={handleEnableSelected}
          onDisableSelected={handleDisableSelected}
          onAddUserClick={() => setIsAddModalOpen(true)} // <== Add this prop
        />
        <UserTable
          users={filteredUsers}
          selectedUsers={selectedUsers}
          onSelectionChange={setSelectedUsers}
        />
        <AddUserModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddUser}
        />
      </div>
    </div>
  );
};

export default UsersPage;
