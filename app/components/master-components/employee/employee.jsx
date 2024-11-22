"use client"
import React, { useEffect, useMemo, useCallback, useState } from "react";
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
  Spinner,
  Tooltip
} from "@nextui-org/react";
import { Avatar, AvatarImage, AvatarFallback } from '@/app/components/ui/avatar'
import { BiEditAlt } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { IoChevronDown } from "react-icons/io5";
import { useUserStore } from "@/app/stores/userStore";
import { capitalize } from "@/app/composables/utils";
import ViewDetails from "@/app/components/adminComponents/employee/ViewDetails";
import CreateUser from './CreateOrUpdate';
import DeleteUser from './deleteUser'

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "job_title", "status", "actions"];

export default function EmployeeAccount() {
  const { columns, statusOptions, users, loading, fetchUsers } = useUserStore();
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({ column: "age", direction: "ascending" });
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => 
    visibleColumns === "all" ? columns : columns.filter(column => visibleColumns.has(column.uid)),
    [visibleColumns, columns]
  );

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filteredUsers = filteredUsers.filter(user =>
        statusFilter.includes(user.status)
      );
    }
    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredItems.slice(start, start + rowsPerPage);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((user, columnKey) => {
    switch (columnKey) {
      case "name":
        const name = user.name.split(" ")
        return (
          <div className="flex gap-2">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.p" alt="@shadcn" />
                <AvatarFallback>{name[0][0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1>{user.name}</h1>
              <span className="text-slate-400 text-sm font-thin">{user.id_number}</span>
            </div>
          </div>

        );
      case "job_title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{user.job_title}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{user.department}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {user.status}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex justify-center items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <ViewDetails data={user} />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <BiEditAlt />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteUser id={user.id} refresh={fetchUsers}/>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return user[columnKey];
    }
  }, []);

  const handlePageChange = (direction) => {
    setPage(prevPage => {
      if (direction === 'next' && prevPage < pages) return prevPage + 1;
      if (direction === 'previous' && prevPage > 1) return prevPage - 1;
      return prevPage;
    });
  };

  const onRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  const onSearchChange = (value) => {
    setFilterValue(value || "");
    setPage(1);
  };

  const onClear = () => {
    setFilterValue("");
    setPage(1);
  };

  const topContent = useMemo(() => (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<CiSearch />}
          value={filterValue}
          onClear={onClear}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<IoChevronDown className="text-small" />} variant="flat">
                Status
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
              {statusOptions.map(status => (
                <DropdownItem key={status.uid} className="capitalize">
                  {capitalize(status.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<IoChevronDown className="text-small" />} variant="flat">
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map(column => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <CreateUser done={fetchUsers}/>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">Total {users.length} users</span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select className="bg-transparent outline-none text-default-400 text-small" onChange={onRowsPerPageChange}>
            {[5, 10, 15].map(count => (
              <option key={count} value={count}>{count}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  ), [filterValue, statusFilter, visibleColumns, onRowsPerPageChange, users.length]);

  const bottomContent = useMemo(() => (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-small text-default-400">
        {selectedKeys === "all" ? "All items selected" : `${selectedKeys.size} of ${filteredItems.length} selected`}
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
        <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={() => handlePageChange('previous')}>
          Previous
        </Button>
        <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={() => handlePageChange('next')}>
          Next
        </Button>
      </div>
    </div>
  ), [selectedKeys, filteredItems.length, page, pages]);

  return (
    
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{ wrapper: "max-h-[382px]" }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
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
      <TableBody 
        emptyContent={"No users found"} 
        items={sortedItems}
        isLoading={loading}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
