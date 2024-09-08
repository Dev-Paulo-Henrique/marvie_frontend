import { DemoViewProductDetail } from "../../components/ViewProductDetail/demo";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ViewProductDetail } from "../../components/ViewProductDetail";
import { useProduct } from "../../hooks/useProduct";
import { useParams } from "react-router-dom";

export function ViewProduct() {
  const { productId } = useParams<{ productId: string }>();
  const productIdNumber = Number(productId);
  const product = useProduct(productIdNumber);

  return (
    <>
      <Header />
      {product ? <DemoViewProductDetail /> : <ViewProductDetail />}
      <Footer />
    </>
  );
}
