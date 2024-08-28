import { useParams } from "react-router-dom";
import { ViewProductDetail } from "../../components/ViewProductDetail";
import { Header } from "../../components/Header";
import { IoIosArrowRoundBack } from "react-icons/io";

export function ViewProduct() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Header />
      {id == "1" ? (
        <ViewProductDetail id={id} />
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <span className="text-secondary fs-5 text-center">
            Produto indisponível
          </span>
          <a href="/" className="text-muted text-decoration-none mt-2">
            <IoIosArrowRoundBack />
            Voltar
          </a>
        </div>
      )}
    </>
  );
}
