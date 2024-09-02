import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../hooks/useCart';

export const Modal = forwardRef<HTMLDivElement>((_props, ref) => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
              <p>Seu carrinho está vazio.</p>
            ) : (
              <ul className="list-group mb-3">
                {cartItems.map(item => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                    <div>
                      <h6 className="mb-1">{item.name}</h6>
                      <small>{new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.price)}</small>
                    </div>
                    <span className="badge bg-primary rounded-pill">x{item.quantity}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="d-flex justify-content-between fw-bold">
              <span>Total:</span>
              <span>{new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(total)}</span>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={() => toast.success("Redirecionando para o checkout...", {
                position: "top-center",
                toastId: "checkout",
                hideProgressBar: true,
                autoClose: 3000,
                pauseOnHover: false,
                closeButton: false,
                className: 'text-center',
                onClose: () => {
                  navigate('/checkout');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              })}
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
