import Logo from "/logo.svg";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

export function Footer() {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 mt-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          >
            <img src={Logo} alt="Logo" width="auto" height="50" />
          </a>
        </div>
        <small className="text-muted">© 2024 {import.meta.env.VITE_APP_TITLE}, IFPE</small>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-muted" href="#twitter">
              <FaTwitter size={20} />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="#instagram">
              <FaInstagram size={20} />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="#facebook">
              <FaFacebookF size={20} />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
