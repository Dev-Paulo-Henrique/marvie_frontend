import { useState } from "react";
import { api } from "../../services/api";
import { Particle } from "../../components/Particle";
import { Forms } from "../../components/Forms";
import { isAxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from "react-toastify";
import { useMediaQuery } from "react-responsive";
import { Title } from "../../utils/Title";

export function ResetPassword() {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const isDesktop = useMediaQuery({ minWidth: 992 });

  Title({title: "Nova Senha"})

  const handleResetPassword = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    let valid = true;

    if (password.trim() === "") {
      setErrorPassword("Digite sua senha");
      valid = false;
    } else {
      setErrorPassword("");
    }

    if (!valid) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/password_reset/reset", {
        token,
        newPassword: password,
      });
      toast.success(response.data, {
        position: "top-center",
        toastId: "success",
        hideProgressBar: true,
        autoClose: 1000,
        pauseOnHover: false,
        closeButton: false,
        className: "text-center",
        onClose: () => {
          navigate("/admin");
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
      });
      setPassword("");
      setIsLoading(false);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          setErrorMessage(error.response.data);
          toast.error(error.response.data, {
            position: "top-center",
            toastId: "error",
            hideProgressBar: true,
            autoClose: 1000,
            pauseOnHover: false,
            className: "text-center",
            closeButton: false,
          });
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
        handleSubmit={handleResetPassword}
        title="Nova senha"
        subtitle="Digite uma nova senha."
        errorMessage={errorMessage}
        senha={password}
        setSecondField={(e) => {
          setPassword(e.target.value), setErrorPassword("");
        }}
        errorPass={errorPassword}
        showSecondField
        isLoading={isLoading}
        textSubmitButton="Enviar"
      />
    </div>
  );
}
