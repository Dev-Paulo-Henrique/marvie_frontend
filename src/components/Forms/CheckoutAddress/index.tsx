import { forwardRef, Ref, ReactNode, ChangeEvent } from "react";

interface CheckoutFormInputProps {
  size?: "col-sm-12" | "col-sm-6" | "col-md-5" | "col-md-4" | "col-md-3";
  id: string;
  type: string;
  label: string;
  required?: boolean;
  username?: boolean;
  errorMessage?: string;
  placeholder?: string;
  options?: ReactNode;
  onChange?: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  disabled?: boolean;
}

export const CheckoutFormAddressInput = forwardRef<
  HTMLInputElement | HTMLSelectElement,
  CheckoutFormInputProps
>(
  (
    {
      size = "col-sm-12",
      id,
      type,
      label,
      required = true,
      username = false,
      errorMessage,
      placeholder,
      options,
      onChange,
      disabled,
    },
    ref
  ) => {
    return (
      <div className={size}>
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        {type === "select" && options ? (
          <select
            className="form-select"
            id={id}
            required={required}
            onChange={onChange}
            ref={ref as Ref<HTMLSelectElement>}
            disabled={disabled}
          >
            <option value="" selected disabled>
              Escolha...
            </option>
            {options}
          </select>
        ) : username ? (
          <div className="input-group has-validation">
            <span className="input-group-text">@</span>
            <input
              type="text"
              className="form-control"
              id={id}
              placeholder={placeholder}
              required={required}
              ref={ref as Ref<HTMLInputElement>}
            />
            <div className="invalid-feedback">
              {errorMessage || "Este campo é obrigatório."}
            </div>
          </div>
        ) : (
          <input
            type={type}
            className={`form-control ${!errorMessage && "text-capitalize"}`}
            id={id}
            placeholder={placeholder}
            required={required}
            ref={ref as Ref<HTMLInputElement>}
          />
        )}
        <div className="invalid-feedback">
          {errorMessage || "Este campo é obrigatório."}
        </div>
      </div>
    );
  }
);
