import { useEffect, useState } from "react";
import { Title } from "../../utils/Title";
// import { api } from "../../services/api";
import { TableRowProducts } from "../../components/Table/Body";
import { Header } from "../Admin/Header";
import { Pagination } from "../../components/Pagination";
import { faker } from "@faker-js/faker";
import { useCheckbox } from "../../hooks/useCheckbox";
import { TableHeader } from "../../components/Table/Header";
import { paginate } from "../../utils/Pagination";
import { SearchAdmin } from "../../components/Search";

import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../services/firebase"


interface ProductsProps {
  id: number;
  nome: string;
  createdAt: string;
  relativeDate: string;
  descricao: string;
  estoque: number;
  data_fabricacao: string;
  valor: number;
  categoria: number;
  url: string;
}

export function Products() {
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  Title({ title: "Produtos" });

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await listAll(ref(storage));
      const firstImageUrl = res.items.length > 0 ? await getDownloadURL(res.items[0]) : ''
      try {
        const fakeProducts: ProductsProps[] = Array.from({ length: 50 }).map(
          (_, index) => ({
            id: index + 1,
            nome: faker.commerce.productName(),
            createdAt: faker.date.past().toISOString(),
            relativeDate: faker.date.recent().toLocaleDateString(),
            descricao: faker.commerce.productDescription(),
            estoque: faker.number.int({ min: 0, max: 100 }),
            data_fabricacao: faker.date.past().toISOString(),
            valor: parseFloat(faker.commerce.price()),
            categoria: faker.number.int({ min: 1, max: 10 }),
            url: firstImageUrl,
          })
        );

        setProducts(fakeProducts);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  useCheckbox(products);

  const filteredProducts = products.filter((product) =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentProducts, totalPages] = paginate(
    filteredProducts,
    currentPage,
    itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <Header title="Produtos" link="products/new" textButton="Novo Produto" />
      <div className="pb-4">
        <SearchAdmin value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value), setCurrentPage(1)}}/>
        {filteredProducts.length > 0 ? (
          <>
            <table className="table table-hover shadow-sm">
              <TableHeader id nome quantidadeEmEstoque />
              <tbody>
                {currentProducts.map((product) => (
                  <TableRowProducts
                    key={product.id}
                    id={product.id}
                    nome={product.nome}
                    img={product.url}
                    estoque={product.estoque}
                  />
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <p className="text-secondary">Nenhum produto encontrado.</p>
        )}
      </div>
    </>
  );
}
