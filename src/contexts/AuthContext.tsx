import { isAxiosError } from 'axios';
import { createContext, ReactNode, useState, useEffect } from 'react';
import { api } from '../services/api';

type AuthContextType = {
  token: string | null;
  userName: string | null;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    async function loadToken() {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        setToken(storedToken);
        await validateToken(storedToken);
      } else {
        setToken(null);
        setUserName(null);
      }
    }

    async function validateToken(token: string) {
      try {
        const response = await api.get("/token", {
          headers: {
            "x-access-token": token,
          },
        });

        const userData = response.data;
        localStorage.setItem("authToken", token);
        setToken(token);
        setUserName(userData.userName);
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 401) {
            localStorage.removeItem("authToken");
            setToken(null);
            setUserName(null);
          }
        } else {
          console.error("Erro desconhecido:", error);
        }
      }
    }

    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, userName }}>
      {children}
    </AuthContext.Provider>
  );
}
