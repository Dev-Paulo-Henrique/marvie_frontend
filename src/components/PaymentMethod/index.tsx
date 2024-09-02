export function PaymentMethod() {
  return (
    <div className="my-3">
      <h4 className="mb-3">Pagamento</h4>
      <div className="form-check">
        <input
          id="credit"
          name="paymentMethod"
          type="radio"
          className="form-check-input"
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
  );
}
