import { useDisclosure } from '@chakra-ui/hooks';
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import Card from 'components/card';
import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import TextField from './TextField';
import api from 'api/api';
import Toast from 'components/toast';
import MessageTriggers from './MessageTriggers';

const Widget = ({
  icon,
  title,
  subtitle,
  status,
  type,
  value,
  handleUpdateConfigMessages,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalData, setModalData] = useState({
    title: '',
    value: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const openEditForm = (type) => {
    const types = {
      fiveDaysBefore:
        'Editar mensagem que será enviada automaticamente 5 dias antes do vencimento',
      threeDaysBefore:
        'Editar mensagem que será enviada automaticamente 3 dias antes do vencimento',
      oneDayBefore:
        'Editar mensagem que será enviada automaticamente 1 dia antes do vencimento',
      EndDay:
        'Editar mensagem que será enviada automaticamente no dia do vencimento',
      oneDayAfter:
        'Editar mensagem que será enviada automaticamente 1 dia depois do vencimento',
    };
    setModalData({
      title: types[type],
      value: value[type],
    });
    onOpen();
  };

  const editConfigMessages = () => {
    setIsLoading(true);

    let body = { ...value };
    body[type] = modalData.value;
    console.log(value);
    api
      .patch('MessageConfigs/' + value._id, body)
      .then((response) => {
        Toast.fire({
          icon: 'success',
          title: 'Sua mensagem foi alterada com sucesso!',
        });
        onClose();
        setTimeout(() => {
          console.log(response.data);
          handleUpdateConfigMessages(response.data);
        }, 1000);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Erro na requisição GET:', error);
      });
  };

  return (
    <Card extra="!flex-row flex-grow items-center rounded-[20px]">
      <Modal isOpen={isOpen} onClose={onClose} className="!z-[1010]">
        <ModalOverlay className="bg-[#000] !opacity-30" />
        <ModalContent className="!z-[1002] !m-auto !w-max min-w-[700px] !max-w-[85%] md:top-[12vh]">
          <ModalBody>
            <Card extra="px-[30px] pt-[35px] pb-[40px] max-w-[700px] flex !z-[1004]">
              <h1 className="mb-[20px] text-xl font-bold">{modalData.title}</h1>
              <div className="">
                <TextField
                  label="Mensagem Automática"
                  value={modalData.value}
                  onChange={(e) =>
                    setModalData({
                      title: modalData.title,
                      value: e.target.value,
                    })
                  }
                />
              </div>
              <MessageTriggers />
              <div className="mt-10 flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="linear rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => editConfigMessages()}
                  className="linear rounded-xl bg-brand-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-700 active:bg-brand-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                >
                  Salvar
                </button>
              </div>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
        <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
          <span className="flex items-center text-brand-500 dark:text-white">
            {icon}
          </span>
        </div>
      </div>

      <div className="h-50 ml-4 flex w-full flex-col justify-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {title}
        </h4>
        <p className="font-dm text-sm font-medium text-gray-600">{subtitle}</p>
      </div>
      <div className="mr-5 flex w-full items-end justify-end space-x-5">
        {status !== true ? (
          <div className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-bold uppercase text-white transition duration-200 dark:bg-orange-400">
            Desativado (Sem mensagem)
          </div>
        ) : (
          <div className="rounded-lg bg-green-500 px-3 py-2 text-xs font-bold uppercase text-white transition duration-200 dark:bg-green-400">
            Ativado
          </div>
        )}

        <button
          onClick={() => openEditForm(type)}
          className="mr-auto flex justify-self-end rounded-xl bg-brand-500 p-1 text-2xl text-white transition duration-200 hover:cursor-pointer hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          <MdEdit />
        </button>
      </div>
    </Card>
  );
};

export default Widget;
