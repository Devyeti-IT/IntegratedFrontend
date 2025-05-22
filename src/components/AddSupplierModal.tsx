import React, { useState } from 'react';

type AddSupplierModalProps = {
  onClose: () => void;
  onAdd: (supplier: {
    name: string;
    type: string;
    address: string;
    contact: string;
    email: string;
    updatedBy: string;
  }) => void;
};

const AddSupplierModal: React.FC<AddSupplierModalProps> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    address: '',
    contact: '',
    email: '',
    updatedBy: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onAdd(formData);
    onClose();
  };
  

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Supplier</h2>
        <input name="name" placeholder="Supplier Name" onChange={handleChange} />
        <input name="type" placeholder="Supplier Type" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />
        <input name="contact" placeholder="Contact Number" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="updatedBy" placeholder="Updated By" onChange={handleChange} />

        <div className="modal-actions">
          <button onClick={handleSubmit}>Add Supplier</button>
          <button className="cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddSupplierModal;
