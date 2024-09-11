// import { useMediaQuery } from "react-responsive";
import { useAuth } from "../../hooks/useAuth";
import Steps from "rc-steps";
import "rc-steps/assets/index.css";
import { useState } from "react";

export function Order() {
  const { userName } = useAuth();
//   const isDesktop = useMediaQuery({ minWidth: 992 });
  const [current, setCurrent] = useState(0);

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="fw-normal">Olá, {userName}!</h2>
        <span className="text-secondary">
          Você fez login em: <strong>{import.meta.env.VITE_APP_TITLE}</strong>
        </span>
      </div>
      <Steps
        current={current}
        onChange={(val) => {
          // eslint-disable-next-line no-console
          console.log("Change:", val);
          setCurrent(val);
        }}
        items={[
          {
            title: "PEDIDO REALIZADO",
            description: "Etapa atual!",
          },
          {
            title: "PAGAMENTO APROVADO",
          },
          {
            title: "EM SEPARAÇÃO",
          },
          {
            title: "EM TRANSPORTE",
          },
          {
            title: "ENTREGUE",
          },
          {
            title: "CANCELADO",
          },
        ]}
      />
    </div>
  );
}
