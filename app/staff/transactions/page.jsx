'use client';
import React, { useState, useMemo, useEffect } from 'react';

import {
  Modal,
  ModalContent,
  // ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Spinner,
  DateRangePicker,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { CiSearch } from 'react-icons/ci';
import { IoChevronDown } from 'react-icons/io5';
import { capitalize } from '@/app/composables/utils';
import { HiMiniViewfinderCircle } from 'react-icons/hi2';
import { FaChartLine } from 'react-icons/fa';
// import ExpandTransaction from './ExpandModal'
// import ExportToPdf from '@/app/composables/exportToPdf'
// import CreateTransaction from './AddTransaction'
import Addtransaction from '../component/addtransaction';
import { useSalesStore } from '@/app/stores/transactionStore';
import { paymentStore } from '@/app/stores/paymentStore';
import AllTransaction from '../component/showAllTable';
import { parseDate, getLocalTimeZone } from '@internationalized/date';
import { getDateAndTime } from '@/app/composables/dateAndTime';
import { formattedNumber } from '@/app/composables/CurrencyFormat';
// import { FaRegCircleXmark } from 'react-icons/fa6';
import { IoMdCloseCircle } from 'react-icons/io';
import { formatDate } from '../../composables/formateDateAndTime';
// import { isNonNullExpression } from 'typescript';

// import { formatDate, formatTime } from "../../composables/formateDateAndTime";

const itemColorMap = {
  tarpaulin: 'warning',
  photoprint: 'primary',
  photocopy: 'success',
  others: 'danger',
};
const typeColorMap = {
  walk_in: 'success',
  online: 'primary',
};

const INITIAL_VISIBLE_COLUMNS = [
  'transaction_no',
  'item_name',
  'unit_cost',
  'customer_type',
  'customer_name',
  'payment_type',
  'sales_person',
];
// const INITIAL_VISIBLE_COLUMNS_ALL = [
//   "date",
//   "time",
//   "transaction_no",
//   "item_no",
//   "item_name",
//   "unit_cost",
//   "quantity",
//   "amount",
//   "discount",
//   "total",
//   "customer_type",
//   "customer_name",
//   "payment_method",
//   "sales_person",
//   "remarks",
// ];

export default function Transaction() {
  const {
    isOpen: isAddTransactionOpen,
    onOpen: openAddTransaction,
    onClose: closeAddTransaction,
  } = useDisclosure();
  const {
    isOpen: isAllTransactionOpen,
    onOpen: openAllTransaction,
    onClose: closeAllTransaction,
  } = useDisclosure();
  const {
    columns,
    transactions,
    itemOptions,
    typeOptions,
    loading,
    fetchTransactions,
  } = useSalesStore();
  const [filterValue, setFilterValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter] = useState('all');
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const { date } = getDateAndTime();
  const { options, fetchPayment } = paymentStore();
  const [selectedDate, setSelectedDate] = React.useState({
    start: parseDate(date),
    end: parseDate(date),
  });
  const [selectedRange, setSelectedRange] = useState('today');
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'age',
    direction: 'ascending',
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTransactions();
    fetchPayment();
  }, [fetchTransactions]);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.dataKey),
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredTransactions = [...transactions];

    if (!selectedDate) return [];

    if (hasSearchFilter) {
      filteredTransactions = filteredTransactions.filter((item) =>
        item.item_name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== itemOptions.length
    ) {
      filteredTransactions = filteredTransactions.filter((user) =>
        Array.from(statusFilter).includes(user.item_name.toLowerCase()),
      );
    }
    if (
      typeFilter !== 'all' &&
      Array.from(typeFilter).length !== typeOptions.length
    ) {
      filteredTransactions = filteredTransactions.filter((user) =>
        Array.from(typeFilter).includes(user.customer_type.toLowerCase()),
      );
    }

    if (selectedDate?.start && selectedDate?.end) {
      const start = new Date(selectedDate.start);
      const end = new Date(selectedDate.end);

      return filteredTransactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);

        if (selectedRange === 'today') {
          return transaction.date === date;
        } else if (selectedRange === 'daterange') {
          return transactionDate >= start && transactionDate <= end;
        } else {
          return transaction;
        }
      });
    }

    return filteredTransactions;
  }, [
    transactions,
    filterValue,
    statusFilter,
    typeFilter,
    selectedRange,
    selectedDate.start,
    selectedDate.end,
  ]);

  const isDateInRange = (date, start, end) => {
    return date >= start && date <= end;
  };

  const getTotalSalesInRange = (
    transactions,
    start,
    end,
    options,
    selectedRange,
  ) => {
    return transactions.reduce(
      (acc, item) => {
        if (selectedRange === 'today') {
          if (item.date === date) {
            acc.totalSalesToday += item.amount_paid;
            options.forEach((row) => {
            if (row.name === item.payment_options)
              acc[row.name] = (acc[row.name] || 0) + item.amount_paid;
          });
          }
        } else if (selectedRange === 'daterange') {
          const itemDate = new Date(item.date);
          if (isDateInRange(itemDate, start, end)) {
            acc.totalDateRangeSales += item.amount_paid;
            options.forEach((row) => {
            if (row.name === item.payment_options)
              acc[row.name] = (acc[row.name] || 0) + item.amount_paid;
          });
          }
        } else {
          acc.overAllSales += item.amount_paid;
          options.forEach((row) => {
            if (row.name === item.payment_options)
              acc[row.name] = (acc[row.name] || 0) + item.amount_paid;
          });
        }

        return acc;
      },
      { totalSalesToday: 0, totalDateRangeSales: 0, overAllSales: 0 },
    );

    
  };

  const totals = useMemo(() => {
    const start = new Date(selectedDate.start);
    const end = new Date(selectedDate.end);
    return getTotalSalesInRange(transactions, start, end, options);
  }, [selectedRange, selectedDate, transactions, options]);

  const {
    totalSalesToday,
    totalDateRangeSales,
    overAllSales,
    ...salesByOptions
  } = totals;

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case 'transaction_no':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case 'item_name':
        return (
          <Chip
            className="capitalize"
            color={
              itemColorMap[
                user.item_name.toLowerCase() === 'photo print'
                  ? 'photoprint'
                  : user.item_name.toLowerCase()
              ]
            }
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case 'unit_cost':
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            ₱ {cellValue.toFixed(2)}
          </Chip>
        );
      case 'customer_type':
        return (
          <Chip
            className="capitalize"
            color={
              typeColorMap[
                user.customer_type.toLowerCase() === 'walk in'
                  ? 'walk_in'
                  : user.customer_type.toLowerCase()
              ]
            }
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  // const onRowsPerPageChange = React.useCallback((e) => {
  //   setRowsPerPage(Number(e.target.value));
  //   setPage(1);
  // }, []);

  const onDateRange = (e) => {
    const { name, value } = e.target;
    setRowsPerPage(Number(e.target.value));
    // setSelectedRange(e.target.value);
    setSelectedDate((prev) => ({
      ...prev,
      [name]: new Date(value),
    }));

    setPage(1);
  };

  const onSelectRange = (e) => {
    const { value } = e.target;
    setRowsPerPage(Number(e.target.value));
    setSelectedRange((prev) => ({
      ...prev,
      [name]: new Date(value),
    }));
    setPage(1);
  };

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const handleOpenAddTransaction = () => {
    openAddTransaction();
  };

  const handleShowAllTransactions = () => {
    openAllTransaction();
  };
  const topContent = useMemo(() => {
    return (
      <>
        <div className="flex  items-center justify-between p-3 ">
          <span className="flex flex-col  text-2xl">
            <div className="flex items-center gap-2">
              <FaChartLine className="text-2xl" />
              <span>Transaction Overview</span>
            </div>
            <small className="text-base">
              A Complete Record of Your Financial Activity
            </small>
            <Select
              isRequired
              label="Sales Filter"
              placeholder="Select Range"
              defaultSelectedKeys={[selectedRange]}
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className="max-w-xs mr-1"
            >
              <SelectItem key="today">Today</SelectItem>
              <SelectItem key="daterange">Date Range</SelectItem>
              <SelectItem key="all">All</SelectItem>
            </Select>
          </span>
          <div className="flex justify-end">
            <div className=" bg-blue-900 p-1 rounded w-full">
              <div className="  p-2 rounded bg-white justify-between flex">
                {selectedRange === 'daterange' ? (
                  <div>
                    <DateRangePicker
                      className="w-45 mr-5 "
                      size="sm"
                      value={selectedDate}
                      onChange={setSelectedDate}
                      variant="bordered"
                      color="primary"
                      startContent={
                        <div>
                          <IoMdCloseCircle
                            className="cursor-pointer hover:text-red-400"
                            onClick={() =>
                              onDateRange({
                                start: parseDate(date),
                                end: parseDate(date),
                              })
                            }
                          />
                        </div>
                      }
                    />
                  </div>
                ) : null}

                <span className="item-center text-black dark:text-white">
                  {formatDate(selectedDate.start)} -{' '}
                  {formatDate(selectedDate.end)}
                </span>
              </div>
              <div className=" p-1 flex justify-between ">
                <div className="p-1">
                  <span className="font-sans font-semibold text-slate-100">
                    Sales: ₱
                  </span>
                  {selectedRange === 'today' ? (
                    <span className="text-lg text-white dark:text-white">
                      {totalSalesToday.toFixed(2)}
                    </span>
                  ) : selectedRange === 'daterange' ? (
                    <span className="text-lg text-white dark:text-white">
                      {totalDateRangeSales.toFixed(2)}
                    </span>
                  ) : selectedRange === 'all' ? (
                    <span className="text-lg text-white dark:text-white">
                      {overAllSales.toFixed(2)}
                    </span>
                  ) : null}
                </div>
                <div className=" rounded p- bg-white">
                  <div className="flex gap-2">
                    {/* {options.length > 0? options.map((transactionOptions) => (
                          <div
                            className="flex text-black dark:text-white"
                            key={transactionOptions.name}
                          >
                            <span>
                              {transactionOptions.name}: ₱{' '}
                              {(
                                salesByOptions[transactionOptions.name] || 0
                              ).toFixed(2)}
                            </span>
                          </div>
                        ))
                      : null}
                  </div> */}
                    <div className="flex items-start gap-5 bg-white dark:bg-gray-800 w-full">
                      {options.length > 0 ? (
                        <div className="border border-blue-600 p-3 rounded-md w-full">
                          {/* <span>Payment Method Breakdown</span> */}
                          <div className="grid grid-cols-5 gap-4">
                            {options.map((transactionOptions) =>
                              salesByOptions[transactionOptions.name] > 0 ? (
                                <div className="flex flex-col gap-1 items-start">
                                  <span className="font-sans text-slate-700 dark:text-slate-200 text-sm flex items-center">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>{' '}
                                    {transactionOptions.name}:{' '}
                                  </span>
                                  <span className="font-sans text-slate-700 dark:text-slate-200 text-sm">
                                    {' '}
                                    ₱
                                    {salesByOptions[transactionOptions.name]
                                      ? formattedNumber(
                                          salesByOptions[
                                            transactionOptions.name
                                          ],
                                        )
                                      : 0}
                                  </span>
                                </div>
                              ) : null,
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 m-2 mt-3">
          <div className="flex justify-between gap-3 items-end">
            <Input
              isClearable
              variant="bordered"
              color="primary"
              className="w-full sm:max-w-[44%]"
              placeholder="Search by name..."
              startContent={<CiSearch />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />

            <div className="flex gap-3">
              {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<IoChevronDown className="text-small" />} variant="flat">
                  type
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={typeFilter}
                selectionMode="multiple"
                onSelectionChange={setTypeFilter}
              >
                {typeOptions.map((type) => (
                  <DropdownItem key={type.dataKey} className="capitalize">
                    {capitalize(type.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<IoChevronDown className="text-small" />}
                    variant="flat"
                  >
                    Item name
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={setStatusFilter}
                >
                  {itemOptions.map((item) => (
                    <DropdownItem key={item.dataKey} className="capitalize">
                      {capitalize(item.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>

              {/* <CreateTransaction isSubmit={(data)=>(refresh(data))}/> */}
              {/* <ExportToPdf rows={sortedItems}/> */}
              {/* {!isMaximized? (
                <ExpandTransaction columns={columns} transactions={transactions} itemOptions={itemOptions} typeOptions={typeOptions} />
            ): null} */}
            </div>
            {/* <div className="flex gap-3">
            <Button color="primary" onPress={handleOpenAddTransaction}>
              Add{" "}
            </Button>
          </div> */}

            <div className="flex items-center">
              <Button
                className="text-white"
                onPress={handleOpenAddTransaction}
                style={{ backgroundColor: '#191970' }}
              >
                Add{' '}
              </Button>
              <Button variant="transparent" onPress={handleShowAllTransactions}>
                <HiMiniViewfinderCircle />
              </Button>
            </div>
            {/* <div className="flex gap-3">
            <Button variant="transparent" onPress={handleShowAllTransactions}>
              <HiMiniViewfinderCircle />
            </Button>
          </div> */}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">
              Total {transactions.length} transactions
            </span>
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onDateRange}
              >
                <option className="text-blue-400" value="30">
                  30
                </option>
                <option className="text-blue-400" value="60">
                  60
                </option>
                <option className="text-blue-400" value="100">
                  100
                </option>
              </select>
            </label>
          </div>
        </div>
      </>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    // onRowsPerPageChange,
    transactions.length,
    onSearchChange,
    hasSearchFilter,
    onSelectRange,
    onDateRange,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === 'all'
            ? 'All items selected'
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div>
      {topContent}

      <div className=" overflow-x-scroll">
        <Modal
          size="4xl"
          isOpen={isAddTransactionOpen}
          onClose={closeAddTransaction}
          // onValueChange="outside"
          scrollBehavior="outside"
        >
          {/* <ModalContent> */}
          {/* <ModalHeader>Add Transaction</ModalHeader> */}
          {/* <ModalBody className="max-w-md mx-auto"> */}
          <Addtransaction />
          {/* </ModalBody> */}
          {/* </ModalContent> */}
        </Modal>

        <Modal
          size="full"
          isOpen={isAllTransactionOpen}
          onClose={closeAllTransaction}
          scrollBehavior="inside"
        >
          <ModalContent>
            <ModalBody>
              <AllTransaction />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={closeAllTransaction}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Table
          class
          removeWrapper
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
          bottomContentPlacement="outside"
          classNames={{ wrapper: 'max-h-[382px]', th: 'bg-blue-300 text-dark' }}
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.dataKey}
                align="center"
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent={'No transaction found'}
            items={sortedItems}
            isLoading={loading}
            loadingContent={<Spinner label="Loading..." />}
          >
            {(item) => (
              <TableRow key={item._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {bottomContent}
    </div>
  );
}
