import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { CardProps, products } from "../../utils/Cards";

interface SearchAdminProps {
  value: string;
  onChange: (e: {
    target: { value: string };
    preventDefault: () => void;
  }) => void;
}

export function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [uniqueProducts, setUniqueProducts] = useState<CardProps[]>([]);
  const { search } = useParams<{ search: string }>();
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setSearchQuery(search ? search : "");
  }, [search]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setUniqueProducts([]);
      return;
    }

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const seen = new Set();
    const unique = filteredProducts.filter((product) => {
      const duplicate = seen.has(product.name.toLowerCase());
      seen.add(product.name.toLowerCase());
      return !duplicate;
    });

    setUniqueProducts(unique);
  }, [searchQuery]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setSearchFocus(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchFocus(false);
    navigate(`/busca/${encodeURIComponent(searchQuery)}`);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        listRef.current &&
        !listRef.current.contains(event.target as Node)
      ) {
        setSearchFocus(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="position-relative w-50">
      <form
        className="d-flex col-12 col-lg-auto mb-lg-0 me-lg-3 w-100 form-control"
        onSubmit={handleSubmit}
        style={{
          borderRadius:
            searchFocus &&
            searchQuery.trim() !== "" &&
            uniqueProducts.length > 0
              ? "0.375rem 0.375rem 0 0"
              : "0.375rem",
        }}
      >
        <input
          type="search"
          className="w-100 border-0"
          style={{ outline: 0 }}
          placeholder="Buscar produtos, marcas e muito mais..."
          aria-label="Search"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setSearchFocus(true)}
          ref={inputRef}
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
      {searchFocus &&
        searchQuery.trim() !== "" &&
        uniqueProducts.length > 0 && (
          <ul
            className="list-unstyled position-absolute bg-white border w-100"
            style={{
              zIndex: 1000,
              borderRadius:
                uniqueProducts.length > 0 ? "0 0 0.375rem 0.375rem" : "0",
              display: uniqueProducts.length > 0 ? "block" : "none",
            }}
            ref={listRef}
          >
            {uniqueProducts.map((product, index) => (
              <li
                key={index}
                className="p-2 border-bottom cursor-pointer"
                onClick={() => {
                  setSearchQuery(product.name);
                  navigate(`/busca/${encodeURIComponent(product.name)}`);
                  setSearchFocus(false);
                }}
              >
                {product.name}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}

export function SearchAdmin({ onChange, value }: SearchAdminProps) {
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
