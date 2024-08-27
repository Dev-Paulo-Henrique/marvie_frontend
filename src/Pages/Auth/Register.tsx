import { useState } from "react";
import { api } from "../../services/api";
import Logo from "/logo.svg";
import { Particle } from "../../components/Particle";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
// import { toast } from "react-hot-toast"
import { FaHeart } from "react-icons/fa";


export function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const { token } = useAuth();

  if(token) return <Navigate to="/admin/home" replace />

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    let valid = true;

    if (email.trim() === "") {
      setErrorEmail("Digite seu e-mail");
      valid = false;
    } else {
      setErrorEmail("");
    }

    if (senha.trim() === "") {
      setErrorPass("Digite sua senha");
      valid = false;
    } else {
      setErrorPass("");
    }

    if (!valid) {
      return;
    }

    try {
      const response = await api.post("/login", { email, senha });
      // toast.success(response.data);
      const { token, userName } = response.data;
      console.log(userName)
      localStorage.setItem("authToken", token);
      localStorage.setItem("authName", userName);
      // setTimeout(() => {
        window.location.href = "/admin/home"
      // }, 2500)
    } catch (error) {
      setErrorMessage("Email ou senha incorretos");
    }
  };

  return (
    <div
      style={{ background: "var(--gray-100)" }}
      className="d-flex justify-content-end"
    >
      <Particle />
      <form
        onSubmit={handleLogin}
        className="d-flex flex-column w-25 px-5 vh-100 justify-content-center"
        style={{ background: "var(--gray-75)", zIndex: 0 }}
      >
        <a href="/">
          <img
            src={Logo}
            alt="Details"
            className="mb-3 mx-5 end-0 bottom-0 position-absolute"
            width={50}
          />
        </a>
        <div className="d-flex gap-2 align-items-center d-flex">
          <div className="d-flex align-items-center justify-content-center bg-white rounded p-1 px-2" style={{ width: "2rem", height: "2rem" }}><FaHeart size={10}/></div>
        <small style={{ color: "var(--gray-25)" }} className="mb-0">
          Cadastro
        </small>
        </div>
        <h1 className="text-white fw-bold m-0">Olá!</h1>
        <small style={{ color: "var(--gray-25)" }} className="mb-4">
          Entre para continuar
        </small>
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label text-white m-0" htmlFor="form2Example1">
            E-mail
          </label>
          <input
            type="email"
            id="form2Example1"
            className={`form-control ${
              (errorMessage || errorEmail) && "is-invalid"
            } bg-transparent border-top-0 border-end-0 border-start-0 rounded-0 text-white`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorEmail && <small className="text-danger">{errorEmail}</small>}
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label text-white m-0" htmlFor="form2Example2">
            Senha
          </label>
          <input
            type="password"
            id="form2Example2"
            className={`form-control ${
              (errorMessage || errorPass) && "is-invalid"
            } bg-transparent border-top-0 border-end-0 border-start-0 rounded-0 text-white`}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {errorPass && <small className="text-danger">{errorPass}</small>}
        </div>

        {errorMessage && (
          <small className="text-danger w-100 justify-content-center d-flex mb-3">
            {errorMessage}
          </small>
        )}

        <div className="row mb-4">
          <button
            type="submit"
            className="btn btn-light btn-block fw-bold mb-2 p-3"
          >
            Entrar
          </button>
          <div className="col d-flex justify-content-center">
            <a
              href="#"
              className="text-decoration-none mt-2 mb-4"
              style={{ color: "var(--gray-25)" }}
            >
              Esqueceu a senha?
            </a>
          </div>
          <hr />
          <a
            href="#"
            className="btn btn-block fw-bold p-3"
            style={{ background: "var(--gray-25)" }}
          >
            Cadastrar
          </a>
        </div>
      </form>
    </div>
  );
}
