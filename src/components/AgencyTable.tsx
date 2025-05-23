import React from 'react';

interface Agency {
  id: number;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  status: 'Active' | 'Inactive';
}

type Props = {
  agencies: Agency[];
  selectedAgencies: number[];
  onSelectionChange: (ids: number[]) => void;
};

const AgencyTable: React.FC<Props> = ({ agencies, selectedAgencies, onSelectionChange }) => {
  const toggleSelection = (id: number) => {
    if (selectedAgencies.includes(id)) {
      onSelectionChange(selectedAgencies.filter(i => i !== id));
    } else {
      onSelectionChange([...selectedAgencies, id]);
    }
  };

  return (
    <table className="agency-table">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Contact</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {agencies.map(agency => (
          <tr key={agency.id}>
            <td>
              <input
                type="checkbox"
                checked={selectedAgencies.includes(agency.id)}
                onChange={() => toggleSelection(agency.id)}
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
  );
};

export default AgencyTable;
