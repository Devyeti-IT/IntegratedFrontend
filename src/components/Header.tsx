export default function Header() {
  return (
    <header>
      <h1>Dashboard Overview</h1>
      <div className="admin-info">
        <span className="icon" role="img" aria-label="notifications">
          🔔
        </span>
        <span className="admin-name" role="img" aria-label="admin">
          👤 Super Admin
        </span>
      </div>
    </header>
  );
}
