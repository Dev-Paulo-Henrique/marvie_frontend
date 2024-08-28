import { ReactNode } from "react";
import Logo from "/logo.svg";
import { useMediaQuery } from "react-responsive";

interface FormsProps {
  handleSubmit: (event: { preventDefault: () => void }) => Promise<void>;
  setFirstField?: (e: {
    target: { value: string };
    preventDefault: () => void;
  }) => void;
  setSecondField?: (e: {
    target: { value: string };
    preventDefault: () => void;
  }) => void;
  title: string;
  subtitle: string;
  errorMessage: string;
  email?: string;
  errorEmail?: string;
  errorPass?: string;
  senha?: string;
  showRegisterButton?: boolean;
  showLink?: boolean;
  showFirstField?: boolean;
  showSecondField?: boolean;
  textSubmitButton: string | ReactNode;
  isLoading?: boolean;
  url?: string;
  textLink?: string;
}

export function Forms({
  handleSubmit,
  title,
  subtitle,
  errorMessage,
  email,
  errorEmail,
  setFirstField,
  errorPass,
  senha,
  setSecondField,
  showRegisterButton,
  showLink,
  textSubmitButton,
  showFirstField,
  showSecondField,
  isLoading,
  url,
  textLink
}: FormsProps) {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return (
    <form
      onSubmit={handleSubmit}
      className={`d-flex flex-column ${!isDesktop && "w-100"} px-5 vh-100 justify-content-center`}
      style={{ background: "var(--gray-75)", zIndex: 0 }}
    >
      <a href="/">
        <img
          src={Logo}
          alt="Details"
          className="mb-3 mx-5 end-0 bottom-0 position-absolute"
          width={50}
        />
      </a>
      <h1 className="text-white fw-bold m-0">{title}</h1>
      <small style={{ color: "var(--gray-25)" }} className="mb-4">
        {subtitle}
      </small>
      {showFirstField && (
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label text-white m-0" htmlFor="form2Example1">
            E-mail
          </label>
          <input
            type="email"
            id="form2Example1"
            className={`form-control ${
              (errorMessage || errorEmail) && "is-invalid"
            } bg-transparent border-top-0 border-end-0 border-start-0 rounded-0 text-white`}
            value={email}
            onChange={setFirstField}
          />
          {errorEmail && <small className="text-danger">{errorEmail}</small>}
        </div>
      )}

      {showSecondField && (
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label text-white m-0" htmlFor="form2Example2">
            Senha
          </label>
          <input
            type="password"
            id="form2Example2"
            className={`form-control ${
              (errorMessage || errorPass) && "is-invalid"
            } bg-transparent border-top-0 border-end-0 border-start-0 rounded-0 text-white`}
            value={senha}
            onChange={setSecondField}
          />
          {errorPass && <small className="text-danger">{errorPass}</small>}
        </div>
      )}

      {errorMessage && (
        <small className="text-danger w-100 justify-content-center d-flex mb-3">
          {errorMessage}
        </small>
      )}

      <div className="row mb-4">
        <button
          type="submit"
          className="btn btn-light btn-block fw-bold mb-2 p-3"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            textSubmitButton
          )}
        </button>
        {showLink && (
          <div className="col d-flex justify-content-center">
            <a
              href={url}
              className="text-decoration-none mt-2 mb-4"
              style={{ color: "var(--gray-25)" }}
            >
              {textLink}
            </a>
          </div>
        )}
        {showRegisterButton && (
          <>
            <hr />
            <a
              href="/register"
              className="btn btn-block fw-bold p-3"
              style={{ background: "var(--gray-25)" }}
            >
              Cadastrar
            </a>
          </>
        )}
      </div>
    </form>
  );
}
