import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import Avatar from "react-avatar";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";
import { isAxiosError } from "axios";
import { useMediaQuery } from "react-responsive";

interface UserDataProps {
  id: number;
  nome: string;
  data_nascimento: string;
  email: string;
  telefone: string;
  papel: string;
  numero: string;
  senha: string;
  cep: string;
  createdAt: string;
  relativeDate: string;
}

export function Profile() {
  const [user, setUser] = useState<UserDataProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useParams<{ userId: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();

  const isDesktop = useMediaQuery({ minWidth: 992 });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${userId}`, {
          headers: token ? { "x-access-token": token } : {},
        });
        setUser(response.data);
        document.title = response.data.nome;
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        setError("Erro ao carregar dados do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, userId]);

  async function handleDeleteUser() {
    try {
      await api.delete(`/users/${userId}`, {
        headers: token ? { "x-access-token": token } : {},
      });
      toast.success("Usuário deletado", {
        position: "top-center",
        toastId: "create",
        hideProgressBar: true,
        autoClose: 3000,
        pauseOnHover: false,
        closeButton: false,
        className: "text-center",
        onClose: () => {
          navigate("/admin/customers");
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
      });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data, {
            position: "top-center",
            toastId: "create",
            hideProgressBar: true,
            autoClose: 3000,
            pauseOnHover: false,
            closeButton: false,
            className: "text-center",
          });
        }
      } else {
        console.log("Erro desconhecido:", error);
      }
    }
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (!user) {
    return <p className="text-secondary">Nenhum usuário encontrado.</p>;
  }

  return (
    <div className="container">
      <div className={`d-flex ${!isDesktop && "flex-column"} gap-3`}>
        <div
          className={`d-flex ${
            !isDesktop && "justify-content-center"
          }`}
        >
          <Avatar
            name={user.nome.split(" ").slice(0, 2).join(" ")}
            size="150"
            round={true}
            color="#007bff"
            className="shadow-sm"
          />
        </div>
        <div
          className={`d-flex justify-content-center ${!isDesktop && "align-items-center"} flex-column`}
        >
          <h2 className={`text-primary mb-0 ${!isDesktop && "text-center"}`}>{user.nome}</h2>
          <p className="text-muted">{user.email}</p>
          <div className="mb-4">
            <h5>Informações</h5>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Data de Nascimento:</strong>{" "}
                {new Date(user.data_nascimento).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </li>
              <li className="list-group-item">
                <strong>Telefone:</strong> {user.telefone}
              </li>
              <li className="list-group-item">
                <strong>Data de Cadastro:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </li>
              <li className="list-group-item">
                <strong>Nome Completo:</strong> {user.nome}
              </li>
            </ul>
          </div>
          <div className="d-flex justify-content-end">
            <button onClick={handleDeleteUser} className="btn btn-danger">
              Deletar Conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
