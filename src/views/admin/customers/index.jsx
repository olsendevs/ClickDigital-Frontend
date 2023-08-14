import api from 'api/api';
import { useEffect, useState } from 'react';
import CheckTable from './components/CheckTable';
import dayjs from 'dayjs';
import './css/darkmode.css';
const CustomersCrud = () => {
  const [tableData, setTableData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
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
    fetchCustomers(currentPage);
  }, [currentPage]);

  const fetchCustomers = (page) => {
    api
      .get(`customer?page=${page}&size=${itemsPerPage}`)
      .then((response) => {
        const result = response.data.customers.map((item) => {
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
        setTotalPages(Math.ceil(response.data.totalCount / 5));
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

export default CustomersCrud;
