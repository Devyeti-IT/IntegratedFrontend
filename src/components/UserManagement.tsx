import React, { useState } from 'react';
import Header from '../components/Header'; // Adjust path if needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faTrash, faCheck, faBan, faEdit } from '@fortawesome/free-solid-svg-icons';
import './UserManagement.css'; // Ensure this file exists

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  permissions: string[];
}

const initialUsers: User[] = [
  {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    role: 'Admin',
    status: 'Active',
    permissions: ['View', 'Edit', 'Delete'],
  },
  {
    id: 2,
    name: 'Bob',
    email: 'bob@example.com',
    role: 'User',
    status: 'Inactive',
    permissions: ['View'],
  },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelectAll = (checked: boolean) => {
    setSelectedUserIds(checked ? filteredUsers.map(user => user.id) : []);
  };

  const toggleUserSelection = (userId: number) => {
    setSelectedUserIds(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleBulkAction = (action: 'delete' | 'activate' | 'deactivate') => {
    if (action === 'delete') {
      setUsers(prev => prev.filter(user => !selectedUserIds.includes(user.id)));
    } else {
      setUsers(prev =>
        prev.map(user =>
          selectedUserIds.includes(user.id)
            ? { ...user, status: action === 'activate' ? 'Active' : 'Inactive' }
            : user
        )
      );
    }
    setSelectedUserIds([]);
  };

  return (
    <div>
      <Header />

      <div className="user-management">
        <section className="user-controls">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button className="add-user-btn">
            <FontAwesomeIcon icon={faUserPlus} /> Add User
          </button>
        </section>

        <section className="bulk-actions">
          <button onClick={() => handleBulkAction('delete')} disabled={selectedUserIds.length === 0}>
            <FontAwesomeIcon icon={faTrash} /> Delete Selected
          </button>
          <button onClick={() => handleBulkAction('activate')} disabled={selectedUserIds.length === 0}>
            <FontAwesomeIcon icon={faCheck} /> Activate
          </button>
          <button onClick={() => handleBulkAction('deactivate')} disabled={selectedUserIds.length === 0}>
            <FontAwesomeIcon icon={faBan} /> Deactivate
          </button>
        </section>

        <section className="user-list">
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedUserIds.length > 0 && selectedUserIds.length === filteredUsers.length}
                    onChange={e => toggleSelectAll(e.target.checked)}
                  />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Permissions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center' }}>No users found</td>
                </tr>
              ) : (
                filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedUserIds.includes(user.id)}
                        onChange={() => toggleUserSelection(user.id)}
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <span className={`status ${user.status.toLowerCase()}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>{user.permissions.join(', ')}</td>
                    <td>
                      <button className="icon-button">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="icon-button"
                        onClick={() => {
                          if (confirm('Delete this user?')) {
                            setUsers(prev => prev.filter(u => u.id !== user.id));
                            setSelectedUserIds(prev => prev.filter(id => id !== user.id));
                          }
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default UserManagement;
