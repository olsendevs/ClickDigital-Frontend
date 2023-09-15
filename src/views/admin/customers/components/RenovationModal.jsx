// Custom components
import { useDisclosure } from '@chakra-ui/hooks';
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import Card from 'components/card';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { MdOutlineRepeat } from 'react-icons/md';
import Toast from 'components/toast';
import Datepicker from 'react-tailwindcss-datepicker';
import api from '../../../../api/api';

function RenovationModal(props) {
  const { id, whatsapp, name, service, open, serviceId } = props;

  const [customerValidateDate, setCustomerValidateDate] = useState('');
  const [customerInvoice, setCustomerInvoice] = useState('payed');

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (open) {
      onOpen();
    } else {
      onClose();
    }
  }, [open, onOpen, onClose]);

  const handleValidateDateChange = (newValue) => {
    setCustomerValidateDate(newValue);
  };

  const renovateCustomer = () => {
    let date = new Date();

    if (customerValidateDate.endDate) {
      date = new Date(customerValidateDate.endDate);
    } else {
      date.setDate(date.getDate() + 31);
    }

    api
      .patch('customer/' + id, {
        invoice: customerInvoice,
        validateDate: date,
      })
      .then((response) => {
        console.log(response.data);

        Toast.fire({
          icon: 'success',
          title: 'Seu cliente foi editado com sucesso!',
        });

        onClose();

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        Toast.fire({
          icon: 'error',
          title: 'Erro ao editar cliente, tente novamente mais tarde.',
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
              <MdOutlineRepeat /> Renovar registro
            </h1>
            <p className="mb-[20px] text-m font-bold">
              Deixe em branco para renovação automática de um mês ou escolha uma
              data personalizada
            </p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className={`w-full`}>
                <label
                  for="invoice"
                  class="text-sm font-bold text-navy-700 dark:text-white"
                >
                  Cliente
                </label>
                <p>{name}</p>
              </div>
              <div className={`w-full`}>
                <label
                  for="invoice"
                  class="text-sm font-bold text-navy-700 dark:text-white"
                >
                  WhatsApp
                </label>
                <p>{whatsapp}</p>
              </div>
              <div className={`w-full`}>
                <label
                  for="invoice"
                  class="text-sm font-bold text-navy-700 dark:text-white"
                >
                  Serviço
                </label>
                <p>
                  {service.reduce(
                    (s, i) => (i.id == serviceId ? (s = i.name) : s),
                    '',
                  )}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className={`w-full`}>
                <label
                  for="invoice"
                  class="text-sm font-bold text-navy-700 dark:text-white"
                >
                  Fatura
                </label>
                <select
                  id="customer.invoice"
                  class=" mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                  value={customerInvoice}
                  onChange={(e) => setCustomerInvoice(e.target.value)}
                >
                  <option value="payed">Pago</option>
                  <option value="pending">Pendente</option>
                </select>
              </div>
              <div className={`w-full`}>
                <label
                  for="invoice"
                  class="text-sm font-bold text-navy-700 dark:text-white"
                >
                  Data personalizada
                </label>
                <Datepicker
                  value={customerValidateDate}
                  startFrom={new Date(customerValidateDate.endDate)}
                  inputId={'customer.validateDate'}
                  onChange={handleValidateDateChange}
                  placeholder="Escolha a data"
                  inputClassName="mt-2 h-12 w-full rounded-xl border p-3 text-sm outline-none"
                  toggleClassName="absolute mt-5 ml-[-30px]"
                  asSingle={true}
                  displayFormat={'DD/MM/YYYY'}
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
                onClick={renovateCustomer}
                className="linear rounded-xl bg-brand-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-700 active:bg-brand-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
              >
                Renovar
              </button>
            </div>
          </Card>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default RenovationModal;
