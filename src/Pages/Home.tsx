import { useMediaQuery } from "react-responsive";
import { Statics } from "../components/Stats";
import { useAuth } from "../hooks/useAuth";

export function Home() {
  const { userName } = useAuth();
  const isDesktop = useMediaQuery({ minWidth: 992 });

  return (
    <div className="p-4">
      <div>
        <h2 className="fw-normal">Olá, {userName}!</h2>
        <span className="text-secondary">
          Você fez login em: <strong>{import.meta.env.VITE_APP_TITLE}</strong>
        </span>
      </div>
      <div className={`d-flex ${!isDesktop && "flex-column"} bg-white w-100 rounded border border-secondary shadow my-4`}>
        <Statics count={28} text="Pedidos pendentes nesta semana" />
        <Statics count={6} text="Pedidos não aprovados nesta semana" />
        <Statics count={2} text="Carrinhos abandonados nesta semana" />
        <Statics count={3} text="Produtos sem estoque" />
      </div>
      <hr />
    </div>
  );
}
