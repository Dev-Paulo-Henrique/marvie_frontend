import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Banner } from "../components/Banner";
import { Card } from "../components/Card";
import { products } from "./../utils/Cards";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { ProductsProps } from "./Products";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";

export function Main() {
  const [productsDB, setProductsDB] = useState<ProductsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProductsDB(response.data);
      } catch (err) {
        setError("Erro ao buscar produtos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  console.log(productsDB)

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <Error/>;
  }

  return (
    <>
      <Header />
      <Banner />
      <div className="container">
        <h1 className="text-dark mt-4">Tendências</h1>
        <div className="row">
          {products.length > 0 ? (
            products.map((product, index) => (
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
        <div className="row">
          {productsDB && <h1 className="text-dark mt-4">Novidade</h1>}
          {productsDB.length > 0 && (
            productsDB.map((product: ProductsProps, index: number) => (
                <Card
                  key={index}
                  firstImage={product.image_id[0]}
                  secondImage={product.image_id[1]}
                  price={product.valor}
                  name={product.nome}
                  reviews={product.ratings?.map(rating => 
                    typeof rating === 'string' ? parseFloat(rating) : rating)}
                  tag={product.status}
                  // oldPrice={product.valor}
                  // discount={product.valor}
                  id={product.id}
                />
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
