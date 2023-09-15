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
import dayjs from 'dayjs';

const CheckTable = (props) => {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  initialState.pageSize = 11;

  return (
    <Card extra={'w-full h-full mt-10 sm:overflow-auto px-6 mt-1'}>
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
                    if (cell.column.Header === 'Id') {
                      data = (
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === 'Status') {
                      data = (
                        <div className="flex items-center">
                          <p className="text-center text-sm font-bold text-navy-700 dark:text-white">
                            <div className="rounded-lg bg-green-500 px-3 py-2 text-xs font-bold uppercase text-white transition duration-200 dark:bg-green-400">
                              {cell.value}
                            </div>
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === 'Data de envio') {
                      data = (
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {dayjs(cell.value).format('DD/MM/YYYY')}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === 'WhatsApp') {
                      data = (
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            <div className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-bold uppercase text-navy-700 transition duration-200 dark:bg-white/10 dark:text-white">
                              {cell.value}
                            </div>
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === 'Mensagem') {
                      data = (
                        <div className="flex items-center gap-2">
                          <p className="text-sm  text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
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
