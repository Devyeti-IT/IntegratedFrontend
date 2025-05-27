import React, { useState } from 'react';
import '../styles/agency.css';

type Supplier = {
  id: string;
  name: string;
  selected: boolean;
  from: string;
  to: string;
  status: string;
};

type AddAgencyModalProps = {
  onClose: () => void;
  onAdd: (data: {
    id: string;
    agencyName: string;
    lastName: string;
    firstName: string;
    password: string;
    email: string;
    phone: string;
    contactPerson: string;
    suppliers: Supplier[];
  }) => void;
  nextId: number;
};

const AddAgencyModal: React.FC<AddAgencyModalProps> = ({ onClose, onAdd, nextId }) => {
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    id: nextId.toString(),
    agencyName: '',
    lastName: '',
    firstName: '',
    password: '',
    email: '',
    phone: '',
    contactPerson: '',
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: '001', name: 'Yeti Airlines', selected: false, from: today, to: '2099-12-31', status: 'Active' },
    { id: '002', name: 'Tara Air', selected: false, from: today, to: '2099-12-31', status: 'Active' },
    { id: '003', name: 'Buddha Air', selected: false, from: today, to: '2099-12-31', status: 'Active' },
  ]);

  const [showSuppliers, setShowSuppliers] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSupplierChange = (
    index: number,
    field: keyof Supplier,
    value: string | boolean
  ) => {
    setSuppliers(prev =>
      prev.map((supplier, i) =>
        i === index ? { ...supplier, [field]: value } : supplier
      )
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setSuppliers(prev =>
      prev.map(supplier => ({ ...supplier, selected: checked }))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ ...formData, suppliers });
    onClose();
  };

  return (
    <div className="add-agency-modal-backdrop">
      <div className="add-agency-modal">
        <h2>Add New Agency</h2>
        <form onSubmit={handleSubmit}>
          {/* Agency Info */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="id">ID</label>
              <input type="text" id="id" name="id" value={formData.id} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="agencyName">Agency Name</label>
              <input id="agencyName" name="agencyName" value={formData.agencyName} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="contactPerson">Contact Person</label>
              <input id="contactPerson" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="buttons" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              type="button"
              className="btn-suppliers"
              onClick={() => setShowSuppliers(!showSuppliers)}
              style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              Suppliers {showSuppliers ? '▲' : '▼'}
            </button>

            <div>
              <button type="submit" className="btn-submit">Save</button>
              <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            </div>
          </div>

          {/* Supplier Table */}
          {showSuppliers && (
            <table className="suppliers-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                  <th>Supplier ID</th>
                  <th>Name</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier, index) => (
                  <tr key={supplier.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={supplier.selected}
                        onChange={(e) =>
                          handleSupplierChange(index, 'selected', e.target.checked)
                        }
                      />
                    </td>
                    <td>{supplier.id}</td>
                    <td>{supplier.name}</td>
                    <td>
                      <input
                        type="date"
                        value={supplier.from}
                        onChange={(e) =>
                          handleSupplierChange(index, 'from', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        value={supplier.to}
                        onChange={(e) =>
                          handleSupplierChange(index, 'to', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={supplier.status}
                        onChange={(e) =>
                          handleSupplierChange(index, 'status', e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddAgencyModal;
