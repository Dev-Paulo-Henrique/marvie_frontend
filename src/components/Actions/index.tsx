import { MdEdit, MdDelete, MdRemoveRedEye } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { useAuth } from "../../hooks/useAuth";

interface ActionsProps {
  id: number;
  route: string;
}

export function Actions({ id, route }: ActionsProps) {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const { token } = useAuth();

  const handleDelete = async () => {
    if (window.confirm("Tem certeza de que deseja excluir este item?")) {
      try {
        await api.delete(`/${route}/${id}`, {
          headers: { "x-access-token": token },
        });
        toast.success("Deletado com sucesso!", {
          position: "top-center",
          toastId: "create",
          hideProgressBar: true,
          autoClose: 3000,
          pauseOnHover: false,
          closeButton: false,
          className: "text-center",
          onClose: () => {
            window.location.reload()
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        });
      } catch (error) {
        console.error("Erro ao excluir o item:", error);
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
  };



  return (
    <div className="btn-group btn-group-toggle">
      {isDesktop && (
        <button
          className="btn btn-primary align-items-center d-flex"
          onClick={() => navigate(`/admin/${route}/${id}`)}
        >
          <MdRemoveRedEye />
        </button>
      )}
      <button className="btn btn-warning align-items-center d-flex"
      onClick={() => navigate(`/admin/${route}/${id}/edit`)}>
        <MdEdit />
      </button>
      <button
        className="btn btn-danger align-items-center d-flex"
        onClick={handleDelete}
      >
        <MdDelete />
      </button>
    </div>
  );
}
