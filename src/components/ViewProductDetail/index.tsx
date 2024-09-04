// import { useMediaQuery } from "react-responsive";
import {
  FaPlus,
  FaMinus,
  FaStar,
  FaRegStarHalfStroke,
  FaRegStar,
} from "react-icons/fa6";
import { Slider } from "../Slider";
import { toast } from "react-toastify";
import {
  // useNavigate,
  useParams,
} from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { Title } from "../../utils/Title";
import { useProduct } from "../../hooks/useProduct";
import { IoIosArrowRoundBack } from "react-icons/io";
import { calculateAverageRating, calculateStars } from "../../utils/Rating";

export function ViewProductDetail() {
  // const isDesktop = useMediaQuery({ minWidth: 992 });
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  // const navigate = useNavigate();
  const productId = Number(id);
  const { addItem } = useCart();
  const product = useProduct(productId);

  Title({
    title: product?.name ? product?.name : import.meta.env.VITE_APP_TITLE,
  });

  const averageRating = calculateAverageRating(product?.reviews);
  const { fullStars, halfStar, emptyStars } = calculateStars(averageRating);

  if (!product) {
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

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
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
    <section className="py-lg-5">
      <div className="container mb-lg-5">
        <div className="row gx-5">
          <Slider images={[product.firstImage, product.secondImage]} />

          <main className="col-lg-6">
            <div className="ps-lg-3">
              <small className="text-muted">
                Ref: <b>{product.id}</b>
              </small>
              <h3 className="text-dark">{product.name}</h3>
              <div className="d-flex align-items-center my-2">
                <div className="text-warning me-2">
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
                  (
                  {product.reviews && product.reviews.length > 1
                    ? `${product.reviews.length} avaliações`
                    : product.reviews?.length === 1
                    ? "1 avaliação"
                    : "Sem avaliações"}
                  )
                </small>
              </div>

              <div className="mb-2">
                {product.oldPrice && (
                  <>
                    <small className="text-decoration-line-through text-muted">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.oldPrice)}
                    </small>
                    <br />
                  </>
                )}
                <span className="h2 text-primary fw-bold">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.price)}{" "}
                  <small className="fs-5">no PIX</small>
                </span>
              </div>

              <p className="mb-4 text-justify">{product.description}</p>

              <hr />

              <div className="row mb-2">
                <div className="col-6 col-lg-4 mb-3">
                  <label className="form-label">Tamanho</label>
                  <select className="form-select">
                    {product.sizes &&
                      product.sizes.map((size) => (
                        <option key={size}>{size}</option>
                      ))}
                  </select>
                </div>
                <div className="col-6 col-lg-4 mb-3">
                  <label className="form-label">Cor</label>
                  <select className="form-select">
                    {product.colors &&
                      product.colors.map((color) => (
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
                      disabled={quantity == 1}
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
                      disabled={quantity == 10}
                      onClick={() =>
                        setQuantity((prevQuantity) => prevQuantity + 1)
                      }
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>

              <div className="d-flex">
                <button
                  onClick={handleAddToCart}
                  className="w-100 btn btn-primary p-3 fs-5"
                >
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
