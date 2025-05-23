import React, { useState } from "react";
import bcrypt from "bcryptjs";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AgencyControls from "../components/AgencyControl";
import "../styles/agency.css";

type Agency = {
  id: number;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  status: "Active" | "Inactive";
};

type AddAgencyData = {
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  username: string;
  passwordHash: string;
  createdBy: string;
};

const AddAgencyModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: AddAgencyData) => void;
}> = ({ isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    createdBy: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(form.password, salt);

    onAdd({
      name: form.name,
      contactPerson: form.contactPerson,
      phone: form.phone,
      email: form.email,
      username: form.username,
      passwordHash,
      createdBy: form.createdBy,
    });

    setForm({
      name: "",
      contactPerson: "",
      phone: "",
      email: "",
      username: "",
      password: "",
      createdBy: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Agency</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Agency Name" value={form.name} onChange={handleChange} required />
          <input name="contactPerson" placeholder="Contact Person" value={form.contactPerson} onChange={handleChange} required />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <input name="createdBy" placeholder="Created By" value={form.createdBy} onChange={handleChange} required />
          <div className="modal-actions">
            <button type="submit">Add</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AgencyPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgencies, setSelectedAgencies] = useState<number[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [agencies, setAgencies] = useState<Agency[]>([
    {
      id: 1,
      name: "Kathmandu HQ",
      contactPerson: "Alice",
      phone: "1234567890",
      email: "alice@agency.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Pokhara Branch",
      contactPerson: "Bob",
      phone: "0987654321",
      email: "bob@agency.com",
      status: "Inactive",
    },
  ]);

  const filteredAgencies = agencies.filter(
    a =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddAgency = (data: AddAgencyData) => {
    const newAgency: Agency = {
      id: agencies.length + 1,
      name: data.name,
      contactPerson: data.contactPerson,
      phone: data.phone,
      email: data.email,
      status: "Active",
    };
    setAgencies([...agencies, newAgency]);
  };

  const handleDeleteSelected = () => {
    setAgencies(agencies.filter(a => !selectedAgencies.includes(a.id)));
    setSelectedAgencies([]);
  };

  const handleEnableSelected = () => {
    setAgencies(agencies.map(a => selectedAgencies.includes(a.id) ? { ...a, status: "Active" } : a));
  };

  const handleDisableSelected = () => {
    setAgencies(agencies.map(a => selectedAgencies.includes(a.id) ? { ...a, status: "Inactive" } : a));
  };

  const handleSelectAgency = (id: number) => {
    setSelectedAgencies(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <AgencyControls
          selectedAgencies={selectedAgencies}
          onSearchChange={setSearchQuery}
          onDeleteSelected={handleDeleteSelected}
          onEnableSelected={handleEnableSelected}
          onDisableSelected={handleDisableSelected}
          onAddAgencyClick={() => setIsAddModalOpen(true)}
        />

        <table className="data-table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Contact Person</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAgencies.map((agency) => (
              <tr key={agency.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedAgencies.includes(agency.id)}
                    onChange={() => handleSelectAgency(agency.id)}
                  />
                </td>
                <td>{agency.name}</td>
                <td>{agency.contactPerson}</td>
                <td>{agency.phone}</td>
                <td>{agency.email}</td>
                <td>{agency.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <AddAgencyModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddAgency}
        />
      </div>
    </div>
  );
};

export default AgencyPage;
