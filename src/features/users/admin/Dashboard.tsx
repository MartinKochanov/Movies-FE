export function Dashboard() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 64px)",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <div>
        <h1>Admin Dashboard</h1>
        <p>Welcome to the admin dashboard!</p>
        <p>Here you can manage users, movies, and series.</p>
      </div>
    </div>
  );
}
