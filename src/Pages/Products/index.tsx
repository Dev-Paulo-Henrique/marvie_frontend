import { useEffect, useState } from "react";
import { Title } from "../../utils/Title";
// import { api } from "../../services/api";
import { TableRowProducts } from "../../components/Table/Body";
import { Header } from "../Admin/Header";
import { Pagination } from "../../components/Pagination";
import { TableHeader } from "../../components/Table/Header";
import { paginate } from "../../utils/Pagination";
import { SearchAdmin } from "../../components/Search";

import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../services/firebase";
// import { useMediaQuery } from "react-responsive";
import { Loading } from "../../components/Loading";
import { Actions } from "../../components/Actions";
import { useAuth } from "../../hooks/useAuth";
import { Error } from "../../components/Error";
import { api } from "../../services/api";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { token } = useAuth();

  // const isDesktop = useMediaQuery({ minWidth: 992 });

  Title({ title: "Produtos" });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await api.get<ProductsProps[]>('/products', {
          headers: { 'x-access-token': token }
        });

        const fetchedProducts = await Promise.all(response.data.map(async (product) => {
          const productRef = ref(storage, `products/${product.id}`);
          const imageSnapshots = await listAll(productRef);
          const imageUrls = await Promise.all(imageSnapshots.items.map(item => getDownloadURL(item)));
          
          const updatedProduct = {
            ...product,
            url: imageUrls[0] || ""
          };

          return updatedProduct;
        }));

        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error/>
    );
  }

  return (
    <>
      <Header
        title="Produtos"
        textButton="Novo Produto"
      />
      <div className="pb-4">
        <SearchAdmin
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value), setCurrentPage(1);
          }}
        />
        {filteredProducts.length > 0 ? (
          <div className="d-flex justify-content-center align-items-center flex-column">
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
                    link={`/admin/products/${product.id}`}
                    actions={<Actions id={product.id} route="products"/>}
                  />
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItens={`${products.length} ${
                products.length > 1 ? "produtos" : "produto"
              }`}
            />
          </div>
        ) : (
          <p className="text-secondary text-center">
            Nenhum produto encontrado.
          </p>
        )}
      </div>
    </>
  );
}
