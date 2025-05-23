import React, { useState } from "react";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (user: {
    username: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    userRole: string;
  }) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("superadmin");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ username, firstName, lastName, phone, email, password, userRole });
    setUsername("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setUserRole("superadmin");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select value={userRole} onChange={(e) => setUserRole(e.target.value)} required>
            <option value="superadmin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="support">Support</option>
            <option value="apiConsumer">API Consumer</option>
          </select>

          <div className="modal-actions" style={{ marginTop: "1rem" }}>
            <button type="submit">Add</button>
            <button type="button" onClick={onClose} style={{ marginLeft: "0.5rem" }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
