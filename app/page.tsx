export default function Home() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f0fdf4",
    }}>
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1 style={{ color: "#16a34a", fontSize: "2rem", marginBottom: "0.5rem" }}>
          WA Redirector
        </h1>
        <p style={{ color: "#555", fontSize: "1.1rem" }}>
          Redirecionador automatico de WhatsApp
        </p>
        <p style={{ color: "#888", marginTop: "1rem" }}>
          <a href="/admin" style={{ color: "#16a34a" }}>Painel de administracao</a>
        </p>
      </div>
    </div>
  );
}
