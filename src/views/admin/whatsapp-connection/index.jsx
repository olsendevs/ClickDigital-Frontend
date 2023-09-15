import { useState } from 'react';
import Widget from './components/Widget';
import { MdSignalWifi3BarLock } from 'react-icons/md';

const WhatsappConnection = () => {
  const [status, setStatus] = useState(false);

  const handlerUpdateStatus = (value) => {
    setStatus(value);
  };

  return (
    <div
      style={{ marginTop: 20 }}
      className="flex flex-col  justify-between space-y-4"
    >
      <Widget
        icon={<MdSignalWifi3BarLock className="h-10 w-10" />}
        status={status}
        handlerUpdateStatus={handlerUpdateStatus}
      />
    </div>
  );
};

export default WhatsappConnection;
