import React, { useState, useEffect } from 'react';

const SupplierTable: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<number[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const data = [
    { id: 1, name: 'Travel Mart', email: 'mart@example.com', status: 'Active' },
    { id: 2, name: 'Himal Tours', email: 'himal@example.com', status: 'Inactive' },
    // Add more suppliers as needed
  ];

  // Debouncing the search query
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const filtered = data.filter(
    (d) =>
      d.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      d.email.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  const toggleCheckbox = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isSelected = (id: number) => selected.includes(id);

  return (
    <section className="user-list">
      <input
        type="text"
        id="supplierSearch"
        placeholder="Search suppliers..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search for suppliers"
      />

      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selected.length === filtered.length}
                onChange={() =>
                  setSelected(selected.length === filtered.length ? [] : filtered.map((d) => d.id))
                }
                aria-label="Select all suppliers"
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="supplierTableBody">
          {filtered.map((supplier) => (
            <tr key={supplier.id}>
              <td>
                <input
                  type="checkbox"
                  className="supplier-checkbox"
                  checked={isSelected(supplier.id)}
                  onChange={() => toggleCheckbox(supplier.id)}
                  aria-label={`Select ${supplier.name}`}
                />
              </td>
              <td>{supplier.name}</td>
              <td>{supplier.email}</td>
              <td>
                <span className={`status ${supplier.status.toLowerCase()}`} aria-label={`Status: ${supplier.status}`}>
                  {supplier.status}
                </span>
              </td>
              <td>
                <button className="edit-btn" aria-label={`Edit ${supplier.name}`}>
                  <i className="fas fa-edit"></i>
                </button>
                <button className="delete-btn" aria-label={`Delete ${supplier.name}`}>
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default SupplierTable;
