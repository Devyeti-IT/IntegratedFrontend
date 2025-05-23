import React, { useState } from 'react';
import bcrypt from 'bcryptjs';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (agency: {
    name: string;
    contactPerson: string;
    phone: string;
    email: string;
    createdBy: string;
    hashedPassword: string;
  }) => void;
};

const AddAgencyModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const hashedPassword = bcrypt.hashSync(password, 10);

    onAdd({
      name,
      contactPerson,
      phone,
      email,
      createdBy,
      hashedPassword,
    });

    // Clear form
    setName('');
    setContactPerson('');
    setPhone('');
    setEmail('');
    setCreatedBy('');
    setPassword('');

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Add Agency</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Agency Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Contact Person"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone"
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
            type="text"
            placeholder="Created By"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="modal-actions">
            <button type="submit">Add</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAgencyModal;
