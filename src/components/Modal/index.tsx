import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../hooks/useCart";
import { MdDelete } from "react-icons/md";

export const Modal = forwardRef<HTMLDivElement>((_props, ref) => {
  const { cartItems, removeItem } = useCart();
  const navigate = useNavigate();
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className="modal fade"
      id="cartModal"
      tabIndex={-1}
      aria-labelledby="cartModalLabel"
      aria-hidden="true"
      ref={ref}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="cartModalLabel">
              Carrinho de Compras
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {cartItems.length === 0 ? (
              <p className="text-center">Seu carrinho está vazio.</p>
            ) : (
              <ul className="list-group mb-3">
                {cartItems.map((item) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={item.id}
                  >
                    <div>
                      <h6 className="mb-1">{item.name}</h6>
                      <small>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(item.price)}
                      </small>
                    </div>
                    <div className="d-flex">
                      <span className="badge bg-primary rounded-pill me-2">
                        x{item.quantity}
                      </span>
                      <button
                        className="btn btn-danger btn-sm align-items-center d-flex"
                        onClick={() => {
                          removeItem(item.id);
                          toast.success("Item removido do carrinho", {
                            position: "top-center",
                            toastId: `remove-${item.id}`,
                            hideProgressBar: true,
                            autoClose: 3000,
                            pauseOnHover: false,
                            closeButton: false,
                            className: "text-center",
                          });
                        }}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {cartItems.length > 0 && (
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(total)}
                </span>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
            {cartItems.length > 0 && (
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() =>
                  toast.success("Redirecionando para o checkout...", {
                    position: "top-center",
                    toastId: "checkout",
                    hideProgressBar: true,
                    autoClose: 3000,
                    pauseOnHover: false,
                    closeButton: false,
                    className: "text-center",
                    onClose: () => {
                      navigate("/checkout");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    },
                  })
                }
              >
                Finalizar Compra
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
