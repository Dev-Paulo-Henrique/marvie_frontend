import Logo from "/logo.svg"

export function Menu() {
  return (
    <>
      {/* <div
        style={{
          position: "fixed",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          padding: "5px",
          borderRadius: "8px",
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          width: "auto",
        }}
      >
        <a className="btn btn-light fs-5 px-4" href="/">Início</a>
        <a className="btn fs-5 px-4" href="/login">Login</a>
        <a className="btn fs-5 px-4">Sobre</a>
      </div> */}
      <button
        className="btn fw-bold fs-4 px-4 py-2 OneLittleFont text-light align-items-center d-flex"
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: 50,
        }}
      >
        <img src={Logo} width={25} style={{ marginRight: 10 }}/>
        {import.meta.env.VITE_APP_TITLE}
      </button>
      <a
      href="/collection"
        className="btn btn-dark fw-bold fs-5 px-4 py-2 pulse-button"
        style={{ position: "absolute", bottom: "1.5rem", right: 50, background: "#FF6711" }}
      >
        Comprar coleção
      </a>
    </>
  );
}
