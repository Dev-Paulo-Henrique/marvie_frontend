import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";
import {
  FaStar,
  FaRegStarHalfStroke,
  FaRegStar,
  FaMagnifyingGlass,
  FaHeart,
} from "react-icons/fa6";
import { CardProps } from "../../utils/Cards";
import { useCart } from "../../hooks/useCart";
// import { useNavigate } from "react-router-dom";

export function Card({
  name,
  firstImage,
  secondImage,
  price,
  oldPrice,
  tag,
  discount,
  reviews,
  id,
}: CardProps) {
  // const navigate = useNavigate();
  const { addItem, addFavorite, removeFavorite, isFavorite } = useCart();

  const handleFavoriteClick = () => {
    if (isFavorite(id)) {
      removeFavorite(id);
      toast(`💔 Removido dos favoritos`, {
        position: "top-center",
        toastId: "removeFavorite",
        hideProgressBar: true,
        autoClose: 3000,
        pauseOnHover: false,
        closeButton: false,
        className: "text-center",
      });
    } else {
      addFavorite(id);
      toast(`❤️ Adicionado aos favoritos`, {
        position: "top-center",
        toastId: "addFavorite",
        hideProgressBar: true,
        autoClose: 3000,
        pauseOnHover: false,
        closeButton: false,
        className: "text-center",
      });
    }
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-6 mt-3">
      <div className="product-grid">
        <div className="product-image">
          <a href={`/product/${id}`} className="image">
            <img className="img-1" src={firstImage} />
            <img className="img-2" src={secondImage} />
          </a>
          {tag && <span className="product-hot-label">{tag}</span>}
          {discount && oldPrice && (
            <span className="product-discount-label">-{discount}%</span>
          )}
          <ul className="product-links">
            <li>
              <a
                // href="#"
                onClick={handleFavoriteClick}
              >
                {isFavorite(id) ? <FaHeart color="#f00" /> : <FaHeart />}
              </a>
            </li>
            <li>
              <a
                href={`/product/${id}`}
                // onClick={() =>
                //   toast(`🔍 Carregando informações...`, {
                //     position: "top-center",
                //     toastId: "cart",
                //     hideProgressBar: true,
                //     autoClose: 3000,
                //     pauseOnHover: false,
                //     closeButton: false,
                //     className: 'text-center',
                //     onClose: () => {
                //       navigate('/product/1');
                //       window.scrollTo({ top: 0, behavior: 'smooth' });
                //     }
                //   })
                // }
              >
                <FaMagnifyingGlass />
              </a>
            </li>
            <li>
              <a
                // href="#"
                onClick={() => {
                  toast(`🛒 Adicionado ao carrinho`, {
                    position: "top-center",
                    toastId: "cart",
                    hideProgressBar: true,
                    autoClose: 3000,
                    pauseOnHover: false,
                    closeButton: false,
                    className: "text-center",
                  }),
                    addItem({
                      id,
                      name,
                      price,
                      quantity: 1,
                    });
                }}
              >
                <FaShoppingCart />
              </a>
            </li>
          </ul>
        </div>
        <div className="product-content">
          <ul className="rating">
            <FaStar size={15} />
            <FaStar size={15} />
            <FaStar size={15} />
            <FaRegStarHalfStroke size={15} />
            <FaRegStar size={15} />
            {reviews && (
              <li className="disable mx-1">
                ({reviews} {reviews > 1 ? "avaliações" : "avaliação"})
              </li>
            )}
          </ul>
          <h3 className="title">
            <a href="#" className="text-decoration-none">
              {name}
            </a>
          </h3>
          <div className="price text-primary fw-bold fs-5 d-flex flex-wrap align-items-center">
            {oldPrice && discount && (
              <span className="text-secondary">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(oldPrice)}
              </span>
            )}{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(price)}
          </div>
        </div>
      </div>
    </div>
  );
}
