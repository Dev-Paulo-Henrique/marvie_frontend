import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../Card";
import { api } from "../../services/api";
import { ProductsProps } from "../../Pages/Products";
import { Title } from "../../utils/Title";
import { isAxiosError } from "axios";
import { products } from "../../utils/Cards";

interface CombinedProductProps {
  id: number;
  name: string;
  price: number;
  firstImage: string;
  secondImage: string;
  reviews?: number[];
  tag?: string;
  oldPrice?: number;
  discount?: number;
}

export function List() {
  const { search } = useParams<{ search: string }>();
  const [productsDB, setProductsDB] = useState<ProductsProps[]>([]);

  Title({
    title: `Busca por "${search ? search : import.meta.env.VITE_APP_TITLE}"`,
  });

  useEffect(() => {
    const fetchProductsDB = async () => {
      try {
        const response = await api.get("/products");
        setProductsDB(response.data);
      } catch (err) {
        if (isAxiosError(err)) {
          if (err.response) {
            console.error(err.response.data);
          }
        } else {
          console.log("Erro desconhecido:", err);
        }
      }
    };

    fetchProductsDB();
  }, []);

  const filteredLocalProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search ? search.toLowerCase() : "")
  );

  const filteredDBProducts = productsDB.filter((product) =>
    product.nome.toLowerCase().includes(search ? search.toLowerCase() : "")
  );

  const combinedProducts: CombinedProductProps[] = [
    ...filteredLocalProducts.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      firstImage: p.firstImage,
      secondImage: p.secondImage,
      reviews: p.reviews,
      tag: p.tag,
      oldPrice: p.oldPrice,
      discount: p.discount,
    })),
    ...filteredDBProducts.map((p) => ({
      id: p.id,
      name: p.nome,
      price: p.valor,
      firstImage: p.image_id[0],
      secondImage: p.image_id[1],
      reviews: p.ratings?.map((r) =>
        typeof r === "string" ? parseFloat(r) : r
      ),
      tag: p.status,
    })),
  ];

  const seen = new Set();
  const uniqueProducts = combinedProducts.filter((product) => {
    const duplicate = seen.has(product.name.toLowerCase());
    seen.add(product.name.toLowerCase());
    return !duplicate;
  });

  return (
    <>
      <div className="container mt-3">
        <h1>Busca por "{search}"</h1>
        <div className="row">
          {uniqueProducts.length > 0 ? (
            uniqueProducts.map((product, index) => (
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
