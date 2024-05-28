import React, { useMemo } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  Column,
  Row,
  TableInstance,
  UsePaginationInstanceProps,
  UseGlobalFiltersInstanceProps,
  UsePaginationState,
  UseGlobalFiltersState,
} from "react-table";
import customData from "../db.json";

interface DataItem {
  Overhead: string;
  Jan: number;
  Feb: number;
  March: number;
  April: number;
  May: number;
  June: number;
  July: number;
  August: number;
  September: number;
  October: number;
  November: number;
  December: number;
}

interface GlobalFilterProps {
  preGlobalFilteredRows: Row<DataItem>[];
  globalFilter: string;
  setGlobalFilter: (filterValue: string | undefined) => void;
}

const GlobalFilter: React.FC<GlobalFilterProps> = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;

  return (
    <div className="flex justify-between items-center mb-4">
      <span className="text-xl font-semibold text-gray-700">
        Monthly Overhead Costs
      </span>
      <input
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value || undefined)}
        placeholder={`Search ${count} records...`}
        className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

const DataTable: React.FC = () => {
  const data: DataItem[] = useMemo(() => customData.Sheet1, []);

  const columns: Column<DataItem>[] = useMemo(
    () => [
      { Header: "Overhead", accessor: "Overhead" },
      {
        Header: "Jan",
        accessor: "Jan",
        Cell: ({ value }: { value: number }) => value.toFixed(2),
      },
      {
        Header: "Feb",
        accessor: "Feb",
        Cell: ({ value }: { value: number }) => value.toFixed(2),
      },
      {
        Header: "March",
        accessor: "March",
        Cell: ({ value }: { value: number }) => value.toFixed(2),
      },
      {
        Header: "April",
        accessor: "April",
        Cell: ({ value }: { value: number }) => value.toFixed(2),
      },
      {
        Header: "May",
        accessor: "May",
        Cell: ({ value }: { value: number }) => value.toFixed(2),
      },
      {
        Header: "June",
        accessor: "June",
        Cell: ({ value }: { value: number }) => value.toFixed(2),
      },
      {
        Header: "July",
        accessor: "July",
        Cell: ({ value }: { value: number }) => value.toFixed(2),
      },
      {
        Header: "August",
        accessor: "August",
        Cell: ({ value }: { value: number }) => value.toFixed(2),
      },
      {
        Header: "September",
        accessor: "September",
        Cell: ({ value }: { value: number }) => value.toFixed(2),
      },
      {
        Header: "October",
        accessor: "October",
        Cell: ({ value }: { value: number }) => value.toFixed(2),
      },
      {
        Header: "November",
        accessor: "November",
        Cell: ({ value }: { value: number }) => value.toFixed(2),
      },
      {
        Header: "December",
        accessor: "December",
        Cell: ({ value }: { value: number }) => value.toFixed(2),
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
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable<DataItem>(
    {
      columns,
      data,
      // initialState: {  pageSize: 5 },
    },
    useGlobalFilter,
    usePagination
  ) as TableInstance<DataItem> &
    UsePaginationInstanceProps<DataItem> &
    UseGlobalFiltersInstanceProps<DataItem> & {
      state: UsePaginationState<DataItem> & UseGlobalFiltersState<DataItem>;
    };

  return (
    <div className="container mx-auto p-4">
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md"
        >
          <thead className="bg-indigo-600 text-white">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="p-3 text-left text-xs font-semibold tracking-wide uppercase"
                  >
                    {column.render("Header")}
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
                    <td
                      {...cell.getCellProps()}
                      className="p-3 text-sm text-gray-700 border-t border-gray-200"
                    >
                      {cell.render("Cell")}
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
            {"<<"}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-3 py-1 border border-gray-300 rounded-md shadow-sm disabled:opacity-50"
          >
            {"<"}
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-3 py-1 border border-gray-300 rounded-md shadow-sm disabled:opacity-50"
          >
            {">"}
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="px-3 py-1 border border-gray-300 rounded-md shadow-sm disabled:opacity-50"
          >
            {">>"}
          </button>
        </div>
        <span className="text-sm">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span className="flex items-center">
          | Go to page:{" "}
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
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
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
