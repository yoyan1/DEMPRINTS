"use client"
import React, { useEffect, useMemo, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, Button} from "@nextui-org/react";
import { formatDate, formatTime } from "@/app/composables/formateDateAndTime";
import { formattedNumber } from "@/app/composables/CurrencyFormat"
import CreateOrUpdate from "./CreateOrUpdateBalance";
import ViewReport from "./ViewReport"
import { FaSync } from "react-icons/fa";

export default function FinanceTable({financeData, loading, paymentSourceList, options, done}) {

  const dateOptions = useMemo(() => {
    let dateList =[]
    financeData.map((row) => dateList.push(row.date))
    return dateList

  }, [financeData])
  return (
    <div>
      <div className="py-3 flex justify-between">
        <CreateOrUpdate dateOptions={dateOptions} refresh={done}/>
        <div className="flex gap-5">
          <ViewReport financeData={financeData} loading={loading} paymentSourceList={paymentSourceList} options={options} done={done}/>
          <Button isIconOnly color="success" onPress={done} size='sm'><FaSync className="w-4 h-4 text-white"/></Button>
        </div>
      </div>
      <Table isHeaderSticky isCompact removeWrapper aria-label="Example static collection table" classNames={()=> ({
        wrapper: ["max-h-[382px]", "max-w-3xl"],
        th: ["bg-transparent", "text-default-500", "border-b", "border-divider", "w-96"],
        td: [
          // changing the rows border radius
          // first
          "group-data-[first=true]:first:before:rounded-none",
          "group-data-[first=true]:last:before:rounded-none",
          // middle
          "group-data-[middle=true]:before:rounded-none",
          // last
          "group-data-[last=true]:first:before:rounded-none",
          "group-data-[last=true]:last:before:rounded-none",
        ],
      })}>
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
              {financeData.map((data) => (
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