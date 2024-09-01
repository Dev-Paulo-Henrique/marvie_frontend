import { MdErrorOutline } from "react-icons/md";

export function Error() {
  return (
    <div className="h-100 d-flex flex-column justify-content-center align-items-center">
      <MdErrorOutline className="text-danger" size={50} />
      <p className="text-danger">Erro ao carregar dados.</p>
    </div>
  );
}
