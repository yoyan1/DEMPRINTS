"use client"
import React, {useState, useMemo, useEffect} from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Select,
  SelectItem,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Spinner
} from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { IoChevronDown } from "react-icons/io5";
import { useExpensesStore } from "@/app/stores/ExpensesStore";
import {capitalize} from "@/app/composables/utils";
import ExpandTransaction from './ExpandModal'
import ExportToPdf from '@/app/composables/exportToPdf'
import CreateTransaction from './AddExpenses'
import { formatDate, formatTime } from "@/app/composables/formateDateAndTime";

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

const INITIAL_VISIBLE_COLUMNS = ["date", "transaction_no", "item_name", "category", "type", "unit_cost", "quantity", "total"];
const SEARCH_SELECTION = [
  {name:"Transaction Number", key: "transaction_no", },
  {name:"Item name", key: "item_name", },
  {name:"Category", key: "category", },
  {name:"Type", key: "type", },
]
export default function Transaction({categoryList, columns, expenses, loading, refresh}) {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter] = useState("all");
  const [filterSelection, setFilterSelection] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const refreshExpenses = (data) =>{
    refresh(data)
  }
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.dataKey));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredExpenses = [...expenses];

    if (hasSearchFilter) {
      filteredExpenses = filteredExpenses.filter((item) =>
        item.item_name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if ( categoryFilter !== "all" &&
      Array.from(categoryFilter).length !== expenses.length
    ) {
        filteredExpenses = filteredExpenses.filter((expense) =>
            Array.from(categoryFilter).includes(expense[filterSelection])
        );
    }

    return filteredExpenses;
  }, [expenses, filterValue, filterSelection, categoryFilter,]);

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
        case "date":
            return (
            <div className="flex flex-col">
                <p className="text-bold text-small capitalize">{formatDate(cellValue)}</p>
            </div>
            );
        case "time":
            return (
            <div className="flex flex-col">
                <p className="text-bold text-small capitalize">{formatTime(cellValue)}</p>
            </div>
            );
        case "transaction_no":
            return (
            <div className="flex flex-col">
                <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
            );
        case "category":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
        // case "customer_type":
        // return (
        //   <Chip className="capitalize" color={typeColorMap[user.customer_type.toLowerCase() === 'walk in'? 'walk_in' : user.customer_type.toLowerCase()]} size="sm" variant="flat">
        //     {cellValue}
        //   </Chip>
        // );
        case "unit_cost":
        return (
          <div className="text-left">₱{cellValue.toFixed(2)}</div>
        );
        case "total":
        return (
          <div className="text-left">₱{cellValue.toFixed(2)}</div>
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

  const handleSelectionChange = React.useCallback((e)=>{
    setFilterSelection(e.target.value)
    setCategoryFilter('all')
}, [])
  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 ">
        <div className="flex justify-between gap-3 items-end">
          <Select 
            placeholder="Filter selection" 
            className="w-full max-w-lg" 
            value={filterSelection}
            onChange={handleSelectionChange}
            size="md"
          >
            {SEARCH_SELECTION.map((item) => (
              <SelectItem key={item.key}>
                {item.name}
              </SelectItem>
            ))}
          </Select>
          {filterSelection? (
            <Select 
            placeholder={filterSelection}
            className="w-full" 
            value={categoryFilter}
            selectionMode="multiple"
            onSelectionChange={setCategoryFilter}
            size="md"
          >
            {(() => {
              const seen = new Set();
              return expenses.map((item) => {
                const value = item[filterSelection];
                if (seen.has(value)) return null; 
                seen.add(value);
                return (
                  <DropdownItem key={value} className="capitalize">
                    {capitalize(value)}
                  </DropdownItem>
                );
              });
            })()}
          </Select>
           
          ): null}
          <div className="flex gap-3">
            <CreateTransaction isSubmit={refreshExpenses}/>
            {/* <ExportToPdf rows={sortedItems}/>
            {!isMaximized? (
                <ExpandTransaction columns={columns} expenses={expenses} itemOptions={itemOptions} typeOptions={typeOptions} />
            ): null} */}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {expenses.length} expenses</span>
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
    filterSelection,
    categoryFilter,
    visibleColumns,
    onRowsPerPageChange,
    expenses,
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
        <div className="overflow-x-scroll">
            <Table
            removeWrapper
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[382px]",
            }}
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
            <TableBody emptyContent={"No transaction found"} items={sortedItems}  isLoading={loading} loadingContent={<Spinner label="Loading..." />} >
                {(item) => (
                <TableRow key={item._id}>
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
