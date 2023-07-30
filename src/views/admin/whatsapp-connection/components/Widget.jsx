import api from 'api/api';
import Card from 'components/card';
import { useEffect, useState } from 'react';
import { Loading } from './Loading';

const Widget = ({ icon, status, handlerUpdateStatus }) => {
  const [qrCodeImage, setQrCodeImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    api
      .get('qr-code/check')
      .then((response) => {
        if (response.data) {
          handlerUpdateStatus(true);
        } else {
          handlerUpdateStatus(false);
        }
      })
      .catch((error) => {
        console.error('Erro na requisição GET:', error);
      });
  });

  const generateQrCode = () => {
    if (!isLoading) {
      setIsLoading(true);
      api
        .get('qr-code')
        .then((response) => {
          if (response.data === 'Already conected.') {
            handlerUpdateStatus(true);
          } else {
            setQrCodeImage(response.data);
            handlerUpdateStatus(false);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Erro na requisição GET:', error);
        });
    }
  };

  return (
    <Card extra="flex justify-center items-center rounded-[20px] text-center p-5">
      <Loading status={isLoading} />
      <div className="ml-[18px] flex flex h-[90px] w-auto  items-center">
        <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
          <span className="flex items-center text-brand-500 dark:text-white">
            {icon}
          </span>
        </div>
      </div>

      {!status ? (
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            Desconectado
          </h4>
          <p className="font-dm text-sm font-medium text-gray-600">
            Você não possui nenhuma sessão ativa
          </p>
          {qrCodeImage ? (
            <div>
              <img
                src={qrCodeImage}
                alt="QR Code"
                className="mt-5 h-auto w-auto"
              />

              <button
                onClick={() => generateQrCode()}
                className="mt-5 rounded-xl bg-green-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200"
              >
                Gerar novo QR Code
              </button>
            </div>
          ) : (
            <button
              onClick={() => generateQrCode()}
              className="mt-5 rounded-xl bg-green-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200"
            >
              Conectar
            </button>
          )}
        </div>
      ) : (
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            Conectado
          </h4>
          <p className="font-dm text-sm font-medium text-gray-600">
            Sua sessão está ativa!
          </p>
          <button className="mt-5 rounded-xl bg-red-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200">
            Desconectar
          </button>
        </div>
      )}
    </Card>
  );
};

export default Widget;
