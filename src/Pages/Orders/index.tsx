import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { Title } from "../../utils/Title";
import { Header } from "../Admin/Header";
import { Pagination } from "../../components/Pagination";
import { TableRowOrders } from "../../components/Table/Body";

import visaFlag from "../../assets/payment/visa.svg";
import mastercardFlag from "../../assets/payment/mastercard.svg";
import pixFlag from "../../assets/payment/pix.svg";
import billetFlag from "../../assets/payment/billet.svg";
import { TableHeader } from "../../components/Table/Header";

import { paginate } from "../../utils/Pagination";
import { SearchAdmin } from "../../components/Search";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";

interface OrderProps {
  id: number;
  numeroPedido: string;
  createdAt: Date;
  relativeDate: Date;
  data_pedido: Date;
  total: string;
  status: string;
  clientName: string;
  paymentType: string;
  paymentFlag: string;
  final_total: string;
  order_user_id: number;
}

type PaymentType = "visa" | "mastercard" | "pix" | "billet";

const cardFlags: Record<PaymentType, string> = {
  visa: visaFlag,
  mastercard: mastercardFlag,
  pix: pixFlag,
  billet: billetFlag,
};

export function Orders() {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { token } = useAuth();

  Title({ title: "Pedidos" });

  useEffect(() => {
    const statusDescriptions = [
      "PEDIDO REALIZADO",
      "PAGAMENTO APROVADO",
      "EM SEPARAÇÃO",
      "EM TRANSPORTE",
      "ENTREGUE",
      "CANCELADO",
    ];

    const paymentTypes: PaymentType[] = ["visa", "mastercard", "pix", "billet"];
    const paymentType = faker.helpers.arrayElement(paymentTypes);

    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders", {
          headers: token ? { "x-access-token": token } : {},
        });


        const fetchedOrders = await Promise.all(
          response.data.map(async (order: OrderProps) => {
            try {
              const userResponse = await api.get(
                `/users/${order.order_user_id}`,
                {
                  headers: token ? { "x-access-token": token } : {},
                }
              );

              return {
                id: order.id,
                numeroPedido: order.id.toString(),
                createdAt: new Date(order.data_pedido),
                relativeDate: new Date(order.data_pedido),
                total: new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(order.final_total)),
                status:
                  statusDescriptions[Number(order.status)] ||
                  "Status desconhecido",
                clientName: userResponse.data.nome,
                paymentType: ["visa", "mastercard", "pix", "billet"],
                paymentFlag: cardFlags[paymentType],
              };
            } catch (userError) {
              console.error(
                "Erro ao buscar informações do usuário:",
                userError
              );
              return null;
            }
          })
        );

        setOrders(fetchedOrders.filter((order) => order !== null));
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const filteredOrders = orders.filter((order) =>
    order.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentOrders, totalPages] = paginate(
    filteredOrders,
    currentPage,
    itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Header title="Pedidos" />
      <div className="pb-4">
        <SearchAdmin
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value), setCurrentPage(1);
          }}
        />
        {currentOrders.length > 0 ? (
          <div className="d-flex justify-content-center align-items-center flex-column">
            <table className="table table-hover shadow-sm">
              <TableHeader numeroDoPedido data total status />
              <tbody>
                {currentOrders.map((order) => (
                  <TableRowOrders
                    key={order.id}
                    clientName={order.clientName}
                    createdAt={order.createdAt}
                    id={order.id}
                    numeroPedido={order.numeroPedido}
                    relativeDate={order.relativeDate}
                    status={order.status}
                    total={order.total}
                    paymentFlag={order.paymentFlag}
                  />
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItens={`${orders.length} ${
                orders.length > 1 ? "pedidos" : "pedido"
              }`}
            />
          </div>
        ) : (
          <p className="text-secondary text-center">
            Nenhum pedido encontrado.
          </p>
        )}
      </div>
    </>
  );
}
