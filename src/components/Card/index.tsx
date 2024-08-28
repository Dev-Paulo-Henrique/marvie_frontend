import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import {
  FaStar,
  FaRegStarHalfStroke,
  FaRegStar,
  FaMagnifyingGlass,
  FaHeart,
} from "react-icons/fa6";

interface CardProps {
  name: string;
  firstImage: string;
  secondImage: string;
  price: string;
  oldPrice?: string;
  tag?: string;
  discount?: string;
  reviews?: number;
}

export function Card({
  name,
  firstImage,
  secondImage,
  price,
  oldPrice,
  tag,
  discount,
  reviews,
}: CardProps) {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-6 mt-3">
      <div className="product-grid">
        <div className="product-image">
          <a href="#" className="image">
            <img className="img-1" src={firstImage} />
            <img className="img-2" src={secondImage} />
          </a>
          {tag && <span className="product-hot-label">{tag}</span>}
          {discount && (
            <span className="product-discount-label">{discount}</span>
          )}
          <ul className="product-links">
            <li>
              <a
                // href="#"
                onClick={() =>
                  toast(`Adicionado aos favoritos`, {
                    icon: "❤️",
                    id: "fav"
                  })
                }
              >
                <FaHeart />
              </a>
            </li>
            <li>
              <a
                // href="/product/1"
                onClick={() =>
                  toast(`Carregando informações...`, {
                    icon: "🔍",
                    id: "info"
                  })
                  // toast.promise(
                  //   null,
                  //    {
                  //      loading: 'Saving...',
                  //      success: <b>Settings saved!</b>,
                  //      error: <b>Could not save.</b>,
                  //    }
                  //  )
                }
              >
                <FaMagnifyingGlass />
              </a>
            </li>
            <li>
              <a
                // href="#"
                onClick={() =>
                  toast(`Adicionado ao carrinho`, {
                    icon: "🛒",
                    id: "cart"
                  })
                }
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
          <div className="price">
            {oldPrice && <span>{oldPrice}</span>} {price}
          </div>
        </div>
      </div>
    </div>
  );
}
