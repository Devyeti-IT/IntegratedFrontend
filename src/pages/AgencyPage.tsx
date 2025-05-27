import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AgencyControls from "../components/AgencyControls";
import AgencyTable from "../components/AgencyTable";
import AddAgencyModal from "../components/AddAgencyModal";
import "../styles/suppliers.css"; // You can also import agency.css if needed

type Agency = {
  id: number;
  agencyName: string;
  email: string;
  status: "Active" | "Inactive";
};

const AgencyPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgencies, setSelectedAgencies] = useState<number[]>([]);
  const [agencies, setAgencies] = useState<Agency[]>([
    { id: 1, agencyName: "Yeti Travels", email: "info@yeti.com", status: "Active" },
    { id: 2, agencyName: "Buddha Agency", email: "contact@buddha.com", status: "Inactive" },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredAgencies = agencies.filter(
    (a) =>
      a.agencyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteSelected = () => {
    setAgencies((prev) => prev.filter((a) => !selectedAgencies.includes(a.id)));
    setSelectedAgencies([]);
  };

  const handleEnableSelected = () => {
    setAgencies((prev) =>
      prev.map((a) =>
        selectedAgencies.includes(a.id) ? { ...a, status: "Active" } : a
      )
    );
    setSelectedAgencies([]);
  };

  const handleDisableSelected = () => {
    setAgencies((prev) =>
      prev.map((a) =>
        selectedAgencies.includes(a.id) ? { ...a, status: "Inactive" } : a
      )
    );
    setSelectedAgencies([]);
  };

  const handleAddAgency = (data: {
    id: string;
    agencyName: string;
    lastName: string;
    firstName: string;
    password: string;
    email: string;
    phone: string;
    contactPerson: string;
  }) => {
    const newAgency: Agency = {
      id: parseInt(data.id),
      agencyName: data.agencyName,
      email: data.email,
      status: "Active",
    };
    setAgencies((prev) => [...prev, newAgency]);
  };

  const handleViewSuppliers = () => {
    alert("Suppliers button clicked — implement supplier popup here.");
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content p-4">
        <Header />

        <AgencyControls
          selectedAgencies={selectedAgencies}
          onSearchChange={setSearchQuery}
          onDeleteSelected={handleDeleteSelected}
          onEnableSelected={handleEnableSelected}
          onDisableSelected={handleDisableSelected}
          onAddClick={() => setShowAddModal(true)}
        />

        <AgencyTable
          agencies={filteredAgencies}
          selectedAgencies={selectedAgencies}
          onSelectionChange={setSelectedAgencies}
        />

        {showAddModal && (
          <AddAgencyModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddAgency}
            nextId={agencies.length > 0 ? Math.max(...agencies.map((a) => a.id)) + 1 : 1}
            onViewSuppliers={handleViewSuppliers}
          />
        )}
      </div>
    </div>
  );
};

export default AgencyPage;
