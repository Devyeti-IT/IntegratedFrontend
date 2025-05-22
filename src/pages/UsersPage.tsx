import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddUserModal from "../components/AddUserModal";
import EditUserModal from "../components/EditUserModal";
import "../styles/dashboard.css";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", email: "bob@example.com" }
  ]);
  const [isAddOpen, setAddOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<{ id: number; name: string; email: string } | null>(null);

  const addUser = (user: { name: string; email: string }) => {
    const newUser = { id: Date.now(), ...user };
    setUsers((prev) => [...prev, newUser]);
  };

  const updateUser = (updated: { id: number; name: string; email: string }) => {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  };

  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="user-actions">
          <h2>Users</h2>
          <button onClick={() => setAddOpen(true)}>+ Add User</button>
        </div>

        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <button onClick={() => { setEditingUser(u); setEditOpen(true); }}>Edit</button>
                  <button onClick={() => deleteUser(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <AddUserModal isOpen={isAddOpen} onClose={() => setAddOpen(false)} onAdd={addUser} />
        <EditUserModal isOpen={isEditOpen} onClose={() => setEditOpen(false)} onUpdate={updateUser} user={editingUser} />
      </div>
    </div>
  );
};

export default UsersPage;
