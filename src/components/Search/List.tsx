import { useParams } from "react-router-dom";
import { Card } from "../Card";
import { products } from "../../utils/Cards";
import { Title } from "../../utils/Title";

export function List() {
  const { search } = useParams<{ search: string }>();
  Title({title: `Busca por "${search ? search : import.meta.env.VITE_APP_TITLE }"`})

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search ? search.toLowerCase() : "")
  );

  return (
    <>
      <div className="container mt-3">
        <h1>Busca por "{search}"</h1>
        <div className="row">
          {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
              <Card
              key={index}
              firstImage={product.firstImage}
              secondImage={product.secondImage}
              price={product.price}
              name={product.name}
              reviews={product.reviews}
              tag={product.tag}
              oldPrice={product.oldPrice}
              discount={product.discount}
              id={product.id}
              />
            ))
        ) : (
            <p className="text-center text-muted">Nenhum produto encontrado.</p>
        )}
        </div>
      </div>
    </>
  );
}
