import { useEffect, useState } from "react";
import { faker } from '@faker-js/faker';
import { Title } from "../../utils/Title";
import { Header } from "../Admin/Header";
import { Pagination } from "../../components/Pagination";
import { TableRowOrders } from "../../components/Table/Body";

import visaFlag from '../../assets/payment/visa.svg';
import mastercardFlag from '../../assets/payment/mastercard.svg';
import pixFlag from '../../assets/payment/pix.svg';
import billetFlag from '../../assets/payment/billet.svg';
import { TableHeader } from "../../components/Table/Header";

import { paginate } from '../../utils/Pagination';
import { SearchAdmin } from "../../components/Search";

interface OrderProps {
  id: number;
  numeroPedido: string;
  createdAt: Date;
  relativeDate: Date;
  total: string;
  status: string;
  clientName: string;
  paymentType: string;
  paymentFlag: string;
}

type PaymentType = 'visa' | 'mastercard' | 'pix' | 'billet';

const cardFlags: Record<PaymentType, string> = {
  visa: visaFlag,
  mastercard: mastercardFlag,
  pix: pixFlag,
  billet: billetFlag
  // Adicione outros tipos e bandeiras conforme necessário
};


export function Orders() {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  // const [filteredOrders, setFilteredOrders] = useState<OrderProps[]>([]);

  Title({ title: "Pedidos" });

  useEffect(() => {
    const generateFakeOrders = () => {
      const paymentTypes: PaymentType[] = ['visa', 'mastercard', 'pix', 'billet'];
      const fakeOrders: OrderProps[] = Array.from({ length: 50 }, (_, index) => {
        const paymentType = faker.helpers.arrayElement(paymentTypes);
        return {
          id: index + 1,
          numeroPedido: faker.number.int({ min: 100000000000000, max: 999999999999999 }).toString(),
          createdAt: faker.date.past(),
          relativeDate: faker.date.past(),
          total: faker.commerce.price({ symbol: "R$ " }).replace(".", ","),
          status: faker.helpers.arrayElement([
            'AGUARDANDO PAGAMENTO', 
            'PEDIDO AUTORIZADO', 
            'PAGAMENTO APROVADO', 
            'PRODUTOS EM SEPARAÇÃO', 
            'FATURADO', 
            'PRONTO PARA ENVIO', 
            'EM TRANSPORTE', 
            'ENTREGUE', 
            'CANCELADO'
          ]),
          clientName: faker.person.fullName(),
          paymentType,
          paymentFlag: cardFlags[paymentType]
        };
      });
      setOrders(fakeOrders);
    };

    generateFakeOrders();
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentOrders, totalPages] = paginate(filteredOrders, currentPage, itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };


  return (
    <>
      <Header title="Pedidos" />
      <div className="pb-4">
      <SearchAdmin value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value), setCurrentPage(1)}}/>
        {currentOrders.length > 0 ? (
          <div className="d-flex justify-content-center align-items-center flex-column">
            <table className="table table-hover shadow-sm">
            <TableHeader numeroDoPedido data total status />
              <tbody>
                {currentOrders.map((order) => (
                  <TableRowOrders
                  key={order.id}
                  clientName={order.clientName}
                  createdAt={order.createdAt}
                  id={order.id}
                  numeroPedido={order.numeroPedido}
                  relativeDate={order.relativeDate}
                  status={order.status}
                  total={order.total}
                  paymentFlag={order.paymentFlag}/>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItens={`${orders.length} ${orders.length > 1 ? 'pedidos' : 'pedido'}`}
            />
          </div>
        ) : (
          <p className="text-secondary text-center">Nenhum pedido encontrado.</p>
        )}
      </div>
    </>
  );
}
