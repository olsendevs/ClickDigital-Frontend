import React, { useMemo, useState } from 'react';
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

const CheckTable = (props) => {
  const { columnsData, tableData, totalPages, currentPage, onPageChange } =
    props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [serivceName, setServiceName] = useState('');
  const [serivceCost, setServiceCost] = useState(0);
  const [serivceId, setServiceId] = useState('');
  const [modalTitle, setModalTittle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
  initialState.pageSize = 100;

  const openEditForm = (value) => {
    setModalTittle('Editar');
    setServiceCost(value.cost);
    setServiceName(value.name);
    setServiceId(value.id);
    onOpen();
  };

  const submitForm = () => {
    setIsLoading(true);
    api
      .post('service', { name: serivceName, cost: parseFloat(serivceCost) })
      .then((response) => {
        console.log(response.data);

        Toast.fire({
          icon: 'success',
          title: 'Seu serviço foi criado com sucesso!',
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
          title: 'Erro ao criar serviço, tente novamente mais tarde.',
        });
      });
  };

  const editService = () => {
    setIsLoading(true);

    api
      .patch('service/' + serivceId, {
        name: serivceName,
        cost: parseFloat(serivceCost),
      })
      .then((response) => {
        console.log(response.data);

        Toast.fire({
          icon: 'success',
          title: 'Seu serviço foi editado com sucesso!',
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
          title: 'Erro ao editar serviço, tente novamente mais tarde.',
        });
      });
  };
  const confirmDeleteService = (id) => {
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
        deleteService(id);
      }
    });
  };

  const deleteService = (id) => {
    setIsLoading(true);
    api
      .delete('service/' + id)
      .then((response) => {
        console.log(response.data);

        Toast.fire({
          icon: 'success',
          title: 'Seu serviço foi deletado com sucesso!',
        });

        setTimeout(() => {
          window.location.reload();
        }, 1500);

        setIsLoading(false);
      })
      .catch((error) => {
        Toast.fire({
          icon: 'error',
          title: 'Erro ao excluir serviço, tente novamente mais tarde.',
        });
      });
  };

  return (
    <Card extra={'w-full h-full sm:overflow-auto px-6 mt-1'}>
      <header className="relative flex items-center justify-between pt-4">
        <button
          onClick={() => {
            onOpen();
            setModalTittle('Adicionar');
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
                {modalTitle} Serviço | Provedor
              </h1>
              <div className="flex gap-2">
                <InputField
                  label="Serviço | Provedor"
                  placeholder="Ex: Assinatura 1"
                  id="service"
                  type="text"
                  extra="w-full"
                  value={serivceName}
                  onChange={(e) => setServiceName(e.target.value)}
                />
                <InputField
                  label="Valor de Custo"
                  placeholder="Ex: R$10"
                  id="cost"
                  type="number"
                  extra="w-full"
                  value={serivceCost}
                  onChange={(e) => setServiceCost(e.target.value)}
                />
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
                    modalTitle === 'Adicionar' ? submitForm() : editService()
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
                    if (cell.column.Header === 'Serviço | Provedor') {
                      data = (
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === 'Custo') {
                      data = (
                        <div className="flex items-center">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            R${cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === 'Id') {
                      data = (
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
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
                              confirmDeleteService(row.original.id);
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
        {/* Pagination */}
        <div className="flex justify-center mt-4 mb-4">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-200 px-4 py-2 rounded-l-xl disabled:bg-gray-400"
          >
            Anterior
          </button>
          <h2 className="p-2 px-4" id="page">
            {currentPage}
          </h2>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-200 px-4 py-2 rounded-r-xl disabled:bg-gray-400"
          >
            Próximo
          </button>
        </div>
      </div>
    </Card>
  );
};

export default CheckTable;
