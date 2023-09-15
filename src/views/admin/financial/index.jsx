import api from 'api/api';
import { useEffect, useState } from 'react';
import CheckTable from './components/CheckTable';
import Widget from 'components/widget/Widget';
import {
  MdArrowCircleUp,
  MdAttachMoney,
  MdMoneyOff,
  MdOutlinePersonOff,
  MdPerson,
  MdPersonAdd,
} from 'react-icons/md';
const FinancialCrud = () => {
  const [tableData, setTableData] = useState([]);
  const [moneyData, setMoneyData] = useState({
    profit: 0,
    entry: 0,
    expense: 0,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const columnsDataServices = [
    {
      Header: 'Valor',
      accessor: 'value',
    },
    {
      Header: 'Tipo',
      accessor: 'type',
    },
    {
      Header: 'Notas',
      accessor: 'note',
    },
    {
      Header: 'Ação',
      accessor: 'action',
    },
  ];

  useEffect(() => {
    fetchFinancial(currentPage);
  }, [currentPage]);

  const fetchFinancial = (page) => {
    api
      .get(`financial?page=${page}&size=${itemsPerPage}`)
      .then((response) => {
        console.log(response.data);
        const result = response.data.Financials.map((item) => {
          return {
            id: item._id,
            type: item.type,
            note: item.note,
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
    <div>
      <div className="mt-3 mb-5 grid grid-cols-3 gap-5 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3">
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

      <CheckTable
        columnsData={columnsDataServices}
        tableData={tableData}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </div>
  );
};

export default FinancialCrud;
