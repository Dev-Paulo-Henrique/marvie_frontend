import { useParams } from 'react-router-dom';

export function OrderDetail() {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div>
      <h1>Detalhes do Pedido</h1>
      <p>ID do Pedido: {orderId}</p>
    </div>
  );
}
