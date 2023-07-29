import React, { useEffect, useMemo, useState } from 'react';
import Card from 'components/card';

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import { useDisclosure } from '@chakra-ui/hooks';
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import InputField from '../components/InputField';
import api from 'api/api';
import Toast from 'components/toast';
import Swal from 'sweetalert2';
import Datepicker from 'react-tailwindcss-datepicker';
import SwitchField from './SwitchField';
import TextField from './TextField';
import dayjs from 'dayjs';

const CheckTable = (props) => {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [customerName, setCustomerName] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [customerLogin, setCustomerLogin] = useState('');
  const [customerPassword, setCustomerPassword] = useState('');
  const [customerService, setCustomerService] = useState('');
  const [customerServiceOptions, setCustomerServiceOptions] = useState([]);
  const [customerPlanOptions, setCustomerPlanOptions] = useState([]);
  const [customerPlan, setCustomerPlan] = useState('');
  const [customerComment, setCustomerComment] = useState('');
  const [customerInvoice, setCustomerInvoice] = useState('payed');
  const [customerValidateDate, setCustomerValidateDate] = useState('');
  const [customerSendNotificationOn, setCustomerSendNotificationOn] = useState({
    fiveDaysBefore: {
      active: true,
      sended: false,
    },
    threeDaysBefore: {
      active: true,
      sended: false,
    },
    oneDayBefore: {
      active: true,
      sended: false,
    },
    EndDay: {
      active: true,
      sended: false,
    },
    oneDayAfter: {
      active: true,
      sended: false,
    },
  });
  const [customerId, setCustomerId] = useState('');
  const [modalTitle, setModalTittle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = (event, key) => {
    const { checked } = event.target;
    setCustomerSendNotificationOn((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        active: checked,
      },
    }));
    console.log(customerSendNotificationOn);
  };

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const openEditForm = (value) => {
    setModalTittle('Editar');
    setCustomerName(value.name);
    setCustomerWhatsApp(value.whatsapp);
    setCustomerLogin(value.login);
    setCustomerPassword(value.password);
    setCustomerService(value.serviceId._id);
    setCustomerPlan(value.planId._id);
    setCustomerInvoice(value.invoice);
    setCustomerValidateDate({
      startDate: value.endDate,
      endDate: value.endDate,
    });
    setCustomerComment(value.comment);
    setCustomerSendNotificationOn(value.sendNotificationOn);
    setCustomerId(value.id);
    onOpen();
  };

  const openCreateForm = () => {
    setModalTittle('Adicionar');
    setCustomerName('');
    setCustomerWhatsApp('');
    setCustomerLogin('');
    setCustomerPassword('');
    setCustomerService('');
    setCustomerPlan('');
    setCustomerInvoice('payed');
    setCustomerValidateDate({
      startDate: '',
      endDate: '',
    });
    setCustomerComment('');
    setCustomerSendNotificationOn({
      fiveDaysBefore: {
        active: true,
        sended: false,
      },
      threeDaysBefore: {
        active: true,
        sended: false,
      },
      oneDayBefore: {
        active: true,
        sended: false,
      },
      EndDay: {
        active: true,
        sended: false,
      },
      oneDayAfter: {
        active: true,
        sended: false,
      },
    });
    setCustomerId('');
    onOpen();
  };

  const submitForm = () => {
    setIsLoading(true);

    api
      .post('customer', {
        name: customerName,
        whatsapp: customerWhatsApp,
        login: customerLogin,
        password: customerPassword,
        serviceId: document.getElementById('customer.service').value,
        planId: document.getElementById('customer.plan').value,
        invoice: customerInvoice,
        validateDate: customerValidateDate.endDate,
        sendNotificationOn: {
          fiveDaysBefore: {
            active: document.getElementById(
              'customer.sendNotification.fiveDaysBefore',
            ).checked,
            sended: false,
          },
          threeDaysBefore: {
            active: document.getElementById(
              'customer.sendNotification.threeDaysBefore',
            ).checked,
            sended: false,
          },
          oneDayBefore: {
            active: document.getElementById(
              'customer.sendNotification.oneDayBefore',
            ).checked,
            sended: false,
          },
          EndDay: {
            active: document.getElementById('customer.sendNotification.endDay')
              .checked,
            sended: false,
          },
          oneDayAfter: {
            active: document.getElementById(
              'customer.sendNotification.oneDayAfter',
            ).checked,
            sended: false,
          },
        },
        comment: customerComment,
      })
      .then((response) => {
        Toast.fire({
          icon: 'success',
          title: 'Seu cliente foi criado com sucesso!',
        });
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 1500);

        setIsLoading(false);
      })
      .catch((error) => {
        Toast.fire({
          icon: 'error',
          title: 'Erro ao criar cliente, tente novamente mais tarde.',
        });
      });
  };

  const editCustomer = () => {
    setIsLoading(true);
    console.log(customerValidateDate);
    document.getElementById(
      'customer.sendNotification.fiveDaysBefore',
    ).checked = false;
    api
      .patch('customer/' + customerId, {
        name: customerName,
        whatsapp: customerWhatsApp,
        login: customerLogin,
        password: customerPassword,
        serviceId: document.getElementById('customer.service').value,
        planId: document.getElementById('customer.plan').value,
        invoice: customerInvoice,
        validateDate: customerValidateDate.endDate,
        sendNotificationOn: customerSendNotificationOn,
        comment: customerComment,
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

        setIsLoading(false);
      })
      .catch((error) => {
        Toast.fire({
          icon: 'error',
          title: 'Erro ao editar cliente, tente novamente mais tarde.',
        });
      });
  };
  const confirmDeleteCustomer = (id) => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Não será possivel reverter essa exclusão!',
      icon: 'warning',
      position: 'top',
      showCancelButton: true,
      confirmButtonColor: '#422afb',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCustomer(id);
      }
    });
  };

  const deleteCustomer = (id) => {
    setIsLoading(true);
    api
      .delete('Customer/' + id)
      .then((response) => {
        console.log(response.data);

        Toast.fire({
          icon: 'success',
          title: 'Seu cliente foi deletado com sucesso!',
        });

        setTimeout(() => {
          window.location.reload();
        }, 1500);

        setIsLoading(false);
      })
      .catch((error) => {
        Toast.fire({
          icon: 'error',
          title: 'Erro ao excluir cliente, tente novamente mais tarde.',
        });
      });
  };

  const handleValidateDateChange = (newValue) => {
    setCustomerValidateDate(newValue);
  };

  useEffect(() => {
    api
      .get('service')
      .then((response) => {
        const result = response.data.map((item) => {
          return { name: item.name, id: item._id };
        });
        setCustomerServiceOptions(result);
      })
      .catch((error) => {
        console.error('Erro na requisição GET:', error);
      });
    api
      .get('plan')
      .then((response) => {
        const result = response.data.map((item) => {
          return { name: item.name, id: item._id };
        });
        setCustomerPlanOptions(result);
      })
      .catch((error) => {
        console.error('Erro na requisição GET:', error);
      });
  }, []);

  return (
    <Card extra={'w-full h-full sm:overflow-auto px-6 mt-1'}>
      <header className="relative flex items-center justify-between pt-4">
        <button
          onClick={() => {
            openCreateForm();
          }}
          className="flex items-center justify-center rounded-full bg-brand-500 p-2 text-3xl text-white transition duration-200 hover:cursor-pointer hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          <MdAdd />
        </button>
      </header>
      <Modal isOpen={isOpen} onClose={onClose} className="!z-[1010]">
        <ModalOverlay className="bg-[#000] !opacity-30" />
        <ModalContent className="!z-[1002] !m-auto !w-max min-w-[700px] !max-w-[85%] md:top-[12vh]">
          <ModalBody>
            <Card extra="px-[30px] pt-[35px] pb-[40px] max-w-[700px] flex !z-[1004]">
              <h1 className="mb-[20px] text-2xl font-bold">
                {modalTitle} Cliente
              </h1>
              <div className="grid grid-cols-2 gap-2">
                <InputField
                  label="Nome"
                  placeholder="Ex: João Vitor"
                  id="customer.name"
                  type="text"
                  extra="w-full"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
                <InputField
                  label="WhatsApp do Cliente"
                  placeholder="WhatsApp Ex: 554899999999 tudo junto"
                  id="customer.whatsapp"
                  type="text"
                  extra="w-full"
                  value={customerWhatsApp}
                  onChange={(e) => setCustomerWhatsApp(e.target.value)}
                />
                <InputField
                  label="Login"
                  placeholder="Ex: joao.vitor@email.com"
                  id="customer.login"
                  type="text"
                  extra="w-full"
                  value={customerLogin}
                  onChange={(e) => setCustomerLogin(e.target.value)}
                />
                <InputField
                  label="Senha"
                  placeholder="Digite uma senha"
                  id="customer.password"
                  type="text"
                  extra="w-full"
                  value={customerPassword}
                  onChange={(e) => setCustomerPassword(e.target.value)}
                />
                <div className={`w-full`}>
                  <label
                    for="invoice"
                    class="text-sm font-bold text-navy-700 dark:text-white"
                  >
                    Serviço
                  </label>
                  <select
                    id="customer.service"
                    class=" mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                    value={customerService}
                    onChange={(e) => setCustomerService(e.target.value)}
                  >
                    {customerServiceOptions.map((option) => (
                      <option value={option.id}>{option.name}</option>
                    ))}
                  </select>
                </div>
                <div className={`w-full`}>
                  <label
                    for="invoice"
                    class="text-sm font-bold text-navy-700 dark:text-white"
                  >
                    Plano
                  </label>
                  <select
                    id="customer.plan"
                    class=" mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                    value={customerPlan}
                    onChange={(e) => setCustomerPlan(e.target.value)}
                  >
                    {customerPlanOptions.map((option) => (
                      <option value={option.id}>{option.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2">
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
                    Data de Validade
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
                <div className={`w-full`}>
                  <label
                    for="invoice"
                    class="text-sm font-bold text-navy-700 dark:text-white"
                  >
                    Enviar Notificações
                  </label>
                  <div className={`w-100 mt-1`}>
                    <SwitchField
                      desc="1 dia vencido"
                      id="customer.sendNotification.oneDayAfter"
                      checked={customerSendNotificationOn.oneDayAfter.active}
                      onChange={(e) => handleCheckboxChange(e, 'oneDayAfter')}
                    />
                    <SwitchField
                      desc="no dia"
                      id="customer.sendNotification.endDay"
                      checked={customerSendNotificationOn.EndDay.active}
                      onChange={(e) => handleCheckboxChange(e, 'EndDay')}
                    />
                    <SwitchField
                      desc="1 dia antes"
                      id="customer.sendNotification.oneDayBefore"
                      checked={customerSendNotificationOn.oneDayBefore.active}
                      onChange={(e) => handleCheckboxChange(e, 'oneDayBefore')}
                    />
                    <SwitchField
                      desc="3 dias antes"
                      id="customer.sendNotification.threeDaysBefore"
                      checked={
                        customerSendNotificationOn.threeDaysBefore.active
                      }
                      onChange={(e) =>
                        handleCheckboxChange(e, 'threeDaysBefore')
                      }
                    />
                    <SwitchField
                      desc="5 dias antes"
                      id="customer.sendNotification.fiveDaysBefore"
                      checked={customerSendNotificationOn.fiveDaysBefore.active}
                      onChange={(e) =>
                        handleCheckboxChange(e, 'fiveDaysBefore')
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-1 gap-2">
                <div className={`w-full`}>
                  <TextField
                    label="Observações"
                    id="customer.comments"
                    value={customerComment}
                    onChange={(e) => setCustomerComment(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-10 flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="linear rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                >
                  Cancelar
                </button>
                <button
                  onClick={() =>
                    modalTitle === 'Adicionar' ? submitForm() : editCustomer()
                  }
                  className="linear rounded-xl bg-brand-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-700 active:bg-brand-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                >
                  Salvar
                </button>
              </div>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table
          {...getTableProps()}
          className="w-full"
          variant="simple"
          color="gray-500"
          mb="24px"
        >
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                    key={index}
                  >
                    <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                      {column.render('Header')}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = '';
                    if (cell.column.Header === 'Nome') {
                      data = (
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === 'WhatsApp') {
                      data = (
                        <div className="flex items-center">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            <div className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-bold uppercase text-navy-700 transition duration-200 dark:bg-white/10 dark:text-white">
                              {cell.value}
                            </div>
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === 'Plano') {
                      data = (
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === 'Serviço') {
                      data = (
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === 'Fatura') {
                      data = (
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value === 'payed' ? (
                              <div className="rounded-lg bg-green-500 px-3 py-2 text-xs font-bold uppercase text-white transition duration-200 dark:bg-green-400">
                                Pago
                              </div>
                            ) : (
                              <div className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-bold uppercase text-white transition duration-200 dark:bg-orange-400">
                                Pendente
                              </div>
                            )}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === 'Vencimento') {
                      data = (
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {dayjs(cell.value).format('DD/MM/YYYY')}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === 'Status') {
                      data = (
                        <div className="flex items-center gap-2">
                          {dayjs(cell.value).format('DD/MM/YYYY') ===
                          dayjs(new Date()).format('DD/MM/YYYY') ? (
                            <div className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-bold uppercase text-white transition duration-200 dark:bg-orange-400">
                              Vence Hoje
                            </div>
                          ) : new Date(cell.value).setHours(0, 0, 0, 0) <
                            new Date().setHours(0, 0, 0, 0) ? (
                            <div className="rounded-lg bg-red-500 px-3 py-2 text-xs font-bold uppercase text-white transition duration-200 dark:bg-red-400">
                              Vencido
                            </div>
                          ) : (
                            <div className="rounded-lg bg-green-500 px-3 py-2 text-xs font-bold uppercase text-white transition duration-200 dark:bg-green-400">
                              Ativo
                            </div>
                          )}
                        </div>
                      );
                    } else if (cell.column.Header === 'Ação') {
                      data = (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditForm(row.original)}
                            className="flex items-center justify-center rounded-xl bg-brand-500 p-1 text-2xl text-white transition duration-200 hover:cursor-pointer hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                          >
                            <MdEdit />
                          </button>
                          <button
                            onClick={() => {
                              confirmDeleteCustomer(row.original.id);
                            }}
                            className="flex items-center justify-center rounded-xl bg-red-500 p-1 text-2xl text-white transition duration-200 hover:cursor-pointer hover:bg-red-700 active:bg-brand-700 dark:bg-red-500 dark:text-white dark:hover:bg-red-700 dark:active:bg-red-200"
                          >
                            <MdDelete />
                          </button>
                        </div>
                      );
                    }
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={index}
                        className="pt-[14px] pb-[16px] sm:text-[14px]"
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CheckTable;
