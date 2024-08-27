import Logotipo from "/logo.svg";
import { useMediaQuery } from "react-responsive";

export function Logo() {
  const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });

  return (
    <a
      href="/"
      className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
    >
      <img src={Logotipo} alt="logo" width="auto" height="50" />
      {isDesktop && (
        <span className="OneLittleFont ms-2">
          {import.meta.env.VITE_APP_TITLE}
        </span>
      )}
    </a>
  );
}
