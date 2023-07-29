import api from 'api/api';
import { useEffect, useState } from 'react';
import CheckTable from './components/CheckTable';
import dayjs from 'dayjs';
const CustomersCrud = () => {
  const [tableData, setTableData] = useState([]);
  const columnsDataServices = [
    {
      Header: 'Nome',
      accessor: 'name',
    },
    {
      Header: 'WhatsApp',
      accessor: 'whatsapp',
    },
    {
      Header: 'Plano',
      accessor: 'plan',
    },
    {
      Header: 'Serviço',
      accessor: 'service',
    },
    {
      Header: 'Fatura',
      accessor: 'invoice',
    },
    {
      Header: 'Vencimento',
      accessor: 'endDate',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Ação',
      accessor: 'action',
    },
  ];
  useEffect(() => {
    api
      .get('customer')
      .then((response) => {
        console.log(response.data);
        const result = response.data.map((item) => {
          return {
            name: item.name,
            id: item._id,
            whatsapp: item.whatsapp,
            plan: `${item.planId.name} (R$${parseFloat(
              item.planId.value.$numberDecimal,
            ).toFixed(2)})`,
            service: item.serviceId.name,
            invoice: item.invoice,
            login: item.login,
            password: item.password,
            planId: item.planId,
            serviceId: item.serviceId,
            comment: item.comment,
            endDate: item.validateDate.split('T')[0],
            sendNotificationOn: item.sendNotificationOn,
            status: item.validateDate.split('T')[0],
          };
        });
        console.log(result);
        setTableData(result);
      })
      .catch((error) => {
        console.error('Erro na requisição GET:', error);
      });
  }, []);
  return <CheckTable columnsData={columnsDataServices} tableData={tableData} />;
};

export default CustomersCrud;
