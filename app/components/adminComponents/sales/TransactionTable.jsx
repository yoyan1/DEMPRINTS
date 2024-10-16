"use client"
import React, {useState, useMemo} from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
} from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { IoChevronDown } from "react-icons/io5";
import {capitalize} from "./utils";
import ExpandTransaction from './ExpandModal'
import ExportToPdf from '@/app/composables/exportToPdf'

const itemColorMap = {
  tarpaulin: "warning",
  photoprint: "primary",
  photocopy: "success",
  others: "danger",
};
const typeColorMap = {
  walk_in: "success",
  online: "primary",
};

const INITIAL_VISIBLE_COLUMNS = ["transaction_no", "item_name", "unit_cost",  "customer_type", "customer_name", "payment_method", "sales_person"];
const INITIAL_VISIBLE_COLUMNS_ALL = ["date", "time", "transaction_no", "item_no", "item_name", "unit_cost", "quantity", "amount", "discount", "total", "customer_type", "customer_name", "payment_method", "sales_person", "remarks"];

export default function Transaction(props) {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns] = useState(props.isMaximized? INITIAL_VISIBLE_COLUMNS_ALL : new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return props.columns;

    return props.columns.filter((column) => Array.from(visibleColumns).includes(column.dataKey));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredTransactions = [...props.transactions];

    if (hasSearchFilter) {
      filteredTransactions = filteredTransactions.filter((item) =>
        item.item_name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== props.itemOptions.length) {
      filteredTransactions = filteredTransactions.filter((user) =>
        Array.from(statusFilter).includes(user.item_name.toLowerCase()),
      );
    }
    if (typeFilter !== "all" && Array.from(typeFilter).length !== props.typeOptions.length) {
      filteredTransactions = filteredTransactions.filter((user) =>
        Array.from(typeFilter).includes(user.customer_type.toLowerCase()),
      );
    }

    return filteredTransactions;
  }, [props.transactions, filterValue, statusFilter, typeFilter]);

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

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
        case "transaction_no":
            return (
            <div className="flex flex-col">
                <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
            );
        case "item_name":
        return (
          <Chip className="capitalize" color={itemColorMap[user.item_name.toLowerCase() === 'photo print'? 'photoprint' : user.item_name.toLowerCase()]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
        case "customer_type":
        return (
          <Chip className="capitalize" color={typeColorMap[user.customer_type.toLowerCase() === 'walk in'? 'walk_in' : user.customer_type.toLowerCase()]} size="sm" variant="flat">
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

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<CiSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
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
                {props.typeOptions.map((type) => (
                  <DropdownItem key={type.dataKey} className="capitalize">
                    {capitalize(type.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<IoChevronDown className="text-small" />} variant="flat">
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
                {props.itemOptions.map((item) => (
                  <DropdownItem key={item.dataKey} className="capitalize">
                    {capitalize(item.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <ExportToPdf rows={sortedItems}/>
            {!props.isMaximized? (
                <ExpandTransaction columns={props.columns} transactions={props.transactions} itemOptions={props.itemOptions} typeOptions={props.typeOptions} />
            ): null}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {props.transactions.length} transactions</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    props.transactions.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
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
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div>
        {topContent}
        <div className="max-w-[82rem] overflow-x-scroll">
            <Table
                removeWrapper
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[382px]",
            }}
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
            <TableBody emptyContent={"No transaction found"} items={sortedItems} >
                {(item) => (
                <TableRow key={item.id}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
        {bottomContent}
    </div>
  );
}
