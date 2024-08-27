import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import Avatar from "react-avatar";
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
  const { userId } = useParams<{ userId: string }>();
  const { token } = useAuth();

  useEffect(() => {
    const fetchUser = async (token: string | null) => {
      try {
        const response = await api.get(`/users/${userId}`, {
          headers: {
            "x-access-token": token,
          },
        });
        // console.log(token);
        // console.log(response.data);
        setUser(response.data);
        document.title = response.data.nome;
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUser(token);
  }, [token, userId]);

  async function handleDeleteUser() {
    try {
      await api
        .delete(`/users/${userId}`)
        .then(() => toast.success("Usuário deletado"))
        .finally(() =>
          setTimeout(() => {
            window.history.back();
          }, 2500)
        );
    } catch (error) {
      toast.error("Não foi possível deletar este usuário");
    }
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
        {/* <h1>Customer ID: {userId}</h1> */}
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
          <label className="fw-bold">Data de cadastro</label>
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
