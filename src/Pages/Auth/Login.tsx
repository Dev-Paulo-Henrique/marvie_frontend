import { useState } from "react";
import { api } from "../../services/api";
import { Particle } from "../../components/Particle";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Forms } from "../../components/Forms";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useMediaQuery } from "react-responsive";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const isDesktop = useMediaQuery({ minWidth: 992 });

  if (token) return <Navigate to="/admin/home" replace />;

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
      setErrorMessage("")
      return;
    }

    try {
      const response = await api.post("/users/login", { email, senha });
      // toast.success(response.data);
      const { token, userName, auth } = response.data;
      console.log(auth);
      localStorage.setItem("authToken", token);
      localStorage.setItem("authName", userName);
      // setTimeout(() => {
      window.location.href = "/admin/home";
      // }, 2500)
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          setErrorMessage(error.response.data);
          toast.error(error.response.data);
          setIsLoading(false);
          console.log(error.response.data)
        }
      } else {
        console.log("Erro desconhecido:", error);
      }
    }
  };

  return (
    <div
      style={{ background: "var(--gray-100)" }}
      className="d-flex justify-content-end"
    >
      {isDesktop && <Particle />}
      <Forms
        handleSubmit={handleLogin}
        title="Bem-vindo!"
        subtitle="Entre para continuar"
        errorMessage={errorMessage}
        email={email}
        setFirstField={(e) => setEmail(e.target.value)}
        errorEmail={errorEmail}
        errorPass={errorPass}
        senha={senha}
        setSecondField={(e) => setSenha(e.target.value)}
        showRegisterButton
        showLink
        showFirstField
        showSecondField
        isLoading={isLoading}
        textSubmitButton="Entrar"
        url="/forgotPassword"
        textLink="Esqueceu a senha?"
      />
    </div>
  );
}
