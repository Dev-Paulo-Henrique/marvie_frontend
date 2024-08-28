import { useEffect, useState } from "react";
import { TableRowUsers } from "../../components/Table/Body";
import { Title } from "../../utils/Title";
import { Header } from "../Admin/Header";
import { Pagination } from "../../components/Pagination";
import { faker } from "@faker-js/faker";
import { useCheckbox } from "../../hooks/useCheckbox";
import { TableHeader } from "../../components/Table/Header";
import { paginate } from "../../utils/Pagination";
import { SearchAdmin } from "../../components/Search";
import { useMediaQuery } from "react-responsive";

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

  const isDesktop = useMediaQuery({ minWidth: 992 });

  Title({ title: "Clientes" });

  useEffect(() => {
    const generateFakeUsers = () => {
      const fakeUsers: UserProps[] = Array.from({ length: 50 }).map(
        (_, index) => ({
          id: index + 1,
          nome: faker.person.fullName(),
          createdAt: faker.date.past(),
          relativeDate: faker.date.recent(),
        })
      );
      setUsers(fakeUsers);
    };

    generateFakeUsers();
  }, []);

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

  return (
    <>
      <Header title="Clientes" link="customers/new" textButton={`${isDesktop ? "Novo" : ""} Cliente`} />
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
                    relativeDate={user.relativeDate}
                  />
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        ) : (
          <p className="text-secondary">Nenhum cliente encontrado.</p>
        )}
      </div>
    </>
  );
}
