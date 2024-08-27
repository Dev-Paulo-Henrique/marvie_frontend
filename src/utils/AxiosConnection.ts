import { useEffect, useState } from "react";
import { api } from "../services/api";

export function useAxiosConnection(): { isConnected: boolean; isLoading: boolean } {
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const connectionValidation = async () => {
      try {
        const response = await api.get("/connected");
        if (response.data && response.data.status) {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    connectionValidation();
  }, []);

  return { isConnected, isLoading };
}
