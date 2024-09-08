import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";
import { Slider } from "../../components/Slider";
import { useMediaQuery } from "react-responsive";
import { useAuth } from "../../hooks/useAuth";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { MdOutlineArrowOutward } from "react-icons/md";

export interface Product {
  id: number;
  nome: string;
  descricao: string;
  estoque: number;
  valor: number;
  cat_id: number;
  status: string;
  image_id: string[];
  sizes: string[];
  colors: string[];
  ratings?: number[];
}

export function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | null>(false);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const { token } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        if (!productId) {
          setError(true);
        }

        const response = await api.get<Product[]>(`/products/${productId}`);

        if (response.status !== 200) {
          setError(true);
        }

        if (response.data.length > 0) {
          setProduct(response.data[0]);
          console.log(response.data[0]);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Erro ao buscar detalhes do produto:", err);
        setError(true);
        setLoading(false);
      } finally {
        setError(false);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (!product) {
    return <p>Produto não encontrado.</p>;
  }

  async function handleDeleteProduct() {
    try {
      await api.delete(`/products/${productId}`, {
        headers: token ? { "x-access-token": token } : {},
      });
      toast.success("Produto deletado", {
        position: "top-center",
        toastId: "create",
        hideProgressBar: true,
        autoClose: 3000,
        pauseOnHover: false,
        closeButton: false,
        className: "text-center",
        onClose: () => {
          navigate("/admin/products");
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
      });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data, {
            position: "top-center",
            toastId: "create",
            hideProgressBar: true,
            autoClose: 3000,
            pauseOnHover: false,
            closeButton: false,
            className: "text-center",
          });
        }
      } else {
        console.log("Erro desconhecido:", error);
      }
    }
  }

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="text-muted">Detalhes do Produto</h1>
        <button
          onClick={() => navigate(`/view/${product.id}`)}
          className="btn border btn-primary fs-6 fw-normal text-decoration-none d-flex align-items-center gap-1"
        >
          <MdOutlineArrowOutward />
          Ver na loja
        </button>
      </div>
      <div className={`d-flex ${!isDesktop && "flex-column"} gap-3`}>
        {product.image_id.length > 0 && <Slider images={product.image_id} />}
        <div
          className={`d-flex ${
            !isDesktop ? "align-items-center" : " mt-4"
          } flex-column w-100`}
        >
          <h2
            className={`text-primary text-break mb-2 ${
              !isDesktop && "text-center"
            }`}
          >
            {product.nome}
          </h2>
          <div className="mb-4 w-100">
            <h5>Informações</h5>
            <ul className="list-group">
              <li className="list-group-item text-break">
                <strong>ID do Produto:</strong> {product.id}
              </li>
              <li className="list-group-item text-break">
                <strong>Nome:</strong> {product.nome}
              </li>
              <li className="list-group-item text-break">
                <strong>Descrição:</strong> {product.descricao}
              </li>
              <li className="list-group-item text-break">
                <strong>Estoque:</strong> {product.estoque}
              </li>
              <li className="list-group-item text-break">
                <strong>Valor:</strong>{" "}
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.valor)}
              </li>
              <li className="list-group-item text-break">
                <strong>Categoria ID:</strong> {product.cat_id}
              </li>
              <li className="list-group-item text-break">
                <strong>Status:</strong> {product.status}
              </li>
              <li className="list-group-item text-break">
                <strong>Tamanhos:</strong> {product.sizes.join(", ")}
              </li>
              <li className="list-group-item text-break">
                <strong>Cores:</strong> {product.colors.join(", ")}
              </li>
            </ul>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button
              onClick={() => navigate(`/admin/products/${product.id}/edit`)}
              className="btn btn-warning"
            >
              Editar
            </button>
            <button onClick={handleDeleteProduct} className="btn btn-danger">
              Deletar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
