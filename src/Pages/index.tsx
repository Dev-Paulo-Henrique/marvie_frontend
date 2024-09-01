import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Banner } from "../components/Banner";
import { Card } from "../components/Card";
import { products } from "./../utils/Cards"

export function Main() {
  return (
    <>
      <Header />
      <Banner />
      <div className="container mt-3">
        <h1 className="text-dark">Tendências</h1>
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
      </div>
      <Footer />
    </>
  );
}
