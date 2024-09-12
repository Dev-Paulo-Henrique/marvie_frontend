// import { useMediaQuery } from "react-responsive";
// import { useAuth } from "../../hooks/useAuth";
// import Steps from "rc-steps";
// import "rc-steps/assets/index.css";
// import { ReactNode, useEffect, useState } from "react";
// import { api } from "../../services/api";
// import { Loading } from "../../components/Loading";
// import { Error } from "../../components/Error";
// import { addDays, format } from "date-fns";
// import { useParams } from "react-router-dom";

// interface StepProps {
//   status: string;
//   node: ReactNode;
// }

// interface Order {
//   id: number;
//   image_id: string[];
//   final_total: number;
//   nome: string;
//   ratings?: (number | string)[];
//   data_pedido: string;
//   status: number;
//   cart: CartItem[];
// }

// interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
// }

// export function Order() {
//   const { userName, token } = useAuth();
//   const isDesktop = useMediaQuery({ minWidth: 992 });
//   // const [current, setCurrent] = useState(0);
//   const [order, setOrder] = useState<Order | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const { orderId } = useParams<{ orderId: string }>();

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const response = await api.get(`/orders/${orderId}`, {
//           headers: { "x-access-token": token },
//         });
//         setOrder(response.data);
//       } catch (err) {
//         setError("Erro ao buscar detalhes do pedido.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchOrderDetails();
//   }, [orderId, token]);
  
//   // console.log(order);

//   function stepIcon({ status, node }: StepProps) {
//     const isFinish = status === "finish";
//     const isProcessing = status === "process";

//     return (
//       <div
//         style={{
//           backgroundColor: isFinish
//             ? "blue"
//             : isProcessing
//             ? "green"
//             : "transparent",
//           color: isFinish ? "white" : isProcessing ? "white" : "black",
//           borderRadius: "50%",
//           width: "24px",
//           height: "24px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         {node}
//       </div>
//     );
//   }

//   if (loading) return <Loading />;
//   if (error) return <Error />;

//   const deliveryDate = order ? addDays(new Date(order.data_pedido), 15) : null;

//   const getStepStatus = (stepIndex: number) => {
//     if (!order) return "wait";
//     if (order.status > stepIndex) return "finish";
//     if (order.status === stepIndex) return "process";
//     return "wait";
//   };

//   return (
//     <div className="p-4">
//       <div className="mb-4">
//         <h2 className="fw-normal">#{order && order.id} - Resmo do pedido de {userName}!</h2>
//         <span className="text-secondary">
//           Previsão de entrega:{" "}
//           <strong>
//             {deliveryDate ? format(deliveryDate, "dd/MM/yyyy") : "Indisponível"}
//           </strong>
//         </span>
//       </div>

//       {order && (
//         <>
//           <div className="list-group my-4">
//             <div
//               key={order.id}
//               className="list-group-item list-group-item-action mb-3 p-3 border rounded shadow-sm"
//             >
//               <Steps
//                 current={order.status}
//                 stepIcon={stepIcon}
//                 className="mb-3"
//                 direction={isDesktop ? "horizontal" : "vertical"}
//                 items={[
//                   {
//                     title: "PEDIDO REALIZADO",
//                     status: getStepStatus(0),
//                     description: order.status === 0 ? "Etapa atual!" : "",
//                     disabled: true,
//                   },
//                   {
//                     title: "PAGAMENTO APROVADO",
//                     status: getStepStatus(1),
//                     description: order.status === 1 ? "Etapa atual!" : "",
//                     disabled: true,
//                   },
//                   {
//                     title: "EM SEPARAÇÃO",
//                     status: getStepStatus(2),
//                     description: order.status === 2 ? "Etapa atual!" : "",
//                     disabled: true,
//                   },
//                   {
//                     title: "EM TRANSPORTE",
//                     status: getStepStatus(3),
//                     description: order.status === 3 ? "Etapa atual!" : "",
//                     disabled: true,
//                   },
//                   {
//                     title: "ENTREGUE",
//                     status: getStepStatus(4),
//                     description: order.status === 4 ? "Etapa atual!" : "",
//                     disabled: true,
//                   },
//                   {
//                     title: "CANCELADO",
//                     status: getStepStatus(5),
//                     description: order.status === 5 ? "Etapa atual!" : "",
//                     disabled: true,
//                   },
//                 ]}
//               />
//               <div>
//                 {order.cart.map((item) => (
//                   <div
//                     key={item.id}
//                     className="d-flex justify-content-between align-items-center mb-4"
//                   >
//                     <div>
//                       <h5 className="mb-0">
//                         Produto: <span className="fw-normal">{item.name}</span>
//                       </h5>
//                       <small className="text-muted">
//                         Quantidade: {item.quantity}
//                       </small>
//                     </div>
//                     <div className="">
//                       <small className="text-muted">
//                         Preço Unitário:{" "}
//                         {new Intl.NumberFormat("pt-BR", {
//                           style: "currency",
//                           currency: "BRL",
//                         }).format(item.price)}
//                       </small>
//                     </div>
//                   </div>
//                 ))}

//                 <div className="text-muted d-flex justify-content-between mt-3">
//                   <small>
//                     Valor Total:{" "}
//                     {new Intl.NumberFormat("pt-BR", {
//                       style: "currency",
//                       currency: "BRL",
//                     }).format(order.final_total)}
//                   </small>
//                   <small>
//                     Data do Pedido:{" "}
//                     {format(new Date(order.data_pedido), "dd/MM/yyyy")}
//                   </small>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


// export function Orders() {
//   // const isDesktop = useMediaQuery({ minWidth: 992 });
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const { userName, token } = useAuth();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await api.get("/orders", {
//           headers: { "x-access-token": token },
//         });
//         setOrders(response.data);
//       } catch (err) {
//         setError("Erro ao buscar pedidos.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [token]);

//   if (loading) return <Loading />;
//   if (error) return <Error />;

//   return (
//     <div className="p-4">
//       <div className="mb-4">
//         <h2 className="fw-normal">Olá, {userName}!</h2>
//         <span className="text-secondary">
//           Você fez login em: <strong>{import.meta.env.VITE_APP_TITLE}</strong>
//         </span>
//       </div>

//       {orders.length > 0 ? (
//         orders.map((order, index) => {
//           const deliveryDate = addDays(new Date(order.data_pedido), 15);
//           return (
//             <a
//               href={`/my/orders/${order.id}`}
//               key={order.id}
//               className="list-group my-4 text-decoration-none"
//             >
//               <div className="list-group-item list-group-item-action mb-3 p-3 border rounded shadow-sm">
//                 <div>
//                   <div className="d-flex align-items-center justify-content-between">
//                   <h5 className="mb-0">Pedido de Nº {index + 1}</h5>
//                   <small className="text-muted">
//                       Previsão de Entrega:{" "}
//                       <strong>{format(deliveryDate, "dd/MM/yyyy")}</strong>
//                     </small>
//                   </div>
//                   <div className="my-2">
//                     {/* Aqui você pode descomentar para mostrar itens do carrinho */}
//                     {/* {order.cart.map((item) => (
//                       <div
//                         key={item.id}
//                         className="d-flex justify-content-between align-items-center mb-2"
//                       >
//                         <div>
//                           <h6 className="mb-0">
//                             Produto: <span className="fw-normal">{item.name}</span>
//                           </h6>
//                           <small className="text-muted">Quantidade: {item.quantity}</small>
//                         </div>
//                         <div>
//                           <small className="text-muted">
//                             Preço Unitário:{" "}
//                             {new Intl.NumberFormat("pt-BR", {
//                               style: "currency",
//                               currency: "BRL",
//                             }).format(item.price)}
//                           </small>
//                         </div>
//                       </div>
//                     ))} */}
//                   </div>
//                   <div className="text-muted d-flex justify-content-between mt-3">
//                     <small>
//                       Valor Total:{" "}
//                       {new Intl.NumberFormat("pt-BR", {
//                         style: "currency",
//                         currency: "BRL",
//                       }).format(order.final_total)}
//                     </small>
//                     <small className="text-muted">
//                       Data do Pedido:{" "}
//                       {format(new Date(order.data_pedido), "dd/MM/yyyy")}
//                     </small>
//                   </div>
//                 </div>
//               </div>
//             </a>
//           );
//         })
//       ) : (
//         <div className="text-center">
//           <p>Você ainda não tem pedidos.</p>
//         </div>
//       )}
//     </div>
//   );
// }