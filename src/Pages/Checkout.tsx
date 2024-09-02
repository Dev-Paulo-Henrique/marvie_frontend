import { FormEvent, useState } from "react";
import { Footer } from "../components/Footer";
import { CheckoutForm } from "../components/Forms/Checkout";
import { Header } from "../components/Header";
import { PaymentDetails } from "../components/PaymentDetails";
import { PaymentMethod } from "../components/PaymentMethod";
import { Resume } from "../components/Resume";
import { useCart } from "../hooks/useCart";
import { Title } from "../utils/Title";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Checkout() {
  const { cartItems, deleteItens } = useCart();
  const navigate = useNavigate();
  const [discountedTotal, setDiscountedTotal] = useState<number | null>(null);

  Title({ title: "Checkout" });

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const finalTotal = discountedTotal !== null ? discountedTotal : total;
    toast.success(
      `Compra realizada com sucesso!\n\nValor: ${new Intl.NumberFormat(
        "pt-BR",
        {
          style: "currency",
          currency: "BRL",
        }
      ).format(finalTotal)}`,
      {
        position: "top-center",
        toastId: "create",
        hideProgressBar: true,
        autoClose: 3000,
        pauseOnHover: false,
        closeButton: false,
        className: "text-center",
        onClose: () => {
          navigate("/");
          deleteItens()
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
      }
    );
  }

  return (
    <>
      <Header isCart />

      <div className="container mt-5">
        <main>
          <div className="row g-5">
            <Resume items={cartItems} onDiscountApplied={(newTotal) => setDiscountedTotal(newTotal)} />
            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Endereço de cobrança</h4>
              <form
                className="needs-validation was-validated"
                noValidate
                onSubmit={(e) => handleSubmit(e)}
              >
                <CheckoutForm />

                <hr className="my-4" />

                <PaymentMethod />
                <PaymentDetails />

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
