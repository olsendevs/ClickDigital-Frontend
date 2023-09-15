import api from 'api/api';
import { useEffect, useState } from 'react';
import CheckTable from './components/CheckTable';
const Messages = () => {
  const [tableData, setTableData] = useState([]);
  const columnsDataServices = [
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Data de envio',
      accessor: 'sendDate',
    },
    {
      Header: 'WhatsApp',
      accessor: 'whatsapp',
    },
    {
      Header: 'Mensagem',
      accessor: 'content',
    },
  ];
  useEffect(() => {
    api
      .get('Message')
      .then((response) => {
        const result = response.data.map((item) => {
          return {
            id: item._id,
            status: 'Enviado ',
            sendDate: item.createAt,
            whatsapp: item.customerId.whatsapp,
            content: item.content,
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

export default Messages;
