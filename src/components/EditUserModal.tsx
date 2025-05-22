import React, { useState, useEffect } from "react";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (user: { id: number; name: string; email: string }) => void;
  user: { id: number; name: string; email: string } | null;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, onUpdate, user }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      onUpdate({ id: user.id, name, email });
      onClose();
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
          <input value={email} onChange={(e) => setEmail(e.target.value)} required />
          <div className="modal-actions">
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
