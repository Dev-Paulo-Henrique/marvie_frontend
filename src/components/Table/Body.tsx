import { format, formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { statusColorMap } from "../../utils/StatusColorMap";
import { ReactNode } from "react";
import { useMediaQuery } from "react-responsive";

interface TableRowUsersProps {
  id: string;
  name: string;
  date: Date;
  relativeDate: Date;
  actions: ReactNode;
}

interface TableRowProductsProps {
  id: number;
  nome: string;
  link: string;
  estoque: number;
  img?: string;
  actions: ReactNode;
}

interface TableRowOrdersProps {
  id: number;
  numeroPedido: string;
  clientName: string;
  createdAt: Date;
  relativeDate: Date;
  total: string;
  status: string;
  paymentFlag: string;
}

export function TableRowUsers({
  id,
  name,
  date,
  relativeDate,
  actions,
}: TableRowUsersProps) {
  const isDesktop = useMediaQuery({ minWidth: 992 });

  return (
    <tr>
      <td className="align-middle">
        <a
          href={`/admin/users/${id}`}
          className="text-decoration-none text-break text-secondary"
        >
          {name}
        </a>
      </td>
      {isDesktop ? (
        <td className="align-middle">
          {format(
            new Date(date),
            isDesktop ? "dd/MM/yyyy HH:mm" : "dd/MM/yyyy"
          )}
          <br />
          <small className="text-secondary">
            {formatDistance(new Date(relativeDate), new Date(), {
              addSuffix: true,
              locale: ptBR,
            })}
          </small>
        </td>
      ) : (
        <td className="d-table-cell d-lg-none align-middle text-center">
          {actions}
        </td>
      )}
    </tr>
  );
}

export function TableRowProducts({
  id,
  img,
  estoque,
  nome,
  actions,
  link,
}: TableRowProductsProps) {
  const isDesktop = useMediaQuery({ minWidth: 992 });

  return (
    <tr>
      <td className="d-none d-lg-table-cell align-middle text-center">{id}</td>
      <td className="align-middle">
        <div className="d-flex align-items-center">
          <img src={img} width={50} alt={`Imagem do produto ${id}`} className="d-none d-lg-block" />
          {isDesktop ? (
            <span className="ms-3 fs-6 text-break">{nome}</span>
          ) : (
            <a
              href={link}
              className="text-secondary text-break text-decoration-none"
            >
              {nome}
            </a>
          )}
        </div>
      </td>
      <td className="d-none d-lg-table-cell align-middle text-center">
        {estoque}
      </td>
      <td className="d-none d-lg-table-cell align-middle text-center">
        {actions}
      </td>
      <td className="d-table-cell d-lg-none align-middle text-center">
        {actions}
      </td>
    </tr>
  );
}

export function TableRowOrders({
  id,
  numeroPedido,
  clientName,
  createdAt,
  relativeDate,
  total,
  status,
  paymentFlag,
}: TableRowOrdersProps) {
  const isDesktop = useMediaQuery({ minWidth: 992 });

  return (
    <tr key={id} className="align-middle">
      <td className="ps-lg-4">
        <div className="d-flex align-items-center gap-2">
          {isDesktop && (
            <img
              src={paymentFlag}
              alt="Payment"
              style={{ width: "2rem", height: "2rem", marginRight: "0.5rem" }}
            />
          )}
          <div className="d-flex flex-column">
            {isDesktop && (
              <a
                href={`/admin/orders/${numeroPedido}`}
                className="text-primary fw-bold text-decoration-none"
              >
                {numeroPedido}
              </a>
            )}
            {isDesktop ? (
              <span className="text-secondary">{clientName}</span>
            ) : (
              <a
                href={`/admin/orders/${numeroPedido}`}
                className="text-secondary text-decoration-none"
              >
                {clientName}
              </a>
            )}
          </div>
        </div>
      </td>
      {isDesktop && (
        <>
          <td>
            {format(new Date(createdAt), "dd/MM/yyyy HH:mm")}
            <br />
            <small className="text-muted">
              {formatDistance(new Date(relativeDate), new Date(), {
                addSuffix: true,
                locale: ptBR,
              })}
            </small>
          </td>
          <td>{total}</td>
        </>
      )}
      <td className={isDesktop ? "" : "text-center"}>
        <small
          className={`badge ${getStatusClass(status)} ${
            !isDesktop && "rounded-pill p-1"
          }`}
        >
          {isDesktop ? status : " "}
        </small>
      </td>
    </tr>
  );
}

const getStatusClass = (status: string) => {
  return statusColorMap[status] || "bg-light text-dark";
};
