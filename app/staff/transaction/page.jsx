"use client";

import React, { useState } from "react";

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
  User,
  Pagination,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  // Checkbox,
  // Link,
  Select,
  SelectItem,
} from "@nextui-org/react";

// import { MdOutlineAlternateEmail, MdOutlineLock } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { IoEllipsisVertical, IoPersonSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

import {
  columns,
  users,
  statusOptions,
  costumer_types,
  transactions,
} from "./data";
import axios from "axios";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "date",
  "time",
  "transaction_no",
  "item_no",
  "item_name",
  "unit_cost",
  "quantity",
  "amount",
  "discount",
  "total",
  "customer_type",
  "customer_name",
  "payment_method",
  "sales_person",
  "remarks",
  "actions",
];

export default function App() {
  const [costumer_name, setCustomerName] = useState("");
  const [costumer_type, setCustomerType] = useState("");
  const [item_name, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit_cost, setUnitCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [payment_method, setPaymentMethod] = useState("");
  const [salesperson, setSalesPerson] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/collection/addtransaction`,
        {
          costumer_name: '',
          costumer_type:'',
          item_name:'',
          quantity:0,
          unit_cost: 0,
          discount: 0,
          amount: 0,
          total: 0,
          payment_method: '',
          salesperson:'',
        }
      );
      console.log(response.data);
      onClose(); // Close modal after successful submission
    } catch (error) {
      console.error("Transaction submission failed:", error);
    }
  };
  // -----------------------
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const variants = [""];
  //  ----------------------
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = users;

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.customer_name?.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
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
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "item_name":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <IoEllipsisVertical className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  // ----------------------------------

  // ----------------------------------
  ("");
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

  const onRowsPerPageChange = React.useCallback((event) => {
    setRowsPerPage(Number(event.target.value));
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

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 mt-5">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<FaSearch className="text-black" />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />

          <div className="flex gap-3">
            <Button color="primary" onPress={onOpen}>
              <LuPlus />
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} users
          </span>
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
    users.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
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
    <>
      <Modal
        isOpen={isOpen}
        // onOpenChange={onClose}
        size="2xl"
        placement="top-center"
      >
        <ModalContent style={{ width: "50rem" }}>
          <ModalHeader className="flex flex-col gap-1 text-black">
            <h3>Add Transaction</h3>
          </ModalHeader>
          <ModalBody>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <div className="w-full md:w-1/2">
                <Select
                  label="Item"
                  value={item_name}
                  onChange={setItemName}
                  className="max-w-xs text-black mb-3"
                >
                  {transactions.map((transaction) => (
                    <SelectItem key={transaction.key} value={transaction.label}>
                      {transaction.label}
                    </SelectItem>
                  ))}
                </Select>

                <Input
                  className="text-black mb-3"
                  value={unit_cost}
                  label="Unit Cost"
                  type="number"
                  onChange={(e) => setUnitCost(parseFloat(e.target.value))}
                />
                <Input
                  className="text-black mb-3"
                  value={quantity}
                  label="Quantity"
                  type="number"
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                />
                <Input
                  className="text-black mb-3"
                  value={discount}
                  label="Discount"
                  type="number"
                  onChange={(e) => setDiscount(parseFloat(e.target.value))}
                />
                <Input
                  className="text-black mb-3"
                  value={amount}
                  label="Amount"
                  type="number"
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                />
              </div>
              <div className="w-full md:w-1/2">
                <Input
                  className="text-black mb-3"
                  value={total}
                  label="Total"
                  type="number"
                  onChange={(e) => setTotal(parseFloat(e.target.value))}
                />
                <Select
                  label="Customer Type"
                  value={costumer_type}
                  onChange={setCustomerType}
                  className="max-w-xs text-black mb-3"
                >
                  {costumer_types.map((type) => (
                    <SelectItem key={type.key} value={type.label}>
                      {type.label}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  className="text-black mb-3"
                  value={costumer_name}
                  label="Customer Name"
                  type="text"
                  onChange={(e) => setCustomerName(e.target.value)}
                />
                <Input
                  className="text-black mb-3"
                  value={payment_method}
                  label="Payment Method"
                  type="text"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <Input
                  className="text-black mb-3"
                  value={salesperson}
                  label="Sales Person"
                  type="text"
                  onChange={(e) => setSalesPerson(e.target.value)}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={handleSubmit}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className="overflow-x-auto">
        <Table
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames=""
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No users found"} items={sortedItems}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell className="text-black">
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
