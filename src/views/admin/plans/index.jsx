import api from 'api/api';
import { useEffect, useState } from 'react';
import CheckTable from './components/CheckTable';
const PlansCrud = () => {
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
      Header: 'Plano',
      accessor: 'name',
    },
    {
      Header: 'Valor',
      accessor: 'value',
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
      .get(`plan?page=${page}&size=${itemsPerPage}`)
      .then((response) => {
        console.log(response.data);
        const result = response.data.plans.map((item) => {
          return {
            id: item._id,
            name: item.name,
            value: parseFloat(item.value.$numberDecimal).toFixed(2),
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

export default PlansCrud;
