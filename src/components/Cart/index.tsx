import { useRef } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Modal } from "../Modal";
import { useCart } from '../../hooks/useCart';
// import { CartContext } from "../../contexts/CartContext";

export function Cart() {
  const { cartItems } = useCart();
  const modalRef = useRef(null);
//   const { cartItems } = useContext(CartContext);

  const handleShow = () => {
    if (modalRef.current) {
      const modal = new window.bootstrap.Modal(modalRef.current);
      modal.show();
    }
  };

const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <div
        className="position-fixed"
        style={{
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <button
          className="btn btn-primary position-relative"
          style={{
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s, transform 0.3s",
          }}
          onClick={handleShow}
        >
          <span className="border position-absolute top-0 start-50 ms-4 translate-middle badge rounded-pill text-secondary bg-light">
            {totalItems}
          </span>
          <FaShoppingCart size={24} />
        </button>
      </div>

      <Modal ref={modalRef} />
    </>
  );
}
