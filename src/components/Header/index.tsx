import { useMediaQuery } from "react-responsive";
import "../../scss/styles.scss";
import { Logo } from "../Logo";
import { Search } from "../Search";
import {
  // CiShoppingCart,
  CiUser,
} from "react-icons/ci";
import { useAuth } from "../../hooks/useAuth";


interface HeaderProps {
  role?: string;
  isCart?: boolean;
}

export function Header({ role, isCart }: HeaderProps) {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const { token } = useAuth();

  return (
    <>
      <header className="p-3 border-bottom w-100 bg-custom-primary">
        <div className="container">
          <div
            className={`d-flex flex-wrap align-items-center ${
              isCart ? "justify-content-center" : "justify-content-between"
            }`}
          >
            <Logo />

            {role === "Administrador" ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                  className="rounded-circle mb-1"
                  width={40}
                  alt="Avatar"
                />
                <small className="text-white">John Doe</small>
              </div>
            ) : (
              <>
                {!isCart && (
                  <>
                    <Search />
                    {isDesktop ? <div className="d-flex justify-content-center align-items-center gap-3">
                      <a
                        href={token ? "/admin" : "/login"}
                        className="d-block gap-1 link-dark d-flex align-items-center text-decoration-none text-light btn-outline-light btn py-2 px-3"
                      >
                        <CiUser size={20} />
                        <span>{token ? "Entrar" : "Login"}</span>
                      </a>
                      {/* <a
                        href="/checkout"
                        className="d-block link-dark text-decoration-none"
                      >
                        <CiShoppingCart color="#FFFFFF" size={32} />
                        <span className="badge badge-light text-dark">0</span>
                      </a> */}
                    </div> : <a
                        href="/login"
                        className="d-block link-dark d-flex align-items-center text-decoration-none py-2 px-3"
                      >
                        <CiUser size={32} color="#FFFFFF" />
                      </a>}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
