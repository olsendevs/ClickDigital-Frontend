import api from 'api/api';
import { useEffect, useState } from 'react';
import CheckTable from './components/CheckTable';
const ServicesCrud = () => {
  const [tableData, setTableData] = useState([]);
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
    api
      .get('service')
      .then((response) => {
        const result = response.data.map((item) => {
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
  }, []);
  return <CheckTable columnsData={columnsDataServices} tableData={tableData} />;
};

export default ServicesCrud;
