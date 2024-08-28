import { useState } from "react";
import { api } from "../../services/api";
import { Particle } from "../../components/Particle";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Forms } from "../../components/Forms";
import { toast } from "react-hot-toast";
import { isAxiosError } from "axios";
import { useMediaQuery } from "react-responsive";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
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

    if (!valid) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/password_reset/request", { email });
      toast.success(response.data);
      setIsLoading(false);
      setEmail("");
      setErrorMessage("");
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          setErrorMessage(error.response.data);
          toast.error(error.response.data);
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
