import { useEffect } from "react";
import { useAuthStore } from "../hooks";
import { Publica } from "./Publica/Publica";
import { Privada } from "./Privada/Privada";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();
  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <h3>Cargando...</h3>;
  }

  return <>{status === "not-authenticated" ? <Publica /> : <Privada />}</>;
};
