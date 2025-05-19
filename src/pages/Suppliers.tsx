import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/suppliers.css";

interface Supplier {
  id: number;
  name: string;
  contact: string;
  status: string;
}

const suppliers: Supplier[] = [
  { id: 1, name: "Yeti Airlines", contact: "contact@yeti.com", status: "Active" },
  { id: 2, name: "Tara Airlines", contact: "info@taraair.com", status: "Inactive" },
];

export default function Suppliers() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="suppliers-page">
          <h2>Supplier Management</h2>
          <div className="suppliers-table-container">
            <table className="suppliers-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td>{supplier.id}</td>
                    <td>{supplier.name}</td>
                    <td>{supplier.contact}</td>
                    <td className={supplier.status === "Active" ? "status-active" : "status-inactive"}>
                      {supplier.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
