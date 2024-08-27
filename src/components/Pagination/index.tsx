import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <nav className="d-flex justify-content-center">
      <ul className="pagination">
        <li
          className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
          style={currentPage === 1 ? { cursor: "not-allowed" } : {}}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Previous"
            disabled={currentPage === 1}
          >
            <span aria-hidden="true">
              <IoIosArrowRoundBack />
            </span>
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index + 1}
            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          style={currentPage === totalPages ? { cursor: "not-allowed" } : {}}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Next"
            disabled={currentPage === totalPages}
          >
            <span aria-hidden="true">
              <IoIosArrowRoundForward />
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
