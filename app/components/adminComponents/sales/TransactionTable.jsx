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
  DropdownSection,
  Chip,
  Pagination,
  Spinner, 
  Tooltip,
  Select,
  SelectItem
} from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { IoChevronDown } from "react-icons/io5";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { RiDeleteBin4Line } from "react-icons/ri";
import { MdPaid } from "react-icons/md";
import {capitalize} from "@/app/composables/utils";
import ExpandTransaction from './ExpandModal'
import ExportToPdf from '@/app/composables/exportToPdf'
import CreateTransaction from './AddTransaction'
import DeleteSale from "./DeleteSales";
import UpdateSale from "./PatialUpdate";
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

const INITIAL_VISIBLE_COLUMNS = ["transaction_no", "item_name", "unit_cost",  "customer_type", "customer_name", "payment_options", "sales_person", "actions"];
const INITIAL_VISIBLE_COLUMNS_ALL = ["date", "time", "transaction_no", "item_no", "item_name", "unit_cost", "quantity", "sub_total", "discount", "total_amount", "amount_paid", "customer_type", "customer_name","payment_options", "payment_method", "sales_person", "balance", "remarks"];
const SEARCH_SELECTION = [
  {name:"Transaction Number", key: "transaction_no", },
  {name:"Item name", key: "item_name", },
  {name:"Customer type", key: "customer_type", },
  {name:"Customer name", key: "customer_name", },
  {name:"Payment Options", key: "payment_options", },
  {name:"Sales Person", key: "sales_person"},
]

export default function Transaction({columns, transactions, itemOptions, typeOptions, loading, isMaximized, user, refresh}) {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns] = useState(isMaximized? INITIAL_VISIBLE_COLUMNS_ALL : INITIAL_VISIBLE_COLUMNS);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter] = useState("all");
  const [filterSelection, setFilterSelection] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(isMaximized? 20 : 5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.dataKey));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredTransactions = [...transactions];

    if (hasSearchFilter) {
      filteredTransactions = filteredTransactions.filter((item) =>
        item.item_name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if ( statusFilter !== "all" &&
        Array.from(statusFilter).length !== transactions.length
    ) {
        filteredTransactions = filteredTransactions.filter((user) =>
            Array.from(statusFilter).includes(user[filterSelection])
        );
    }
    if (typeFilter !== "all" && Array.from(typeFilter).length !== typeOptions.length) {
      filteredTransactions = filteredTransactions.filter((user) =>
        Array.from(typeFilter).includes(user.customer_type.toLowerCase()),
      );
    }

    return filteredTransactions;
  }, [transactions, filterValue, statusFilter, typeFilter]);

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

  const fetch = (data)=>{
    refresh(data)
  }

  const renderCell = React.useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

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
        case "item_name":
        return (
          <Chip className="capitalize" color={itemColorMap[item.item_name.toLowerCase() === 'photo print'? 'photoprint' : item.item_name.toLowerCase()]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
        case "customer_type":
        return (
          <Chip className="capitalize" color={typeColorMap[item.customer_type.toLowerCase() === 'walk in'? 'walk_in' : item.customer_type.toLowerCase()]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
        case "discount":
        return (
          <div>{cellValue}%</div>
        );
        case "unit_cost":
        return (
          <div>₱{cellValue.toFixed(2)}</div>
        );
        case "total_amount":
        return (
          <div>₱{cellValue.toFixed(2)}</div>
        );
        case "sub_total":
        return (
          <div>₱{cellValue.toFixed(2)}</div>
        );
        case "amount_paid":
        return (
          <div>₱{cellValue.toFixed(2)}</div>
        );
        case "balance":
        return (
          <div>₱{cellValue.toFixed(2)}</div>
        );
        case "customer_name":
        return (
          <div className="text-left">{cellValue}</div>
        );
        case "sales_person":
        return (
          <div className="text-left">{cellValue}</div>
        );
        case "remarks":
        return (
          <div className="text-left">{cellValue}</div>
        );
        case "actions":
        return (
          <div>
            {item.balance === 0 && user.role === 'super admin'?(
              <Tooltip color="danger" content="Delete">
                <Button isIconOnly variant="light" color="danger">
                  <DeleteSale id={item._id} label="" refresh={fetch}/>
                </Button>
              </Tooltip>
            ): (
              <div>
                <Dropdown closeOnSelect={false}>
                  <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                      <IoEllipsisVerticalOutline className="h-4 w-4" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownSection title="Actions">
                      <DropdownItem color="primary"><UpdateSale data={item} isPartial={true}  refresh={fetch}/></DropdownItem>
                      <DropdownItem color="success"><UpdateSale data={item} isPartial={false}  refresh={fetch}/></DropdownItem>
                      </DropdownSection> 
                    {user.role === 'super admin'? (
                      <DropdownSection title="Danger">
                        <DropdownItem color="danger"><DeleteSale id={item._id}  label="Delete" refresh={fetch}/></DropdownItem>
                      </DropdownSection> 
                    ) : null}
                  </DropdownMenu>
                </Dropdown>
              </div>
            )}
          </div>
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
      transactions.sort((a, b) => b[e.target.value] - a[e.target.value]);
      setStatusFilter('all')
  }, [])

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 ">
        <div className="flex justify-end gap-3 items-end">
          <Select 
            placeholder="Filter selection" 
            className="w-full" 
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
            value={statusFilter}
            selectionMode="multiple"
            onSelectionChange={setStatusFilter}
            size="md"
          >
            {(() => {
              const seen = new Set();
              return transactions.map((item) => {
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
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by item name..."
            variant="bordered"
            startContent={<CiSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          {!isMaximized? (
            <div className="flex gap-3">
              <CreateTransaction user={user} refresh={fetch}/>
              <ExportToPdf rows={sortedItems}/>
              {/* {!isMaximized? ( */}
                  <ExpandTransaction columns={columns} transactions={transactions} itemOptions={itemOptions} typeOptions={typeOptions} />
            </div>
          ): null}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {transactions.length} transactions</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    filterSelection,
    visibleColumns,
    onRowsPerPageChange,
    transactions,
    transactions.length,
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
                th: "bg-blue-300 text-dark"
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
                      {(columnKey) => <TableCell className={item.balance > 0? "bg-orange-200" : ''}>{renderCell(item, columnKey)}</TableCell>}
                  </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
        {bottomContent}
    </div>
  );
}
