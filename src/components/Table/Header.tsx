interface TabelHeaderProps {
  id?: boolean;
  nome?: boolean;
  dataDeCadastro?: boolean;
  quantidadeEmEstoque?: boolean;
  numeroDoPedido?: boolean;
  data?: boolean;
  total?: boolean;
  status?: boolean;
}

export function TableHeader({
  nome,
  dataDeCadastro,
  id,
  quantidadeEmEstoque,
  numeroDoPedido,
  data,
  total,
  status,
}: TabelHeaderProps) {
  return (
    <thead>
      <tr>
        {/* <th scope="col" className="d-none d-lg-block">
          <input
            id="header-checkbox"
            className="form-check-input me-1"
            type="checkbox"
          />
        </th> */}
        {id && (
          <th scope="col" className="d-none d-lg-table-cell text-center">
            <small className="text-uppercase text-secondary">ID</small>
          </th>
        )}
        {numeroDoPedido && (
          <th scope="col" className="ps-lg-4">
            <small className="text-uppercase text-secondary">
              Número do pedido
            </small>
          </th>
        )}
        {data && (
          <th scope="col">
            <small className="text-uppercase text-secondary">Data</small>
          </th>
        )}
        {total && (
          <th scope="col">
            <small className="text-uppercase text-secondary">Total</small>
          </th>
        )}
        {status && (
          <th scope="col">
            <small className="text-uppercase text-secondary">Status</small>
          </th>
        )}
        {nome && (
          <th scope="col" className="ps-4">
            <small className="text-uppercase text-secondary">Nome</small>
          </th>
        )}
        {dataDeCadastro && (
          <th scope="col">
            <small className="d-none d-lg-block text-uppercase text-secondary">
              Data de cadastro
            </small>
            <small className="d-block d-lg-none text-uppercase text-secondary">
              Cadastro
            </small>
          </th>
        )}
        {quantidadeEmEstoque && (
          <>
            <th scope="col" className="d-none d-lg-table-cell text-center">
              <small className="text-uppercase text-secondary">
                Quantidade em Estoque
              </small>
            </th>
            <th scope="col" className="d-lg-table-cell text-center">
              <small className="text-uppercase text-secondary">Ações</small>
            </th>
          </>
        )}
      </tr>
    </thead>
  );
}
