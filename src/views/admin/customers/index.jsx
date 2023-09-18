import api from 'api/api';
import { useEffect, useState } from 'react';
import CheckTable from './components/CheckTable';
import dayjs from 'dayjs';
import './css/darkmode.css';
import Filters from './components/filters';
const CustomersCrud = () => {
  const [tableData, setTableData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [planFilter, setPlanFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [billingFilter, setBillingFilter] = useState('all');
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
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Vencimento',
      accessor: 'endDate',
    },
    {
      Header: 'Fatura',
      accessor: 'invoice',
    },
    {
      Header: 'Ação',
      accessor: 'action',
    },
  ];

  useEffect(() => {
    fetchCustomers(currentPage);
  }, [
    itemsPerPage,
    currentPage,
    planFilter,
    serviceFilter,
    statusFilter,
    billingFilter,
  ]);

  const fetchCustomers = (page) => {
    api
      .get(
        `customer?page=${page}&size=${itemsPerPage}&plan=${planFilter}&service=${serviceFilter}&status=${statusFilter}&billing=${billingFilter}`,
      )
      .then((response) => {
        const result = response.data.customers.map((item) => {
          return {
            name: item.name,
            id: item._id,
            whatsapp: item.whatsapp,
            plan: `${item.planId.name} (R$${parseFloat(
              item.planId.value.$numberDecimal,
            ).toFixed(2)})`,
            device: item.device,
            mac: item.mac,
            key: item.key,
            apps: item.apps,
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
        setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
        setTableData(result);
      })
      .catch((error) => {
        console.error('Erro na requisição GET:', error);
      });
  };
  return (
    <>
      <Filters
        setPlanFilter={setPlanFilter}
        setServiceFilter={setServiceFilter}
        setStatusFilter={setStatusFilter}
        setBillingFilter={setBillingFilter}
      />
      <CheckTable
        columnsData={columnsDataServices}
        tableData={tableData}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </>
  );
};

export default CustomersCrud;
