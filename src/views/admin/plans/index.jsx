import api from 'api/api';
import { useEffect, useState } from 'react';
import CheckTable from './components/CheckTable';
const PlansCrud = () => {
  const [tableData, setTableData] = useState([]);
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
    api
      .get('plan')
      .then((response) => {
        console.log(response.data);
        const result = response.data.map((item) => {
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
  }, []);
  return <CheckTable columnsData={columnsDataServices} tableData={tableData} />;
};

export default PlansCrud;
