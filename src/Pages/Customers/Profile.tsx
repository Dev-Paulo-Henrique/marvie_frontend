import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import Avatar from "react-avatar";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";
import { isAxiosError } from "axios";

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
        className: 'text-center',
        onClose: () => {
          navigate('/admin/customers');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      })
      setTimeout(() => {
        window.history.back();
      }, 2500);
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
            className: 'text-center',
          })
        }
      } else {
        console.log("Erro desconhecido:", error);
      }
    }
  }

  if (loading) {
    return <Loading/>
  }

  if (error) {
    return <Error/>
  }

  if (!user) {
    return <p className="text-secondary">Nenhum usuário encontrado.</p>;
  }

  return (
    <div className="d-flex flex-column align-items-start gap-3">
      <div className="d-flex align-items-center">
        <Avatar
          name={user.nome.split(" ").slice(0, 2).join(" ")}
          size="100"
          round={true}
          color="var(--blue-100)"
        />
        <div className="d-flex flex-column mx-3">
          <h2 className="fw-normal m-0" style={{ color: "var(--gray-75)" }}>
            {user.nome}
          </h2>
          <small className="text-secondary">{user.email}</small>
        </div>
      </div>
      <div className="row w-100 gap-2">
        <div className="form-group col-auto bg-white p-2 rounded border">
          <label className="fw-bold">Data de Nascimento</label>
          <p>
            {new Date(user.data_nascimento).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="form-group col-auto bg-white p-2 rounded border">
          <label className="fw-bold">Telefone</label>
          <p>{user.telefone}</p>
        </div>
        <div className="form-group col-auto bg-white p-2 rounded border">
          <label className="fw-bold">Data de Cadastro</label>
          <p>
            {new Date(user.createdAt).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="form-group col-auto bg-white p-2 rounded border">
          <label className="fw-bold">Nome Completo</label>
          <p>{user.nome}</p>
        </div>
      </div>
      <button onClick={handleDeleteUser} className="btn btn-danger">
        Deletar
      </button>
    </div>
  );
}
