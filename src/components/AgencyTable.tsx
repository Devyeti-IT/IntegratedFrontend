import React, { useState, useEffect, useRef } from 'react';

type Agency = {
  id: number;
  agencyName: string;
  email: string;
  status: 'Active' | 'Inactive';
};

type AgencyTableProps = {
  agencies: Agency[];
  selectedAgencies: number[];
  onSelectionChange: (selected: number[]) => void;
  pageSize?: number;
};

const AgencyTable: React.FC<AgencyTableProps> = ({
  agencies,
  selectedAgencies,
  onSelectionChange,
  pageSize = 5,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>({
    id: 50,
    agencyName: 200,
    email: 250,
    status: 100,
    actions: 80,
  });

  const startX = useRef(0);
  const startWidth = useRef(0);
  const resizingCol = useRef<string | null>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [agencies]);

  const totalPages = Math.ceil(agencies.length / pageSize);
  const pagedAgencies = agencies.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Mouse move handler for resizing
  const onMouseMove = (e: MouseEvent) => {
    if (!resizingCol.current) return;
    const deltaX = e.clientX - startX.current;
    setColumnWidths((prev) => {
      const newWidth = Math.max(startWidth.current + deltaX, 50);
      return { ...prev, [resizingCol.current as string]: newWidth };
    });
  };

  // Mouse up handler - stop resizing
  const onMouseUp = () => {
    resizingCol.current = null;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  // Start resizing
  const onMouseDown = (e: React.MouseEvent, col: string) => {
    startX.current = e.clientX;
    startWidth.current = columnWidths[col];
    resizingCol.current = col;
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // Checkbox toggle logic (same as before)
  const toggleCheckbox = (id: number) => {
    const isSelected = selectedAgencies.includes(id);
    const newSelection = isSelected
      ? selectedAgencies.filter((i) => i !== id)
      : [...selectedAgencies, id];
    onSelectionChange(newSelection);
  };

  const toggleSelectAll = () => {
    const allSelected = pagedAgencies.every(a => selectedAgencies.includes(a.id));
    const newSelection = allSelected
      ? selectedAgencies.filter(id => !pagedAgencies.some(a => a.id === id))
      : Array.from(new Set([...selectedAgencies, ...pagedAgencies.map(a => a.id)]));
    onSelectionChange(newSelection);
  };

  return (
    <section className="user-list" style={{ overflowX: 'auto' }}>
      <table
        className="supplier-table"
        role="table"
        aria-label="Agency Table"
        style={{ minWidth: 700 }}
      >
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <input
                type="checkbox"
                checked={pagedAgencies.every(a => selectedAgencies.includes(a.id))}
                onChange={toggleSelectAll}
              />
            </th>
            <th style={{ width: columnWidths.id, position: 'relative' }}>
              ID
              <div
                onMouseDown={(e) => onMouseDown(e, 'id')}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  height: '100%',
                  width: 5,
                  cursor: 'col-resize',
                  userSelect: 'none',
                }}
              />
            </th>
            <th style={{ width: columnWidths.agencyName, position: 'relative' }}>
              Agency Name
              <div
                onMouseDown={(e) => onMouseDown(e, 'agencyName')}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  height: '100%',
                  width: 5,
                  cursor: 'col-resize',
                  userSelect: 'none',
                }}
              />
            </th>
            <th style={{ width: columnWidths.email, position: 'relative' }}>
              Email
              <div
                onMouseDown={(e) => onMouseDown(e, 'email')}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  height: '100%',
                  width: 5,
                  cursor: 'col-resize',
                  userSelect: 'none',
                }}
              />
            </th>
            <th style={{ width: columnWidths.status, position: 'relative' }}>
              Status
              <div
                onMouseDown={(e) => onMouseDown(e, 'status')}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  height: '100%',
                  width: 5,
                  cursor: 'col-resize',
                  userSelect: 'none',
                }}
              />
            </th>
            <th style={{ width: columnWidths.actions, position: 'relative' }}>
              Actions
              <div
                onMouseDown={(e) => onMouseDown(e, 'actions')}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  height: '100%',
                  width: 5,
                  cursor: 'col-resize',
                  userSelect: 'none',
                }}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {pagedAgencies.length === 0 ? (
            <tr>
              <td colSpan={6} className="no-suppliers">No agencies found.</td>
            </tr>
          ) : (
            pagedAgencies.map((agency) => (
              <tr key={agency.id}>
                <td style={{ width: 40 }}>
                  <input
                    type="checkbox"
                    checked={selectedAgencies.includes(agency.id)}
                    onChange={() => toggleCheckbox(agency.id)}
                  />
                </td>
                <td style={{ width: columnWidths.id }}>{agency.id}</td>
                <td style={{ width: columnWidths.agencyName }}>{agency.agencyName}</td>
                <td style={{ width: columnWidths.email }}>{agency.email}</td>
                <td style={{ width: columnWidths.status }}>
                  <span className={`status ${agency.status.toLowerCase()}`}>
                    {agency.status === 'Active' ? '🟢' : '🔴'} {agency.status}
                  </span>
                </td>
                <td style={{ width: columnWidths.actions }}>
                  <button className="icon-button edit" aria-label="Edit agency">
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
          <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
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
          <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default AgencyTable;
