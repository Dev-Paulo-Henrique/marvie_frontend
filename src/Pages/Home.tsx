// import { useState, useEffect } from "react";
import { Statics } from "../components/Stats";
import { Title } from "../utils/Title";
import { useAuth } from "../hooks/useAuth";
// import { useNavigate } from "react-router-dom";

export function Home() {
  // const [loading, setLoading] = useState(true);
  const { userName, 
    // token
   } = useAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   async function validateJWT() {
  //     if (!token) {
  //       await navigate("/login");
  //     } else {
  //       setTimeout(() => {
  //         setLoading(false);
  //       }, 1000);
  //     }
  //   }
  //   validateJWT();
  // }, [token]);

  Title({ title: "Home" });
  
  // if (loading) {
  //   return null;
  // }

  return (
    <div className="p-4">
      <div>
        <h2 className="fw-normal">Olá, {userName ? userName : "Usuário"}!</h2>
        <span className="text-secondary">
          Você fez login em: <strong>{import.meta.env.VITE_APP_TITLE}</strong>
        </span>
      </div>
      <div className="d-flex bg-white w-100 rounded border border-secondary shadow my-4">
        <Statics count={28} text="Pedidos pendentes nesta semana" />
        <Statics count={6} text="Pedidos não aprovados nesta semana" />
        <Statics count={2} text="Carrinhos abandonados nesta semana" />
        <Statics count={3} text="Produtos sem estoque" />
      </div>
      <hr />
    </div>
  );
}
