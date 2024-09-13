import { useMediaQuery } from "react-responsive";
import { Statics } from "../components/Stats";
import { useAuth } from "../hooks/useAuth";
import { Spline } from "../components/Dashboards/Spline";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";

export function Home() {
  const { userName, token } = useAuth();
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const [totalClients, setTotalClients] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [outOfStockProducts, setOutOfStockProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const usersResponse = await api.get("/users", {
          headers: {
            "x-access-token": token,
          },
        });
        setTotalClients(usersResponse.data.length);

        const ordersResponse = await api.get("/orders", {
          headers: {
            "x-access-token": token,
          },
        });
        setTotalOrders(ordersResponse.data.length);

        const productsResponse = await api.get("/products", {
          headers: {
            "x-access-token": token,
          },
        });

        const products = productsResponse.data;
        setTotalProducts(products.length);

        const outOfStockCount = products.filter(
          (product: { estoque: number }) => product.estoque === 0
        ).length;
        setOutOfStockProducts(outOfStockCount);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="p-4">
      <div>
        <h2 className="fw-normal">Olá, {userName}!</h2>
        <span className="text-secondary">
          Você fez login em: <strong>{import.meta.env.VITE_APP_TITLE}</strong>
        </span>
      </div>
      <div
        className={`d-flex ${
          !isDesktop && "flex-column"
        } bg-white w-100 rounded border border-secondary shadow my-4`}
      >
        <Statics count={totalClients} text="Clientes Cadastrados" />
        <Statics count={totalOrders} text="Pedidos Realizados" />
        <Statics count={totalProducts} text="Produtos em Estoque" />
        <Statics count={outOfStockProducts} text="Produtos Esgotados" />
      </div>
      <hr />
      <Spline
        height={150}
        type="line"
        action="realizados"
        count={1.282}
        title="Faturamento Mensal"
        value="R$ 32.024,89"
      />
    </div>
  );
}
