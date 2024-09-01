export function Loading() {
  return (
    <div
      className="d-flex flex-column gap-2 justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="spinner-border" role="status"></div>
      <span className="text-secondary">Carregando...</span>
    </div>
  );
}
