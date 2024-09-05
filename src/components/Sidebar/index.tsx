import { Logo } from "../Logo";
import {
  IoHomeOutline,
  IoShirtOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { BsBarChart } from "react-icons/bs";
import { GoInbox } from "react-icons/go";
import { ActiveLink } from "./ActiveLink";
import { useMediaQuery } from "react-responsive";

export function Sidebar() {
  const isDesktop = useMediaQuery({ minWidth: 992 });

  const sidebarStyle = {
    width: isDesktop ? "280px" : "100%",
    height: isDesktop ? "100%" : "80px",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  };

  return (
    <aside
      className={`d-flex ${
        isDesktop ? "flex-column" : "flex-row align-items-center"
      } flex-shrink-0 p-3 text-white bg-custom-primary position-fixed`}
      style={sidebarStyle}
    >
      <Logo />
      {isDesktop && <hr />}
      <ul
        className={`nav nav-pills d-flex ${
          isDesktop
            ? "flex-column mb-auto"
            : "flex-row align-items-center justify-content-center w-100 gap-1"
        }`}
      >
        <li className="nav-item">
          <ActiveLink href="/admin/home">
            <IoHomeOutline className={`bi ${isDesktop ? "me-2" : ""}`} size={isDesktop ? 16 : 14} />
            {isDesktop && "Início"}
          </ActiveLink>
        </li>
        <li className="nav-item">
          <ActiveLink href="/admin/dashboard">
            <BsBarChart className={`bi ${isDesktop ? "me-2" : ""}`} size={isDesktop ? 16 : 14} />
            {isDesktop && "Dashboard"}
          </ActiveLink>
        </li>
        <li className="nav-item">
          <ActiveLink href="/admin/orders">
            <GoInbox className={`bi ${isDesktop ? "me-2" : ""}`} size={isDesktop ? 16 : 14} />
            {isDesktop && "Pedidos"}
          </ActiveLink>
        </li>
        <li className="nav-item">
          <ActiveLink href="/admin/products">
            <IoShirtOutline className={`bi ${isDesktop ? "me-2" : ""}`} size={isDesktop ? 16 : 14} />
            {isDesktop && "Produtos"}
          </ActiveLink>
        </li>
        <li className="nav-item">
          <ActiveLink href="/admin/customers">
            <FiUsers className={`bi ${isDesktop ? "me-2" : ""}`} size={isDesktop ? 16 : 14} />
            {isDesktop && "Clientes"}
          </ActiveLink>
        </li>
      </ul>
      {isDesktop && <hr />}
      <ul className="nav nav-pills flex-column mb-0">
        <li className="nav-item">
          <ActiveLink
            href="/"
            executable={() => {
              localStorage.removeItem("authToken");
              localStorage.removeItem("authName");
            }}
          >
            <IoLogOutOutline className={`bi ${isDesktop ? "me-2" : ""}`} size={isDesktop ? 16 : 14} />
            {isDesktop && "Sair"}
          </ActiveLink>
        </li>
      </ul>
    </aside>
  );
}
