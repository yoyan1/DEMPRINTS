"use client"
import React, { useEffect, useMemo, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner} from "@nextui-org/react";
import { formatDate, formatTime } from "@/app/composables/formateDateAndTime";
import { formattedNumber } from "@/app/composables/CurrencyFormat"
import CreateOrUpdate from "./CreateOrUpdateBalance";

export default function FinanceTable({combinedData, loading, totalBalance, done}) {
  const financeData = useMemo(()=> {
    let newData = [{
      prevBalance: 0,
      endBalance:  0
    }]

    let index = 0
    Object.entries(combinedData).map(([date, data]) => {
      if(index > 0){
        const newPrevBal = newData[index-1].endBalance 
        const net = data.totalSales - data.totalExpenses
        newData.push({
          date,
          totalSales: data.totalSales,
          totalExpenses: data.totalExpenses,
          net: data.totalSales - data.totalExpenses ,
          prevBalance: newData[index-1].endBalance,
          endBalance:  newPrevBal + net
        })
      } else{
        newData = [{
          date,
          totalSales: data.totalSales,
          totalExpenses: data.totalExpenses,
          net: data.totalSales - data.totalExpenses,
          prevBalance: totalBalance,
          endBalance: totalBalance + (data.totalSales - data.totalExpenses), 
        }]
      }
      index++
      
    })

    return newData
  }, [combinedData])
  return (
    <div>
      <div className="p-3 flex justify-start">
        <CreateOrUpdate />
      </div>
      <Table removeWrapper aria-label="Example static collection table">
        <TableHeader>
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