import { useEffect, useState } from "react";
import { TableRowUsers } from "../../components/Table/Body";
import { Title } from "../../utils/Title";
import { Header } from "../Admin/Header";
import { Pagination } from "../../components/Pagination";
import { useCheckbox } from "../../hooks/useCheckbox";
import { TableHeader } from "../../components/Table/Header";
import { paginate } from "../../utils/Pagination";
import { SearchAdmin } from "../../components/Search";
import { useMediaQuery } from "react-responsive";
import { api } from "../../services/api";
import { Loading } from "../../components/Loading";
import { useAuth } from "../../hooks/useAuth";
import { Error } from "../../components/Error";

interface UserProps {
  id: number;
  nome: string;
  createdAt: Date;
  relativeDate: Date;
}

export function Customers() {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { token } = useAuth();

  const isDesktop = useMediaQuery({ minWidth: 992 });

  Title({ title: "Clientes" });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get<UserProps[]>('/users', { headers: {
          'x-access-token': token,
        } });
        setUsers(response.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token, users]);

  useCheckbox(users);

  const filteredUsers = users.filter((user) =>
    user.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentUsers, totalPages] = paginate(
    filteredUsers,
    currentPage,
    itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return (
      <Loading/>
    );
  }

  if (error) {
    return (
      <Error/>
    );
  }

  return (
    <>
      <Header title="Clientes" textButton={`${isDesktop ? "Novo" : ""} Cliente`} />
      <div className="pb-4">
        <SearchAdmin
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value), setCurrentPage(1);
          }}
        />
        {filteredUsers.length > 0 ? (
          <div className="d-flex justify-content-center align-items-center flex-column">
            <table className="table table-hover shadow-sm">
              <TableHeader nome dataDeCadastro />
              <tbody>
                {currentUsers.map((user) => (
                  <TableRowUsers
                    key={user.id}
                    id={user.id.toString()}
                    name={user.nome}
                    date={user.createdAt}
                    relativeDate={user.createdAt}
                  />
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItens={`${users.length} ${users.length > 1 ? 'usuários' : 'usuário'}`}
            />
          </div>
        ) : (
          <p className="text-secondary text-center">Nenhum cliente encontrado.</p>
        )}
      </div>
    </>
  );
}
