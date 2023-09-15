import api from 'api/api';
import { useEffect, useState } from 'react';
import CheckTable from './components/CheckTable';
const ServicesCrud = () => {
  const [tableData, setTableData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const columnsDataServices = [
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Serviço | Provedor',
      accessor: 'name',
    },
    {
      Header: 'Custo',
      accessor: 'cost',
    },
    {
      Header: 'Ação',
      accessor: 'action',
    },
  ];

  useEffect(() => {
    fetchCustomers(currentPage);
  }, [currentPage]);

  const fetchCustomers = (page) => {
    api
      .get(`service?page=${page}&size=${itemsPerPage}`)
      .then((response) => {
        const result = response.data.services.map((item) => {
          return {
            id: item._id,
            name: item.name,
            cost: parseFloat(item.cost.$numberDecimal).toFixed(2),
          };
        });
        setTableData(result);
      })
      .catch((error) => {
        console.error('Erro na requisição GET:', error);
      });
  };
  return (
    <CheckTable
      columnsData={columnsDataServices}
      tableData={tableData}
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={(newPage) => setCurrentPage(newPage)}
    />
  );
};

export default ServicesCrud;
