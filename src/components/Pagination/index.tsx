import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import { useMediaQuery } from "react-responsive";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItens: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItens
}: PaginationProps) {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  
  const getPageNumbers = () => {
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(currentPage + 2, totalPages);

    if (endPage - startPage < 4) {
      if (startPage === 1) {
        endPage = Math.min(startPage + 4, totalPages);
      } else if (endPage === totalPages) {
        startPage = Math.max(endPage - 4, 1);
      }
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="d-flex justify-content-center mt-3 flex-column align-items-center">
      <ul className="pagination flex-wrap">
        <li
          className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
          style={currentPage === 1 ? { cursor: "not-allowed" } : {}}
        >
          <button
            className="page-link"
            style={!isDesktop ? { fontSize: "0.7rem" } : {}}
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Previous"
            disabled={currentPage === 1}
          >
            <span aria-hidden="true">
              <IoIosArrowRoundBack />
            </span>
          </button>
        </li>
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
          >
            <button
              className="page-link"
              style={!isDesktop ? { fontSize: "0.7rem" } : {}}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
          style={currentPage === totalPages ? { cursor: "not-allowed" } : {}}
        >
          <button
            className="page-link"
            style={!isDesktop ? { fontSize: "0.7rem" } : {}}
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
      {totalItens && <small className="text-muted">Total: {totalItens}</small>}
    </nav>
  );
}