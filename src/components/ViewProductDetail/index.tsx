// import { useMediaQuery } from "react-responsive";
import { FaPlus, FaMinus, FaStar, FaRegStarHalfStroke } from "react-icons/fa6";

interface ViewProductDetailProps {
  id: string | undefined;
}

export function ViewProductDetail({id}: ViewProductDetailProps) {
  // const isDesktop = useMediaQuery({ minWidth: 992 });

  return (
    <section className="py-5">
      <div className="container">
        <div className="row gx-5">
          {/* Product Image and Gallery */}
          <aside className="col-lg-6">
            <div className="border rounded-4 mb-3 d-flex justify-content-center">
              <a
                data-fslightbox="mygallery"
                className="rounded-4"
                target="_blank"
                href="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big.webp"
                rel="noopener noreferrer"
              >
                <img
                  className="rounded-4 img-fluid"
                  src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big.webp"
                  alt="Main product"
                />
              </a>
            </div>
            <div className="d-flex justify-content-center mb-3">
              {["big1.webp", "big2.webp", "big3.webp", "big4.webp"].map(
                (img, index) => (
                  <a
                    key={index}
                    data-fslightbox="mygallery"
                    className="border mx-1 rounded-2"
                    target="_blank"
                    href={`https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/${img}`}
                    rel="noopener noreferrer"
                  >
                    <img
                      width="60"
                      height="60"
                      className="rounded-2 img-fluid"
                      src={`https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/${img}`}
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </a>
                )
              )}
            </div>
          </aside>

          {/* Product Details */}
          <main className="col-lg-6">
            <div className="ps-lg-3">
            <small className="text-muted">Ref: {id}</small>
              <h4 className="text-dark">
                Moletom masculino de qualidade para o inverno, moda masculina
              </h4>
              <div className="d-flex align-items-center my-2">
                <div className="text-warning me-2">
                  {[...Array(4)].map((_, i) => (
                    <FaStar size={15} key={i} />
                  ))}
                  <FaRegStarHalfStroke size={15} />
                </div>
                <span className="text-muted">(154 avaliações)</span>
              </div>

              <div className="mb-3">
                <span className="h5">R$75.00</span>
              </div>

              <p className="mb-4">
                O visual moderno e o item de demonstração de qualidade são
                inspirados no streetwear coleção que continua a romper com as
                convenções de moda convencional. Fabricadas na Itália, essas
                roupas pretas e marrons camisas de cano baixo para homens.
              </p>

              <div className="row mb-3">
                <dl className="row">
                  <dt className="col-sm-3">Tipo:</dt>
                  <dd className="col-sm-9">Regular</dd>

                  <dt className="col-sm-3">Cor:</dt>
                  <dd className="col-sm-9">Blue</dd>

                  <dt className="col-sm-3">Material:</dt>
                  <dd className="col-sm-9">Cotton, Jeans</dd>

                  <dt className="col-sm-3">Marca:</dt>
                  <dd className="col-sm-9">Marvie</dd>
                </dl>
              </div>

              <hr />

              {/* Size and Quantity Selection */}
              <div className="row mb-4">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Tamanho</label>
                  <select className="form-select">
                    <option>Pequeno</option>
                    <option>Médio</option>
                    <option>Largo</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Quantidade</label>
                  <div className="input-group">
                    <button
                      className="btn btn-secondary"
                      type="button"
                      id="button-addon1"
                    >
                      <FaMinus />
                    </button>
                    <input
                      type="text"
                      className="form-control text-center"
                      placeholder="1"
                      aria-label="Quantity"
                      aria-describedby="button-addon1"
                    />
                    <button
                      className="btn btn-secondary"
                      type="button"
                      id="button-addon2"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex">
                <a href="#" className="w-100 btn btn-primary p-3 fs-5">
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
