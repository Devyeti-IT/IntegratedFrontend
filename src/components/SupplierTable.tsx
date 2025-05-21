import React, { useState, useEffect } from 'react';

type Supplier = {
  id: number;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
};

type SupplierTableProps = {
  suppliers: Supplier[];
  selectedSuppliers: number[];
  onSelectionChange: (selected: number[]) => void;
  pageSize?: number;
};

const SupplierTable: React.FC<SupplierTableProps> = ({
  suppliers,
  selectedSuppliers,
  onSelectionChange,
  pageSize = 5,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [suppliers]);

  const totalPages = Math.ceil(suppliers.length / pageSize);
  const pagedSuppliers = suppliers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const toggleCheckbox = (id: number) => {
    onSelectionChange(
      selectedSuppliers.includes(id)
        ? selectedSuppliers.filter((i) => i !== id)
        : [...selectedSuppliers, id]
    );
  };

  const toggleSelectAll = () => {
    if (pagedSuppliers.every((s) => selectedSuppliers.includes(s.id))) {
      onSelectionChange(selectedSuppliers.filter((id) => !pagedSuppliers.some(s => s.id === id)));
    } else {
      const newSelected = Array.from(new Set([
        ...selectedSuppliers,
        ...pagedSuppliers.map((s) => s.id),
      ]));
      onSelectionChange(newSelected);
    }
  };

  const isSelected = (id: number) => selectedSuppliers.includes(id);

  return (
    <section className="user-list">
      <table className="supplier-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={pagedSuppliers.every((s) => selectedSuppliers.includes(s.id))}
                onChange={toggleSelectAll}
              />
            </th>
            <th className="header-green">Name</th>
            <th className="header-green">Email</th>
            <th className="header-green">Status</th>
            <th className="header-green">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pagedSuppliers.length === 0 ? (
            <tr>
              <td colSpan={5} className="no-suppliers">No suppliers found.</td>
            </tr>
          ) : (
            pagedSuppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={isSelected(supplier.id)}
                    onChange={() => toggleCheckbox(supplier.id)}
                  />
                </td>
                <td>{supplier.name}</td>
                <td>{supplier.email}</td>
                <td>
                  <span className={`status ${supplier.status.toLowerCase()}`}>
                    {supplier.status}
                  </span>
                </td>
                <td>
                  <button className="icon-button edit">
                    <i className="fas fa-edit" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? 'active' : ''}
            >
              {page}
            </button>
          ))}
          <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default SupplierTable;
