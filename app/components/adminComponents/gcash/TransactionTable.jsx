"use client"
import React, { useMemo } from 'react'
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
  } from "@nextui-org/react";
import CreateGcashTransaction from "./CreateGcashTransactions";
import { formatDate, formatTime } from "@/app/composables/formateDateAndTime";
import { formattedNumber } from '@/app/composables/CurrencyFormat'

  const columns = [
    { key: "date", label: "DATE",},
    { key: "time", label: "TIME", },
    { key: "code", label: "CODE", },
    { key: "particulars", label: "PARTICULARS", },
    { key: "debit", label: "DEBIT", },
    { key: "credit",label: "CREDIT",},
    { key: "amount",label: "AMOUNT",},
    // {key: "remarks",label: "REMARKS",},
  ];
  
  
  export default function GcashTransactionTable({transaction_gcash, loadTransaction, refresh}) {
    
    const renderCell = React.useCallback((Item, columnKey) => {
        const cellValue = Item[columnKey];
    
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
            case "debit":
            return (
              <div className="text-left">₱{formattedNumber(Number(cellValue))}</div>
            );
            case "credit":
            return (
              <div className="text-left">₱{formattedNumber(Number(cellValue))}</div>
            );
            case "amount":
            return (
              <div className="text-left">₱{formattedNumber(Number(cellValue))}</div>
            );
            default:
                return cellValue;
        }
      }, []);
    return (
        <div>
            <div>
                <CreateGcashTransaction refresh={refresh}/>
            </div>
            <Table aria-label="Example table with dynamic content" removeWrapper>
                <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={transaction_gcash} isLoading={loadTransaction}>
                {(item) => (
                    <TableRow key={item._id}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </div>
    );
  }
  