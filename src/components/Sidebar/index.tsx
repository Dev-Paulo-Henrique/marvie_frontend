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
    width: isDesktop ? "280px" : "80px",
    height: "100vh",
    top: 0,
    left: 0,
    zIndex: 1000,
  };

  return (
    <aside
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-custom-primary position-fixed"
      style={sidebarStyle}
    >
      <Logo />
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <ActiveLink href="/admin/home">
          <IoHomeOutline className={`bi ${isDesktop ? "me-2" : ""}`} />
          {isDesktop && "Início"}
        </ActiveLink>
        <ActiveLink href="/admin/dashboard">
          <BsBarChart className={`bi ${isDesktop ? "me-2" : ""}`} />
          {isDesktop && "Dashboard"}
        </ActiveLink>
        <ActiveLink href="/admin/orders">
          <GoInbox className={`bi ${isDesktop ? "me-2" : ""}`} />
          {isDesktop && "Pedidos"}
        </ActiveLink>
        <ActiveLink href="/admin/products">
          <IoShirtOutline className={`bi ${isDesktop ? "me-2" : ""}`} />
          {isDesktop && "Produtos"}
        </ActiveLink>
        <ActiveLink href="/admin/customers">
          <FiUsers className={`bi ${isDesktop ? "me-2" : ""}`} />
          {isDesktop && "Clientes"}
        </ActiveLink>
      </ul>
      <hr />
      <ul className="nav nav-pills flex-column mb-0">
        <ActiveLink
          href="/"
          executable={() => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("authName");
          }}
        >
          <IoLogOutOutline className={`bi ${isDesktop ? "me-2" : ""}`} />
          {isDesktop && "Sair"}
        </ActiveLink>
      </ul>
    </aside>
  );
}
