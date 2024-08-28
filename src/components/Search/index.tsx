import { CiSearch } from "react-icons/ci";
import { SetStateAction, useState, useEffect } from "react";

interface SearchAdminProps {
  value: string;
  onChange: (e: {
    target: { value: string };
    preventDefault: () => void;
  }) => void;
}

export function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("search");
    if (query) {
      setSearchQuery(query);
    }
  }, []);

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <form
      className="d-flex col-12 col-lg-auto mb-lg-0 me-lg-3 w-50 form-control"
      onSubmit={handleSubmit}
    >
      <input
        type="search"
        className="w-100 border-0"
        style={{ outline: 0 }}
        placeholder="Buscar produtos, marcas e muito mais..."
        aria-label="Search"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <CiSearch color="#2A3C44" size={32} />
      </button>
    </form>
  );
}

export function SearchAdmin({onChange, value}: SearchAdminProps) {
  return (
    <div className="form-outline mb-4 position-relative">
      <CiSearch className="position-absolute top-50 start-0 translate-middle-y ms-3" />
      <input
        type="text"
        className="form-control ps-5"
        id="datatable-search-input"
        placeholder="Buscar produto"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
