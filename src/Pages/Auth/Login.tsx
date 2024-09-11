import { useState } from "react";
import { api } from "../../services/api";
import { Particle } from "../../components/Particle";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Forms } from "../../components/Forms";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";
import { Title } from "../../utils/Title";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token, setToken, setUserName, userName } = useAuth();

  const isDesktop = useMediaQuery({ minWidth: 992 });

  const navigate = useNavigate();

  Title({ title: "Login" });

  if (token) {
    navigate(userName === "Administrador" ? "/admin/home" : "/my/orders");
  }

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
      setErrorMessage("");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/users/login", { email, senha });
      const { token, userName } = response.data;

      setToken(token);
      setUserName(userName);

      toast.success(`Bem-vindo(a) ${userName}`, {
        position: "top-center",
        toastId: "success",
        hideProgressBar: true,
        autoClose: 3000,
        pauseOnHover: false,
        closeButton: false,
        className: "text-center",
        onClose: () => {
          navigate(userName === "Administrador" ? "/admin/home" : "/my/orders");
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
      });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          setErrorMessage(error.response.data);
          toast.error(error.response.data, {
            position: "top-center",
            toastId: "error",
            hideProgressBar: true,
            autoClose: 3000,
            pauseOnHover: false,
            className: "text-center",
            closeButton: false,
          });
        }
      } else {
        console.log("Erro desconhecido:", error);
      }
    } finally {
      setIsLoading(false);
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
