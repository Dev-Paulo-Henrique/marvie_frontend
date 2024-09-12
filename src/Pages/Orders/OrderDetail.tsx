import { useMediaQuery } from "react-responsive";
import { useAuth } from "../../hooks/useAuth";
import Steps from "rc-steps";
import "rc-steps/assets/index.css";
import { ReactNode, useEffect, useState } from "react";
import { api } from "../../services/api";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";
import { addDays, format } from "date-fns";
import { useParams } from "react-router-dom";

interface StepProps {
  status: string;
  node: ReactNode;
}

interface Order {
  id: number;
  image_id: string[];
  final_total: number;
  nome: string;
  ratings?: (number | string)[];
  data_pedido: string;
  status: number;
  cart: CartItem[];
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export function OrderDetail() {
  const { token } = useAuth();
  const isDesktop = useMediaQuery({ minWidth: 992 });
  // const [current, setCurrent] = useState(0);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { orderId } = useParams<{ orderId: string }>();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await api.get(`/orders/${orderId}`, {
          headers: { "x-access-token": token },
        });
        setOrder(response.data);
      } catch (err) {
        setError("Erro ao buscar detalhes do pedido.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [orderId, token]);

  const handleChange = async (newStatus: number) => {
    if (order && order.status < newStatus) {
      try {
        await api.put(`/orders/${orderId}`, {
          status: newStatus,
        }, {
          headers: { "x-access-token": token },
        });

        setOrder(prevOrder => prevOrder ? { ...prevOrder, status: newStatus } : null);
      } catch (err) {
        setError("Erro ao atualizar o status do pedido.");
        console.error(err);
      }
    }
  };
  
  // console.log(order);

  function stepIcon({ status, node }: StepProps) {
    const isFinish = status === "finish";
    const isProcessing = status === "process";

    return (
      <div
        style={{
          backgroundColor: isFinish
            ? "blue"
            : isProcessing
            ? "green"
            : "transparent",
          color: isFinish ? "white" : isProcessing ? "white" : "black",
          borderRadius: "50%",
          width: "24px",
          height: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {node}
      </div>
    );
  }

  if (loading) return <Loading />;
  if (error) return <Error />;

  const deliveryDate = order ? addDays(new Date(order.data_pedido), 15) : null;

  const getStepStatus = (stepIndex: number) => {
    if (!order) return "wait";
    if (order.status > stepIndex) return "finish";
    if (order.status === stepIndex) return "process";
    return "wait";
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="fw-normal">Resmo do pedido de Nº {order && order.id}</h2>
        <span className="text-secondary">
          Previsão de entrega:{" "}
          <strong>
            {deliveryDate ? format(deliveryDate, "dd/MM/yyyy") : "Indisponível"}
          </strong>
        </span>
      </div>

      {order && (
        <>
          <div className="list-group my-4">
            <div
              key={order.id}
              className="list-group-item list-group-item-action mb-3 p-3 border rounded shadow-sm"
            >
              <Steps
                current={order.status}
                stepIcon={stepIcon}
                className="mb-3"
                onChange={handleChange}
                direction={isDesktop ? "horizontal" : "vertical"}
                items={[
                  {
                    title: "PEDIDO REALIZADO",
                    status: getStepStatus(0),
                    description: order.status === 0 ? "Etapa atual!" : "",
                    disabled: order.status > 0,
                  },
                  {
                    title: "PAGAMENTO APROVADO",
                    status: getStepStatus(1),
                    description: order.status === 1 ? "Etapa atual!" : "",
                    disabled: order.status > 1,
                  },
                  {
                    title: "EM SEPARAÇÃO",
                    status: getStepStatus(2),
                    description: order.status === 2 ? "Etapa atual!" : "",
                    disabled: order.status > 2,
                  },
                  {
                    title: "EM TRANSPORTE",
                    status: getStepStatus(3),
                    description: order.status === 3 ? "Etapa atual!" : "",
                    disabled: order.status > 3,
                  },
                  {
                    title: "ENTREGUE",
                    status: getStepStatus(4),
                    description: order.status === 4 ? "Etapa atual!" : "",
                    disabled: order.status > 4,
                  },
                  {
                    title: "CANCELADO",
                    status: getStepStatus(5),
                    description: order.status === 5 ? "Etapa atual!" : "",
                    disabled: order.status > 5,
                  },
                ]}
              />
              <div>
                {order.cart.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex justify-content-between align-items-center mb-4"
                  >
                    <div>
                      <h5 className="mb-0">
                        Produto: <span className="fw-normal">{item.name}</span>
                      </h5>
                      <small className="text-muted">
                        Quantidade: {item.quantity}
                      </small>
                    </div>
                    <div className="">
                      <small className="text-muted">
                        Preço Unitário:{" "}
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(item.price)}
                      </small>
                    </div>
                  </div>
                ))}

                <div className="text-muted d-flex justify-content-between mt-3">
                  <small>
                    Valor Total:{" "}
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(order.final_total)}
                  </small>
                  <small>
                    Data do Pedido:{" "}
                    {format(new Date(order.data_pedido), "dd/MM/yyyy")}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}