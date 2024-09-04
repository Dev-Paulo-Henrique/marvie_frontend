import { MdEdit, MdDelete, MdRemoveRedEye } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

interface ActionsProps {
  id: number;
}

export function Actions({ id }: ActionsProps) {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ minWidth: 992 });

  return (
    <div className="btn-group btn-group-toggle">
      {isDesktop && (
        <button
          className="btn btn-primary align-items-center d-flex"
          onClick={() => navigate(`/admin/products/${id}`)}
        >
          <MdRemoveRedEye />
        </button>
      )}
      <button className="btn btn-warning align-items-center d-flex">
        <MdEdit />
      </button>
      <button className="btn btn-danger align-items-center d-flex">
        <MdDelete />
      </button>
    </div>
  );
}
