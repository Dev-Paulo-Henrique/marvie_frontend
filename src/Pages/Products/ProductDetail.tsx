import { useParams } from 'react-router-dom';

export function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();

  return (
    <div>
      <h1>Detalhes do Produto</h1>
      <p>ID do Produto: {productId}</p>
    </div>
  );
}
