import React, { useMemo } from 'react';
import CardMenu from 'components/card/CardMenu';
import Checkbox from 'components/checkbox';
import Card from 'components/card';

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';

const CheckTable = (props) => {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

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
    <Card extra={'w-full h-full mt-5 sm:overflow-auto px-6'}>
      <header className="relative flex items-center justify-between pt-4 ">
        <div className="text-xl text-center font-bold text-navy-700 dark:text-white">
          Usuário expirando
        </div>
      </header>

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
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {' '}
                          {cell.value}{' '}
                        </p>
                      );
                    } else if (cell.column.Header === 'Fatura') {
                      data = (
                        <div className="flex items-center">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value === 'payed' ? (
                              <div className="rounded-lg bg-green-500 px-2 py-1 text-xs font-bold uppercase text-white transition duration-200 dark:bg-green-400">
                                Pago
                              </div>
                            ) : (
                              <div className="rounded-lg bg-orange-500 px-2 py-1 text-xs font-bold uppercase text-white transition duration-200 dark:bg-orange-400">
                                Pendente
                              </div>
                            )}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === 'Data de expiração') {
                      data = (
                        <div className="flex items-center">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {new Date(cell.value) >= new Date() ? (
                              <div className="rounded-lg bg-green-500 px-2 py-1 text-xs font-bold uppercase text-white transition duration-200 dark:bg-green-400">
                                {cell.value}
                              </div>
                            ) : (
                              <div className="rounded-lg bg-red-500 px-2 py-1 text-xs font-bold uppercase text-white transition duration-200 dark:bg-orange-400">
                                {cell.value}
                              </div>
                            )}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === 'WhatsApp') {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
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
