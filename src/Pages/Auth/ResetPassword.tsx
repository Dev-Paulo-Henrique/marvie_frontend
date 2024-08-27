import { useState } from "react";
import { api } from "../../services/api";
import { Particle } from "../../components/Particle";
import { Forms } from "../../components/Forms";
import { isAxiosError } from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export function ResetPassword() {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams<{ token: string }>();

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
      toast.success(response.data);
      setPassword("");
      setIsLoading(false);
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
      <Particle />
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
