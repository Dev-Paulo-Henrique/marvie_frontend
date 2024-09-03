import { Spline } from "../components/Dashboards/Spline";
import { Title } from "../utils/Title";
import { Header } from "./Admin/Header";

export function Dashboard() {
    Title({title: "Dashboard"})

  return (
    <>
    <Header title="Visão Geral"/>
      <div className="d-flex justify-content-between flex-wrap pb-2">
        <Spline height={150} type="area"  action="realizados" count={28} title="Vendas" value="R$ 2.630,08"/>
        <Spline height={150} type="area" action="pagos" count={12} title="Pedidos" value="R$ 943,64"/>
        <Spline height={150} type="bar" title="Conversão do Checkout" value="20.51%"/>
        <Spline height={150} type="area" title="Ticket médio" value="R$ 93,93"/>
        <Spline height={150} type="area" title="Pedidos cancelados" value="61%"/>
        <Spline height={150} type="area" title="Conversão de boletos" value="31%"/>
        <Spline height={150} type="area" title="Conversão de pix" value="60%"/>
        <Spline height={150} type="area" title="Clientes recorrentes" value="25%"/>
        <Spline height={150} type="bar" title="Carrinhos abandonados" value="25%"/>
        <Spline height={150} type="line" title="Parcelamentos" value="25%"/>
        <Spline height={150} type="area" title="Formas de pagamento" value="25%"/>
        <Spline height={150} type="area" title="Top vendas por estado" value="25%"/>
      </div>
    </>
  );
}
