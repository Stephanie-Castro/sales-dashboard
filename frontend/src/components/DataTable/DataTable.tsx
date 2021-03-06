import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { SalePage } from "types/sale";
import { formatLocalDate } from "utils/format";
import { getAllSalesWithPagination } from "../../services/apiService";

const DataTable = () => {
  const [page, setPage] = useState<SalePage>({
    totalElements: 0,
    totalPages: 0,
    number: 0,
    first: true,
    last: true,
  });

  const[activePage, setActivePage] = useState(0);

  useEffect(() => {
    getAllSalesWithPagination(activePage, 20).then((data) => {
      setPage(data);
    });
  }, [activePage]);

  function changePage(index: number) {
    setActivePage(index);
  }

  return (
    <>
      <Pagination page={page} onPageChange={changePage} />
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Data</th>
              <th>Vendedor</th>
              <th>Clientes visitados</th>
              <th>Negócios fechados</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {page.content?.map((item, index) => (
              <tr key={index}>
                <td>{formatLocalDate(item.date, "dd/MM/yyyy")}</td>
                <td>{item.seller.name}</td>
                <td>{item.visited}</td>
                <td>{item.deals}</td>
                <td>{item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;
