"use client"
import React, { useEffect, useMemo, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, Button} from "@nextui-org/react";
import { formatDate, formatTime } from "@/app/composables/formateDateAndTime";
import { formattedNumber } from "@/app/composables/CurrencyFormat"
import CreateOrUpdate from "./CreateOrUpdateBalance";
import ViewReport from "./ViewReport"
import { FaSync } from "react-icons/fa";

export default function FinanceTable({financeData, loading, paymentSourceList, options, done}) {
  console.log(financeData)
  const sortedFinanceDescending = financeData.sort((a, b) => new Date(b.date) - new Date(a.date))
  return (
    <div>
      <div className="py-3 flex justify-between">
        <CreateOrUpdate done={done}/>
        <div className="flex gap-5">
          <ViewReport financeData={financeData} loading={loading} paymentSourceList={paymentSourceList} options={options} done={done}/>
          <Button isIconOnly color="success" onPress={done} size='sm'><FaSync className="w-4 h-4 text-white"/></Button>
        </div>
      </div>
      <Table removeWrapper aria-label="Example static collection table">
        <TableHeader 
            classNames={{
                th: "bg-blue-300 text-dark"
            }}>
          <TableColumn>DATE</TableColumn>
          <TableColumn>Beggining Balance</TableColumn>
          <TableColumn>SALES</TableColumn>
          <TableColumn>EXPENSES</TableColumn>
          <TableColumn>NET</TableColumn>
          <TableColumn>End day Balance</TableColumn>
        </TableHeader>
        <TableBody isLoading={loading} loadingContent={<Spinner label="Loading..." />}>
              {sortedFinanceDescending.map((data) => (
                  <TableRow key={data.date}>
                      <TableCell>{formatDate(data.date)}</TableCell>
                      <TableCell>₱ {formattedNumber(data.prevBalance)}</TableCell>
                      <TableCell>₱ {formattedNumber(data.totalSales)}</TableCell>
                      <TableCell>₱ {formattedNumber(data.totalExpenses)}</TableCell>
                      <TableCell>₱ {formattedNumber(data.net)}</TableCell>
                      <TableCell>₱ {formattedNumber(data.endBalance)}</TableCell>
                  </TableRow>
              ))}
          </TableBody>
          
      </Table>
    </div>
  );
}