import { Spline } from "../components/Dashboards/Spline";
import { Title } from "../utils/Title";
import { Header } from "./Admin/Header";

export function Dashboard() {
    Title({title: "Dashboard"})

  return (
    <>
    <Header title="Visão Geral"/>
      <div className="d-flex justify-content-between flex-wrap">
        <Spline height={150} type="area" width={400} action="realizados" count={28} title="Vendas" value="R$ 2.630,08"/>
        <Spline height={150} type="area" width={400} action="pagos" count={12} title="Pedidos" value="R$ 943,64"/>
        <Spline height={150} type="bar" width={400} title="Conversão do Checkout" value="20.51%"/>
        <Spline height={150} type="area" width={400} title="Ticket médio" value="R$ 93,93"/>
        <Spline height={150} type="area" width={400} title="Taxa de pedidos cancelados" value="61%"/>
        <Spline height={150} type="area" width={400} title="Taxa de conversão de boletos" value="31%"/>
        <Spline height={150} type="area" width={400} title="Taxa de conversão por pix" value="60%"/>
        <Spline height={150} type="area" width={400} title="Taxa de clientes recorrentes" value="25%"/>
        <Spline height={150} type="bar" width={400} title="Carrinhos abandonados" value="25%"/>
        <Spline height={150} type="line" width={400} title="Parcelamentos" value="25%"/>
        <Spline height={150} type="area" width={400} title="Formas de pagamento" value="25%"/>
        <Spline height={150} type="area" width={400} title="Top vendas por estado" value="25%"/>
        <Spline height={150} type="area" width={400} title="Top produtos" value="25%"/>
      </div>
    </>
  );
}
