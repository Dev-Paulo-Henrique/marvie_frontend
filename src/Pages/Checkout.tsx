import { ChangeEvent, 
  // FormEvent, 
  useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Resume } from "../components/Resume";
import { useCart } from "../hooks/useCart";
import { Title } from "../utils/Title";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { Country, State } from "country-state-city";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  address2?: string;
  country: string;
  state: string;
  zip: string;
  paymentMethod: string;
  ccName: string;
  ccNumber: string;
  ccExpiration: string;
  ccCvv: string;
}

export function Checkout() {
  const [data, setData] = useState<FormData>({} as FormData);
  const { cartItems, deleteItens } = useCart();
  const navigate = useNavigate();
  const [discountedTotal, setDiscountedTotal] = useState<number | null>(null);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  console.log({ data, state });

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(country);

  const selectElement = document.querySelector("#state") as HTMLSelectElement;

  Title({ title: "Checkout" });

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const zipInput = document.getElementById("zip") as HTMLInputElement;

    const formatCEP = (event: Event) => {
      const input = event.target as HTMLInputElement;
      let value = input.value.replace(/\D/g, "");

      if (value.length > 5) {
        value = `${value.slice(0, 5)}-${value.slice(5, 8)}`;
      }

      input.value = value;
    };

    zipInput.addEventListener("input", formatCEP);

    return () => {
      zipInput.removeEventListener("input", formatCEP);
    };
  }, []);

  const {
    register,
    handleSubmit,
    // watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      state: "",
    },
    mode: "onChange",
  });

  // Função de envio do formulário
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const forms =
      document.querySelectorAll<HTMLFormElement>(".needs-validation");

    Array.from(forms).forEach((form) => {
      form.classList.add("was-validated");

      form.addEventListener(
        "submit",
        (event: Event) => {
          const target = event.target as HTMLFormElement;

          if (!target.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          target.classList.add("was-validated");
        },
        { once: true }
      );
    });
    setData(data);
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
            deleteItens();
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
        }
      );
      console.log({ data, cartItems, finalTotal });
  };

  return (
    <>
      <Header isCart />

      <div className="container mt-5">
        <main>
          <div className="row g-5">
            <Resume
              items={cartItems}
              onDiscountApplied={(newTotal) => setDiscountedTotal(newTotal)}
            />
            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Endereço de cobrança</h4>
              <form
                className="needs-validation"
                noValidate
                // onSubmit={(e) => handleSubmit(e)}
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* <CheckoutForm /> */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName">Nome</label>
                    <input
                      type="text"
                      className="form-control text-capitalize"
                      id="firstName"
                      required
                      {...register("firstName", {
                        required: "Nome é obrigatório",
                        pattern: {
                          value: /^[A-Za-zÀ-ÿ\s]+$/,
                          message: "O nome não deve conter números.",
                        },
                      })}
                      onChange={(e) => {
                        const value = e.target.value.replace(
                          /[^A-Za-zÀ-ÿ\s]/g,
                          ""
                        );
                        setValue("firstName", value.toLocaleUpperCase());
                      }}
                    />
                    <div className="invalid-feedback">
                      {errors.firstName?.message || "Nome é obrigatório!"}
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName">Sobrenome</label>
                    <input
                      type="text"
                      className="form-control text-capitalize"
                      id="lastName"
                      required
                      {...register("lastName", {
                        required: "Sobrenome é obrigatório",
                        pattern: {
                          value: /^[A-Za-zÀ-ÿ\s]+$/,
                          message: "O sobrenome não deve conter números.",
                        },
                      })}
                      onChange={(e) => {
                        const value = e.target.value.replace(
                          /[^A-Za-zÀ-ÿ\s]/g,
                          ""
                        );
                        setValue("lastName", value.toLocaleUpperCase());
                      }}
                    />
                    <div className="invalid-feedback">
                      {errors.firstName?.message || "Sobrenome é obrigatório"}
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="user@example.com"
                    required
                    {...register("email", {
                      required: "Email é obrigatório",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Email inválido",
                      },
                    })}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message ||
                      "Por favor, insira um endereço de e-mail válido para atualizações de envio."}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="address">Endereço</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    required
                    placeholder="Rua Principal, 1234"
                    {...register("address", {
                      required: "Endereço é obrigatório",
                    })}
                  />
                  <div className="invalid-feedback">
                    {errors.address?.message ||
                      "Por favor, insira seu endereço de envio."}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-5 mb-3">
                    <label htmlFor="country">País</label>
                    <select
                      className="custom-select d-block w-100 form-select"
                      id="country"
                      required
                      {...register("country", {
                        required: "País é obrigatório",
                      })}
                      onChange={(e) => {
                        setCountry(e.target.value),
                          setState(""),
                          setValue("state", "");
                        selectElement.value = "";
                      }}
                    >
                      <option value="" selected disabled>
                        Escolha...
                      </option>
                      {countries.map((country, index) => (
                        <option key={index} value={country.isoCode}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">
                      {errors.country?.message || "Este campo é obrigatório."}
                    </div>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="state">Estado</label>
                    <select
                      // required
                      disabled={states.length === 0}
                      className="custom-select d-block w-100 form-select"
                      id="state"
                      {...register("state", {
                        required:
                          states.length > 0 ? "Estado é obrigatório" : false,
                      })}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        setValue("state", e.target.value);
                      }}
                    >
                      <option value="" selected disabled>
                        Escolha...
                      </option>
                      {states.map((state, index) => (
                        <option key={index} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">
                      {errors.state?.message || "Este campo é obrigatório."}
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="zip">CEP</label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      // placeholder=""
                      required
                      // ref={inputCEPRef}
                      // onChange={(e) => {
                      //   setCEP(e.target.value)
                      // }}
                      {...register("zip", {
                        required: "CEP é obrigatório",
                        pattern: {
                          value: /^\d{5}-\d{3}$/,
                          message:
                            "Formato de CEP inválido. Exemplo: 00000-000",
                        },
                      })}
                    />
                    <div className="invalid-feedback">
                      {errors.zip?.message || "CEP é obrigatório."}
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <h4 className="mb-3">Pagamento</h4>

                <div className="my-3">
                  <div className="form-check">
                    <input
                      id="credit"
                      type="radio"
                      className="form-check-input"
                      // checked
                      // required
                      {...register("paymentMethod", {
                        required: "Método de pagamento é obrigatório",
                      })}
                      value="credit"
                    />
                    <label className="form-check-label" htmlFor="credit">
                      Cartão de crédito
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="debit"
                      type="radio"
                      className="form-check-input"
                      // required
                      {...register("paymentMethod", {
                        required: "Método de pagamento é obrigatório",
                      })}
                      value="debit"
                    />
                    <label className="form-check-label" htmlFor="debit">
                      Cartão de débito
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="pix"
                      type="radio"
                      className="form-check-input"
                      // required
                      {...register("paymentMethod", {
                        required: "Método de pagamento é obrigatório",
                      })}
                      value="pix"
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
                      // placeholder=""
                      // required
                      {...register("ccName", {
                        required: "Nome no cartão é obrigatório",
                      })}
                      onChange={(e) => {
                        setValue(
                          "ccName",
                          e.target.value.replace(/[^A-Za-z\s]/g, "")
                        );
                      }}
                    />
                    <small className="text-muted">
                      Nome completo como exibido no cartão
                    </small>
                    <div className="invalid-feedback">
                      {errors.ccName?.message || "Este campo é obrigatório."}
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
                      {...register("ccNumber", {
                        required: "Número do cartão é obrigatório",
                        pattern: {
                          value: /^[0-9\s]*$/,
                          message: "Número do cartão inválido",
                        },
                        minLength: {
                          value: 19, // 16 números + 3 espaços
                          message:
                            "Número do cartão deve ter pelo menos 16 dígitos",
                        },
                        maxLength: {
                          value: 19, // 16 números + 3 espaços
                          message:
                            "Número do cartão não pode ter mais de 16 dígitos",
                        },
                      })}
                      onChange={(e) => {
                        setValue(
                          "ccNumber",
                          e.target.value
                            .replace(/\D/g, "")
                            .replace(/(.{4})/g, "$1 ")
                            .trim()
                        );
                      }}
                    />
                    <div className="invalid-feedback">
                      {errors.ccNumber?.message || "Este campo é obrigatório."}
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
                      {...register("ccExpiration", {
                        required: "Validade é obrigatória",
                      })}
                    />
                    <div className="invalid-feedback">
                      {errors.ccExpiration?.message ||
                        "Este campo é obrigatório."}
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
                      {...register("ccCvv", {
                        required: "CVV é obrigatório",
                        pattern: {
                          value: /^[0-9]{3}$/,
                          message:
                            "O CVV deve ter exatamente 3 dígitos numéricos.",
                        },
                      })}
                      onChange={(e) => {
                        const input = e.target;
                        const value = input.value.replace(/\D/g, "");
                        setValue("ccCvv", value.slice(0, 3));
                      }}
                    />
                    <div className="invalid-feedback">
                      {errors.ccCvv?.message || "Este campo é obrigatório."}
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <button
                  className="w-100 btn btn-primary btn-lg"
                  type="submit"
                  disabled={!isValid}
                >
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
