"use client"
import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner} from "@nextui-org/react";
import { formatDate, formatTime } from "@/app/composables/formateDateAndTime";
import { formattedNumber } from "@/app/composables/CurrencyFormat"

export default function FinanceTable({combinedData, loading}) {
    
  return (
    <Table removeWrapper aria-label="Example static collection table" >
      <TableHeader>
        <TableColumn>DATE</TableColumn>
        <TableColumn>SALES</TableColumn>
        <TableColumn>EXPENSES</TableColumn>
        <TableColumn>NET</TableColumn>
      </TableHeader>
      <TableBody isLoading={loading} loadingContent={<Spinner label="Loading..." />}>
            {Object.entries(combinedData).map(([date, data]) => (
                <TableRow key={date}>
                    <TableCell>{formatDate(date)}</TableCell>
                    <TableCell>{formattedNumber(data.totalSales)}</TableCell>
                    <TableCell>{formattedNumber(data.totalExpenses)}</TableCell>
                    <TableCell>{formattedNumber(data.totalSales - data.totalExpenses)}</TableCell>
                </TableRow>
            ))}
        </TableBody>
        
    </Table>
  );
}