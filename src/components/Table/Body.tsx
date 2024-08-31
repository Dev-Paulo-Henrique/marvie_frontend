import { format, formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { statusColorMap } from "../../utils/StatusColorMap";
import { ReactNode } from "react";

interface TableRowUsersProps {
  id: string;
  name: string;
  date: Date;
  relativeDate: Date;
}

interface TableRowProductsProps {
  id: number;
  nome: string;
  estoque: number;
  img: string;
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
}: TableRowUsersProps) {
  return (
    <tr>
      {/* <th scope="row" className="d-none d-lg-table-cell align-middle">
        <input
          className="form-check-input me-1 row-checkbox"
          type="checkbox"
          value=""
          aria-label="..."
        />
      </th> */}
      <td className="align-middle ps-lg-4">
        <a href={`/admin/customers/${id}`} className="text-decoration-none text-break">
          {name}
        </a>
      </td>
      <td className="align-middle">
        {format(new Date(date), "dd/MM/yyyy HH:mm")}
        <br />
        <small className="text-secondary">
          {formatDistance(new Date(relativeDate), new Date(), {
            addSuffix: true,
            locale: ptBR,
          })}
        </small>
      </td>
    </tr>
  );
}

export function TableRowProducts({
  id,
  img,
  estoque,
  nome,
  actions
}: TableRowProductsProps) {
  return (
    <tr>
      {/* <th scope="row" className="d-none d-lg-table-cell align-middle">
        <input
          className="form-check-input me-1 row-checkbox"
          type="checkbox"
          value=""
          aria-label="..."
        />
      </th> */}
      <td className="d-none d-lg-table-cell align-middle text-center">{id}</td>
      <td className="align-middle ps-lg-4">
        <div className="d-flex align-items-center">
          <img src={img} width={50} className="d-none d-lg-block"/>
          <span className="mx-3 fs-6 text-break">{nome}</span>
        </div>
      </td>
      <td className="d-none d-lg-table-cell align-middle text-center">{estoque}</td>
      <td className="d-none d-lg-table-cell align-middle text-center">{actions}</td>
      <td className="d-table-cell d-lg-none align-middle text-center">{actions}</td>
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
  paymentFlag
}: TableRowOrdersProps) {
  return (
    <tr key={id} className="align-middle">
      {/* <td>
        <input type="checkbox" className="form-check-input row-checkbox" />
      </td> */}
      <td className="ps-lg-4">
        <div className="d-flex align-items-center gap-2">
        <img
            src={paymentFlag}
            alt="Payment"
            style={{ width: '2rem', height: '2rem', marginRight: '0.5rem' }}
          />
          <div className="d-flex flex-column">
          <a
            href={`/admin/orders/${numeroPedido}`}
            className="text-primary fw-bold text-decoration-none"
            >
            {numeroPedido}
          </a>
          <span className="text-secondary">{clientName}</span>
            </div>
        </div>
      </td>
      <td>
        {format(new Date(createdAt), "dd/MM/yyyy HH:mm")}
        <br />
        <small className="text-muted">{formatDistance(new Date(relativeDate), new Date(), {
            addSuffix: true,
            locale: ptBR,
          })}</small>
      </td>
      <td>{total}</td>
      <td>
        <small className={`badge ${getStatusClass(status)}`}>
          {status}
        </small>
      </td>
    </tr>
  );
}

const getStatusClass = (status: string) => {
  return statusColorMap[status] || 'bg-light text-dark';
};
