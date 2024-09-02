export function PaymentDetails() {
  return (
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
  );
}
