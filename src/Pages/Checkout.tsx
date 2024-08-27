import { Footer } from "../components/Footer";
import { CheckoutForm } from "../components/Forms/Checkout";
import { Header } from "../components/Header";
import { Resume } from "../components/Resume"

export function Checkout() {
  return (
    <>
      <Header isCart />

      <div className="container mt-5">
        <main>
          <div className="row g-5">
            <Resume />
            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Endereço de cobrança</h4>
              <form className="needs-validation was-validated" noValidate>
                <CheckoutForm />

                <hr className="my-4" />

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="same-address"
                  />
                  <label className="form-check-label" htmlFor="same-address">
                    O endereço de envio é o mesmo que o endereço de cobrança
                  </label>
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="save-info"
                  />
                  <label className="form-check-label" htmlFor="save-info">
                    Salvar essas informações para a próxima vez
                  </label>
                </div>

                <hr className="my-4" />

                <h4 className="mb-3">Pagamento</h4>

                <div className="my-3">
                  <div className="form-check">
                    <input
                      id="credit"
                      name="paymentMethod"
                      type="radio"
                      className="form-check-input"
                      checked
                      required
                    />
                    <label className="form-check-label" htmlFor="credit">
                      Cartão de crédito
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="debit"
                      name="paymentMethod"
                      type="radio"
                      className="form-check-input"
                      required
                    />
                    <label className="form-check-label" htmlFor="debit">
                      Cartão de débito
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="pix"
                      name="paymentMethod"
                      type="radio"
                      className="form-check-input"
                      required
                    />
                    <label className="form-check-label" htmlFor="pix">
                      Pix
                    </label>
                  </div>
                </div>

                <div className="row gy-3">
                  <div className="col-md-6">
                    <label htmlFor="cc-name" className="form-label">
                      Nome no cartão
                    </label>
                    <input
                      type="text"
                      className="form-control text-uppercase"
                      id="cc-name"
                      placeholder=""
                      required
                    />
                    <small className="text-muted">
                      Nome completo como exibido no cartão
                    </small>
                    <div className="invalid-feedback">
                      Este campo é obrigatório.
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="cc-number" className="form-label">
                      Número do cartão
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-number"
                      placeholder=""
                      required
                    />
                    <div className="invalid-feedback">
                      Este campo é obrigatório.
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="cc-expiration" className="form-label">
                      Validade
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-expiration"
                      placeholder=""
                      required
                    />
                    <div className="invalid-feedback">
                      Este campo é obrigatório.
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="cc-cvv" className="form-label">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-cvv"
                      placeholder=""
                      required
                    />
                    <div className="invalid-feedback">
                      Este campo é obrigatório.
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <button className="w-100 btn btn-primary btn-lg" type="submit">
                  Finalizar
                </button>
              </form>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
