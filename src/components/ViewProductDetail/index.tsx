import {
  FaPlus,
  FaMinus,
  FaStar,
  FaRegStarHalfStroke,
  FaRegStar,
} from "react-icons/fa6";
import { Slider } from "../Slider";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../../hooks/useCart";
import { Title } from "../../utils/Title";
import { IoIosArrowRoundBack } from "react-icons/io";
import { calculateAverageRating, calculateStars } from "../../utils/Rating";
import { api } from "../../services/api";
import { Loading } from "../Loading";
import { Error } from "../Error";
import { Product } from "../../Pages/Products/ProductDetail";
import { Reviews } from "../Reviews";

export function ViewProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [productsDB, setProductsDB] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/products/${productId}`);
        setProductsDB(response.data[0]);
      } catch (err) {
        setError("Erro ao buscar produto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productId]);

  // console.log(productsDB);
  Title({
    title: productsDB ? productsDB.nome : import.meta.env.VITE_APP_TITLE,
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (!productsDB) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <span className="text-secondary fs-3 text-center">
          Produto indisponível
        </span>
        <a href="/" className="text-muted text-decoration-none mt-3">
          <IoIosArrowRoundBack />
          Voltar
        </a>
      </div>
    );
  }

  const averageRating = calculateAverageRating(productsDB.ratings);
  const { fullStars, halfStar, emptyStars } = calculateStars(averageRating);

  const handleAddToCart = () => {
    addItem({
      id: productsDB.id,
      name: productsDB.nome,
      price: productsDB.valor,
      quantity,
    });
    toast(`🛒 Adicionado ao carrinho.`, {
      position: "top-center",
      toastId: "cart",
      hideProgressBar: false,
      autoClose: 3000,
      pauseOnHover: false,
      className: "text-center",
      closeButton: false,
      progressStyle: {
        background: "var(--blue-100)",
      },
    });
  };

  return (
    <>
      <section className="py-lg-5">
        <div className="container mb-lg-5">
          <div className="row gx-5">
            <Slider images={productsDB.image_id} />

            <main className="col-lg-6">
              <div className="ps-lg-3">
                <small className="text-muted">
                  Ref: <b>{productsDB.id}</b> |{" "}
                  <span>
                    {productsDB.estoque > 1
                      ? `${productsDB.estoque} itens`
                      : `${productsDB.estoque} item`}{" "}
                    em estoque
                  </span>
                </small>
                <h3 className="text-dark">{productsDB.nome}</h3>
                <div className="d-flex align-items-center my-2">
                  <div className="text-warning me-2 d-flex">
                    {[...Array(fullStars)].map((_, i) => (
                      <FaStar key={`full-${i}`} size={15} />
                    ))}
                    {[...Array(halfStar)].map((_, i) => (
                      <FaRegStarHalfStroke key={`half-${i}`} size={15} />
                    ))}
                    {[...Array(emptyStars)].map((_, i) => (
                      <FaRegStar key={`empty-${i}`} size={15} />
                    ))}
                  </div>
                  <small className="text-muted">
                    {productsDB.ratings
                      ? productsDB.ratings.filter((rating) => rating !== null)
                          .length > 0
                        ? `${
                            productsDB.ratings.filter(
                              (rating) => rating !== null
                            ).length
                          } ${
                            productsDB.ratings.filter(
                              (rating) => rating !== null
                            ).length === 1
                              ? "avaliação"
                              : "avaliações"
                          }`
                        : "Sem avaliações"
                      : "Sem avaliações"}
                  </small>
                </div>

                <div className="mb-2">
                  {/* {productsDB.valor && (
                    <>
                      <small className="text-decoration-line-through text-muted">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(productsDB.valor)}
                      </small>
                      <br />
                    </>
                  )} */}
                  <span className="h2 text-primary fw-bold">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(productsDB.valor)}{" "}
                    <small className="fs-5">no PIX</small>
                  </span>
                </div>

                <p className="mb-4 text-justify text-break">
                  {productsDB.descricao}
                </p>

                <hr />

                {productsDB.estoque > 0 && (
                  <div className="row mb-2">
                    <div className="col-6 col-lg-4 mb-3">
                      <label className="form-label">Tamanho</label>
                      <select className="form-select">
                        {productsDB.sizes &&
                          productsDB.sizes.map((size) => (
                            <option key={size}>{size}</option>
                          ))}
                      </select>
                    </div>
                    <div className="col-6 col-lg-4 mb-3">
                      <label className="form-label">Cor</label>
                      <select className="form-select">
                        {productsDB.colors &&
                          productsDB.colors.map((color) => (
                            <option key={color}>{color}</option>
                          ))}
                      </select>
                    </div>
                    <div className="col-lg-4 mb-3">
                      <label className="form-label">Quantidade</label>
                      <div className="input-group border rounded">
                        <button
                          className="btn btn-light"
                          type="button"
                          disabled={quantity === 1}
                          onClick={() =>
                            setQuantity((prevQuantity) =>
                              prevQuantity > 1 ? prevQuantity - 1 : 1
                            )
                          }
                        >
                          <FaMinus />
                        </button>
                        <input
                          type="number"
                          className="form-control text-center border-0"
                          aria-label="Quantity"
                          value={quantity}
                          readOnly
                        />
                        <button
                          className="btn btn-light"
                          type="button"
                          disabled={quantity >= Number(productsDB.estoque)}
                          onClick={() =>
                            setQuantity((prevQuantity) => prevQuantity + 1)
                          }
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="d-flex">
                  <button
                    onClick={handleAddToCart}
                    disabled={productsDB.estoque === 0}
                    className={`w-100 btn ${
                      productsDB.estoque === 0 ? "btn-danger" : "btn-primary"
                    } p-3 fs-5`}
                  >
                    {productsDB.estoque === 0
                      ? "Produto indisponível"
                      : "Adicionar ao carrinho"}
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
      <Reviews isReadOnly={false} />
    </>
  );
}
