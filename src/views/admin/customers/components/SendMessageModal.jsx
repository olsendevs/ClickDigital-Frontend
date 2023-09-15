// Custom components
import { useDisclosure } from '@chakra-ui/hooks';
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import Card from 'components/card';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { MdOutlineMessage, MdOutlineRepeat } from 'react-icons/md';
import Toast from 'components/toast';
import Datepicker from 'react-tailwindcss-datepicker';
import api from '../../../../api/api';
import { Textarea } from '@chakra-ui/react';
import TextField from './TextField';

function SendMessageModal(props) {
  const { whatsapp, open, isLoading } = props;

  const [message, setMessage] = useState('');
  const [customerInvoice, setCustomerInvoice] = useState('payed');

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (open) {
      onOpen();
    } else {
      onClose();
    }
  }, [open, onOpen, onClose]);

  const sendMessage = () => {
    isLoading(true);
    api
      .post('qr-code/send-message', {
        whatsapp: whatsapp,
        message: message,
      })
      .then((response) => {
        console.log(response.data);

        Toast.fire({
          icon: 'success',
          title: 'Sua mensagem foi enviada com sucesso!',
        });
        isLoading(true);
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        Toast.fire({
          icon: 'error',
          title: 'Erro ao enviar mensagem, tente novamente mais tarde.',
        });
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        props.onClose();
      }}
      className="!z-[1010]"
    >
      <ModalOverlay className="bg-[#000] !opacity-30" />
      <ModalContent className="!z-[1002] !m-auto !w-max min-w-[700px] !max-w-[85%] md:top-[12vh]">
        <ModalBody>
          <Card extra="px-[30px] pt-[35px] pb-[40px] max-w-[700px] flex !z-[1004]">
            <h1 className="mb-[20px] text-2xl font-bold flex">
              Enviar mensagem direta
            </h1>
            <div className="grid grid-cols-1 gap-2">
              <div className={`w-full`}>
                <TextField
                  label="Mensagem"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-10 flex justify-end gap-2">
              <button
                onClick={() => {
                  onClose();
                  props.onClose();
                }}
                className="linear rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
              >
                Cancelar
              </button>
              <button
                onClick={sendMessage}
                className="linear rounded-xl bg-brand-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-700 active:bg-brand-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
              >
                Enviar
              </button>
            </div>
          </Card>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SendMessageModal;
