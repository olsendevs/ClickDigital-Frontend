import {
  MdArrowCircleUp,
  MdAttachMoney,
  MdListAlt,
  MdMoneyOff,
  MdOutlinePersonOff,
  MdPerson,
  MdPersonAdd,
  MdSupervisedUserCircle,
} from 'react-icons/md';

import Widget from 'components/widget/Widget';
import { useEffect, useState } from 'react';
import api from 'api/api';
import CheckTable from './components/CheckTable';

const Dashboard = () => {
  const [clientsData, setClientsData] = useState({
    total: 0,
    active: 0,
    disabled: 0,
  });
  const [moneyData, setMoneyData] = useState({
    profit: 0,
    entry: 0,
    expense: 0,
  });
  const [tableData, setTableData] = useState([]);
  const columnsDataServices = [
    {
      Header: 'Nome',
      accessor: 'name',
    },
    {
      Header: 'Fatura',
      accessor: 'invoice',
    },
    {
      Header: 'Data de expiração',
      accessor: 'validateDate',
    },
    {
      Header: 'WhatsApp',
      accessor: 'whatsapp',
    },
  ];

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);

    return result;
  };

  useEffect(() => {
    let profit = 0;
    let entry = 0;
    let expense = 0;
    api
      .get('customer/home')
      .then((response) => {
        const result = response.data.customers.map((item) => {
          return {
            name: item.name,
            invoice: item.invoice,
            validateDate: addDays(
              new Date(item.validateDate),
              1,
            ).toLocaleDateString('pt-BR', {
              timezone: 'America/Sao_Paulo',
            }),
            whatsapp: item.whatsapp,
          };
        });
        entry = response.data.allCustomers.reduce(
          (s, i) => (s += Number(i.planId.value['$numberDecimal'])),
          0,
        );
        expense = response.data.allCustomers.reduce(
          (s, i) => (s += Number(i.serviceId.cost['$numberDecimal'])),
          0,
        );
        profit = entry - expense;
        setMoneyData({
          profit: `R$ ${profit.toFixed(2)}`,
          entry: `R$ ${entry.toFixed(2)}`,
          expense: `R$ ${expense.toFixed(2)}`,
        });
        setClientsData({
          total: response.data.totalCustomers,
          active: response.data.totalActive,
          disabled: response.data.totalDisabled,
        });
        setTableData(result);
      })
      .catch((error) => {
        console.error('Erro na requisição GET:', error);
      });
  }, []);

  return (
    <div>
      {/* Card widget */}
      <h1 className="mt-10 text-xl flex">
        {' '}
        <MdSupervisedUserCircle className="h-7 w-7" /> Clientes no Sistema
      </h1>
      <div className="mt-3 grid grid-cols-3 gap-5 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3">
        <Widget
          icon={<MdPerson className="h-7 w-7" />}
          title={'Clientes Total'}
          subtitle={clientsData.total}
        />
        <Widget
          icon={<MdPersonAdd className="h-6 w-6" />}
          title={'Clientes Ativos'}
          subtitle={clientsData.active}
        />
        <Widget
          icon={<MdOutlinePersonOff className="h-7 w-7" />}
          title={'Clientes Esgotados'}
          subtitle={clientsData.disabled}
        />
      </div>
      {/* Card widget */}
      <h1 className="mt-10 text-xl flex">
        <MdListAlt className="h-7 w-7" />
        Total Financeiro de Clientes
      </h1>
      <div className="mt-3 grid grid-cols-3 gap-5 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3">
        <Widget
          icon={<MdAttachMoney className="h-7 w-7" />}
          title={'Lucros'}
          subtitle={moneyData.profit}
        />
        <Widget
          icon={<MdArrowCircleUp className="h-6 w-6" />}
          title={'Entrada'}
          subtitle={moneyData.entry}
        />
        <Widget
          icon={<MdMoneyOff className="h-7 w-7" />}
          title={'Despesas'}
          subtitle={moneyData.expense}
        />
      </div>
      <CheckTable columnsData={columnsDataServices} tableData={tableData} />
    </div>
  );
};

export default Dashboard;
