import { useState } from "react";
import { api } from "../../services/api";
import { Particle } from "../../components/Particle";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { Forms } from "../../components/Forms";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { useMediaQuery } from "react-responsive";
import { Title } from "../../utils/Title";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const isDesktop = useMediaQuery({ minWidth: 992 });

  Title({title: "Recuperar conta"})

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

    if (!valid) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/password_reset/request", { email });
      toast.success(response.data, {
        position: "top-center",
        toastId: "success",
        hideProgressBar: true,
        autoClose: 3000,
        pauseOnHover: false,
        closeButton: false,
        className: "text-center",
        onClose: () => {
          navigate("/login");
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
      });
      setIsLoading(false);
      setEmail("");
      setErrorMessage("");
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
            className: 'text-center',
            closeButton: false,
          })
          setIsLoading(false);
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
        title="Recuperar conta"
        subtitle="Digite o e-mail cadastrado."
        errorMessage={errorMessage}
        email={email}
        showFirstField
        setFirstField={(e) => setEmail(e.target.value)}
        errorEmail={errorEmail}
        isLoading={isLoading}
        textSubmitButton={"Enviar"}
        url="/login"
        showLink
        textLink="Voltar"
      />
    </div>
  );
}
