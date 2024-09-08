import { isAxiosError } from "axios";
import { createContext, ReactNode, useState, useEffect } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";

type AuthContextType = {
  token: string | null;
  userName: string | null;
  setToken: (token: string | null) => void;
  setUserName: (userName: string | null) => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUserName = localStorage.getItem("authName");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  async function validateToken(token: string) {
    try {
      const response = await api.get("/token", {
        headers: {
          "x-access-token": token,
        },
      });

      const userData = response.data;
      setToken(token);
      setUserName(userData.userName);
      localStorage.setItem("authToken", token);
      localStorage.setItem("authName", userData.userName);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("authName");
          setToken(null);
          setUserName(null);
          toast("Você excedeu o tempo limite de login", {
            position: "top-center",
            toastId: "limit",
            hideProgressBar: true,
            autoClose: 3000,
            pauseOnHover: false,
            closeButton: false,
            className: "text-center",
          });
        }
      } else {
        console.error("Erro desconhecido:", error);
      }
    }
  }

  useEffect(() => {
    if (token) {
      validateToken(token);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, userName, setToken, setUserName }}>
      {children}
    </AuthContext.Provider>
  );
}
