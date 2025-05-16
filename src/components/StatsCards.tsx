const stats = [
  { icon: "fas fa-building", label: "Total Agencies", value: 42 },
  { icon: "fas fa-plug", label: "Total APIs", value: 8 },
  { icon: "fas fa-exclamation-triangle", label: "API Errors", value: 3, error: true },
  { icon: "fas fa-users", label: "Total Users", value: 9 },
];

export default function StatsCards() {
  return (
    <section className="stats">
      {stats.map(({ icon, label, value, error }) => (
        <div className="dashboard-card" key={label}>
          <i className={`dashboard-card-icon ${icon}`} />
          <h3>{label}</h3>
          <p className={error ? "error" : ""}>{value}</p>
        </div>
      ))}
    </section>
  );
}
