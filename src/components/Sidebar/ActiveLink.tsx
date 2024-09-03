import { ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";

interface ActiveLinkProps {
  href: string;
  children: ReactNode;
  executable?: () => void;
}

export function ActiveLink({ href, children, executable }: ActiveLinkProps) {
  const isDesktop = useMediaQuery({ minWidth: 992 });

  return (
    <li>
      <NavLink
        to={href}
        className={({ isActive }) =>
          `nav-link d-flex align-items-center ${!isDesktop && "p-2"} ${
            isActive ? "active bg-white text-dark" : "text-white"
          }`
        }
        onClick={executable}
      >
        {children}
      </NavLink>
    </li>
  );
}
