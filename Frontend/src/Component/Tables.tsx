import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;

  return (
    <div className="flex justify-between items-center mb-4">
      <span className="text-xl font-semibold text-gray-700">Monthly Overhead Costs</span>
      <input
        value={globalFilter || ''}
        onChange={(e) => {
          setGlobalFilter(e.target.value || undefined);
        }}
        placeholder={`Search ${count} records...`}
        className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}

const DataTable = () => {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/Sheet1')
      .then((res) => setAllData(res.data));
  }, []);

  const data = React.useMemo(() => allData, [allData]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Overhead',
        accessor: 'Overhead',
      },
      {
        Header: 'Jan',
        accessor: 'Jan',
      },
      {
        Header: 'Feb',
        accessor: 'Feb',
      },
      {
        Header: 'March',
        accessor: 'March',
      },
      {
        Header: 'April',
        accessor: 'April',
      },
      {
        Header: 'May',
        accessor: 'May',
      },
      {
        Header: 'June',
        accessor: 'June',
      },
      {
        Header: 'July',
        accessor: 'July',
      },
      {
        Header: 'August',
        accessor: 'August',
      },
      {
        Header: 'September',
        accessor: 'September',
      },
      {
        Header: 'October',
        accessor: 'October',
      },
      {
        Header: 'November',
        accessor: 'November',
      },
      {
        Header: 'December',
        accessor: 'December',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );

  return (
    <div className="container mx-auto p-4">
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-indigo-600 text-white">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="p-3 text-left text-xs font-semibold tracking-wide uppercase"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="hover:bg-gray-100">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="p-3 text-sm text-gray-700 border-t border-gray-200">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="px-3 py-1 border border-gray-300 rounded-md shadow-sm disabled:opacity-50"
          >
            {'<<'}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-3 py-1 border border-gray-300 rounded-md shadow-sm disabled:opacity-50"
          >
            {'<'}
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-3 py-1 border border-gray-300 rounded-md shadow-sm disabled:opacity-50"
          >
            {'>'}
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="px-3 py-1 border border-gray-300 rounded-md shadow-sm disabled:opacity-50"
          >
            {'>>'}
          </button>
        </div>
        <span className="text-sm">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span className="flex items-center">
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            className="ml-2 border border-gray-300 rounded-md shadow-sm w-16 px-2 py-1"
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="ml-2 border border-gray-300 rounded-md shadow-sm px-2 py-1"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DataTable;
