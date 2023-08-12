import { useEffect, useState } from 'react';
import Widget from './components/Widget';
import { IoMdHome } from 'react-icons/io';
import { MdBarChart, MdDashboard, MdMessage } from 'react-icons/md';
import api from 'api/api';

const MessagesConfiguration = () => {
  const [configMessages, setConfigMessages] = useState({});

  const handleUpdateConfigMessages = (data) => {
    setConfigMessages(data);
  };

  useEffect(() => {
    api
      .get('MessageConfigs')
      .then((response) => {
        const item = response.data;

        const result = {
          _id: item._id,
          fiveDaysBefore: item.fiveDaysBefore,
          threeDaysBefore: item.threeDaysBefore,
          oneDayBefore: item.oneDayBefore,
          EndDay: item.EndDay,
          oneDayAfter: item.oneDayAfter,
        };

        setConfigMessages(result);
      })
      .catch((error) => {
        console.error('Erro na requisição GET:', error);
      });
  }, []);

  const checkStatus = (type) => {
    return configMessages[type] !== '';
  };

  return (
    <div
      style={{ width: 900, marginTop: 20 }}
      className="flex flex-col  justify-between space-y-4"
    >
      <Widget
        icon={<MdMessage className="h-6 w-6" />}
        title={'Mensagem de envio automatico (5 dias)'}
        subtitle={
          'A mensagem será enviada 5 dias antes do vencimento a partir das 12:00'
        }
        status={checkStatus('fiveDaysBefore')}
        type={'fiveDaysBefore'}
        value={configMessages}
        handleUpdateConfigMessages={handleUpdateConfigMessages}
      />
      <Widget
        icon={<MdMessage className="h-6 w-6" />}
        title={'Mensagem de envio automatico (3 dias)'}
        subtitle={
          'A mensagem será enviada 3 dias antes do vencimento a partir das 12:00'
        }
        status={checkStatus('threeDaysBefore')}
        type={'threeDaysBefore'}
        value={configMessages}
        handleUpdateConfigMessages={handleUpdateConfigMessages}
      />
      <Widget
        icon={<MdMessage className="h-6 w-6" />}
        title={'Mensagem de envio automatico (1 dias)'}
        subtitle={
          'A mensagem será enviada 1 dia antes do vencimento a partir das 12:00'
        }
        status={checkStatus('oneDayBefore')}
        type={'oneDayBefore'}
        value={configMessages}
        handleUpdateConfigMessages={handleUpdateConfigMessages}
      />
      <Widget
        icon={<MdMessage className="h-6 w-6" />}
        title={'Mensagem de envio automatico (no dia)'}
        subtitle={
          'A mensagem será enviada no dia do vencimento a partir das 12:00'
        }
        status={checkStatus('EndDay')}
        type={'EndDay'}
        value={configMessages}
        handleUpdateConfigMessages={handleUpdateConfigMessages}
      />
      <Widget
        icon={<MdMessage className="h-6 w-6" />}
        title={'Mensagem de envio automatico (1 dia)'}
        subtitle={
          'A mensagem será enviada 1 dia depois do vencimento a partir das 12:00'
        }
        status={checkStatus('oneDayAfter')}
        type={'oneDayAfter'}
        value={configMessages}
      />
    </div>
  );
};

export default MessagesConfiguration;
