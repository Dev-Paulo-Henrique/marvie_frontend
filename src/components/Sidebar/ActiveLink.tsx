import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface ActiveLinkProps {
  href: string;
  children: ReactNode;
  executable?: () => void;
}

export function ActiveLink({ href, children, executable }: ActiveLinkProps) {
  return (
    <li>
      <NavLink
        to={href}
        className={({ isActive }) =>
          `nav-link d-flex align-items-center ${
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
