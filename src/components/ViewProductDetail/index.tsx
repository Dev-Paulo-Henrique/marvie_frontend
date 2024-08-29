// import { useMediaQuery } from "react-responsive";
import { FaPlus, FaMinus, FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { ProductSlider } from "../Slider";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface ViewProductDetailProps {
  id: string | undefined;
}

export function ViewProductDetail({id}: ViewProductDetailProps) {
  // const isDesktop = useMediaQuery({ minWidth: 992 });
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  return (
    <section className="py-lg-5">
      <div className="container">
        <div className="row gx-5">
          {/* Product Image and Gallery */}
          <ProductSlider/>

          <main className="col-lg-6">
            <div className="ps-lg-3">
            <small className="text-muted">Ref: {id}</small>
              <h3 className="text-dark">
                Moletom masculino de qualidade para o inverno
              </h3>
              <div className="d-flex align-items-center my-2">
                <div className="text-warning me-2">
                  {[...Array(4)].map((_, i) => (
                    <FaStar size={20} key={i} />
                  ))}
                  <FaRegStarHalfStroke size={20} />
                </div>
                <small className="text-muted">(154 avaliações)</small>
              </div>

              <div className="mb-2">
                <small className="text-decoration-line-through text-muted">R$ 98,99</small>
                <br />
                <span className="h2 text-primary fw-bold">R$ 75,00 <small className="fs-5">no PIX</small></span>
              </div>

              <p className="mb-4 text-justify">
                O visual moderno e o item de demonstração de qualidade são
                inspirados no streetwear coleção que continua a romper com as
                convenções de moda convencional. Fabricadas na Itália, essas
                roupas pretas e marrons camisas de cano baixo para homens.
              </p>

              <hr />

              <div className="row mb-2">
                <div className="col-6 col-lg-4 mb-3">
                  <label className="form-label">Tamanho</label>
                  <select className="form-select">
                    <option>Pequeno</option>
                    <option>Médio</option>
                    <option>Largo</option>
                  </select>
                </div>
                <div className="col-6 col-lg-4 mb-3">
                  <label className="form-label">Cor</label>
                  <select className="form-select">
                    <option>Azul</option>
                    <option>Branco</option>
                    <option>Vermelho</option>
                  </select>
                </div>
                <div className="col-lg-4 mb-3">
                  <label className="form-label">Quantidade</label>
                  <div className="input-group border rounded">
                    <button
                      className="btn btn-light"
                      type="button"
                      disabled={quantity == 1}
                      onClick={() => setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1))}
                      >
                      <FaMinus/>
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
                      onClick={() => setQuantity(prevQuantity => prevQuantity + 1)}
                    >
                      <FaPlus/>
                    </button>
                  </div>
                </div>
              </div>

              <div className="d-flex">
                <a
                //  href="#"
                onClick={() =>
                  toast(`🛒 Redirecionando para o carrinho...`, {
                    position: "top-center",
                    toastId: "cart",
                    hideProgressBar: false,
                    autoClose: 3000,
                    pauseOnHover: false,
                    className: 'text-center',
                    closeButton: false,
                    progressStyle: {
                      background: "var(--blue-100)",
                    },
                    onClose: () => {
                      navigate('/checkout');
                    }
                  })
                }
                 className="w-100 btn btn-primary p-3 fs-5">
                  Comprar agora
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
