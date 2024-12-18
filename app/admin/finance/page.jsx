"use client";
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import FinanceTable from '@/app/components/adminComponents/finance/FInanceTable'
import {useSalesStore} from '@/app/stores/transactionStore'
import { useExpensesStore } from '@/app/stores/ExpensesStore'
import AdminLayout from '../layout/layout'
import { getDateAndTime } from '@/app/composables/dateAndTime'
import { formatDate } from '@/app/composables/formateDateAndTime';
import { BiLineChart, BiLineChartDown } from "react-icons/bi";
import { DateRangePicker, Select, SelectItem } from '@nextui-org/react';
import { IoMdCloseCircle } from "react-icons/io";
import {parseDate} from "@internationalized/date";
import { decodeToken } from '@/app/utils/decodeToken'
import { paymentStore } from '../../stores/paymentStore';
import { formattedNumber } from '@/app/composables/CurrencyFormat'
import { useBalanceStore } from '../../stores/balanceStore';
import axios from 'axios';


export default function Sales() {
  const {columns, itemOptions, typeOptions, transactions, loading, fetchTransactions } = useSalesStore();
  const {categoryList, fetchExpensesCategory, expenses, fetchExpenses,} = useExpensesStore()
  const {options, fetchPayment} = paymentStore()
  const [paymentSourceList, setPaymentSourceList] = useState([])
  const { loadBalance, balance, fetchBalance} = useBalanceStore()
  const [selectedKey, setSelectedKey] = useState("this month")
  const {date} = getDateAndTime()
  const [user, setUser] = useState({})
  const [value, setValue] = React.useState({
    start: parseDate(date),
    end: parseDate(date),
  });

  const [isLoading, setIsLoading] = useState(false)
  const loadData = async () =>{
    setIsLoading(true)
    await fetchPayment()
    await fetchTransactions()
    const responseOptions = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/master/paymentSource')
    setPaymentSourceList(responseOptions.data)
    await fetchExpenses()
    await fetchBalance()
    setIsLoading(false)
  }
  
  useEffect(() =>{
    
    const loadUser = async() => {
      const token = localStorage.getItem("token");
      
      if (token) {
        const decode = await decodeToken(token)
        setUser(decode);
      }
      
    }
    loadUser()
    loadData()
  }, [])

const dateParser = (dateString) => new Date(dateString);
  
// const filteredTransactions = useMemo(() => {
//     const now = new Date();
//     const year = now.getFullYear()
//     if(selectedKey === 'this year'){
//         const filterByYear = transactions.filter(sale => dateParser(sale.date).getFullYear() === year);
//         return filterByYear
//     } 
//     else if (selectedKey === 'this month'){
//         const currentYear = now.getFullYear();
//         const currentMonth = now.getMonth(); 
//         const filterByCurrentMonth = transactions.filter(sale => {
//                 const saleDate = dateParser(sale.date);
//                 return saleDate.getFullYear() === currentYear && saleDate.getMonth() === currentMonth;
//             });

//         return filterByCurrentMonth
//     }else if (selectedKey === 'date range'){
//         const start = new Date(value.start);
//         const end = new Date(value.end);
//         const filterByDateRange = transactions.filter(sales => {
//                 const salesDate = new Date(sales.date);
//                   return salesDate >= start && salesDate <= end;;
//             });

//         return filterByDateRange
//     } else{
//         return transactions
//     }

// }, [transactions, selectedKey, value.start, value.end]);

// const filteredexpenses = useMemo(() => {
//     const now = new Date();
//     const year = now.getFullYear()
//     if(selectedKey === 'this year'){
//         const filterByYear = expenses.filter(expense => dateParser(expense.date).getFullYear() === year);
//         return filterByYear
//     } 
//     else if (selectedKey === 'this month'){
//         const currentYear = now.getFullYear();
//         const currentMonth = now.getMonth(); 
//         const filterByCurrentMonth = expenses.filter(expense => {
//                 const expenseDate = dateParser(expense.date);
//                 return expenseDate.getFullYear() === currentYear && expenseDate.getMonth() === currentMonth;
//             });

//         return filterByCurrentMonth
//     }
//     else if (selectedKey === 'date range'){
//         const start = new Date(value.start);
//         const end = new Date(value.end);
//         const filterByDateRange = expenses.filter(expense => {
//                 const expenseDate = new Date(expense.date);
//                   return expenseDate >= start && expenseDate <= end;;
//             });

//         return filterByDateRange
//     } else{
//         return expenses
//     }

// }, [expenses, selectedKey, value.start, value.end]);

const groupSalesByDay = useMemo(() => {
    const salesByDay = transactions.reduce((acc, sale) => {
        const date = sale.date; 
        if (!acc[date]) {
            acc[date] = { totalSales: 0, totalExpenses: 0, payment_source: {}, sales_source: {} };
        }
        
        options.map((row) => {
          const newName = row.name.replace(/([a-z])([A-Z])/g, '$1_$2') .replace(/\s+/g, '_').replace(/-+/g, '_').toLowerCase();
          acc[date].sales_source[newName] = acc[date].sales_source[newName] || 0
          if(row.name === sale.payment_options)
          acc[date].sales_source[newName] = (acc[date].sales_source[newName] || 0) + sale.amount_paid;    
        });
        acc[date].totalSales += sale.amount_paid;
        paymentSourceList.map((row) => {
          const newName = row.name.replace(/([a-z])([A-Z])/g, '$1_$2') .replace(/\s+/g, '_').replace(/-+/g, '_').toLowerCase();
          acc[date].payment_source[newName] = acc[date].payment_source[newName] || 0
        });
        return acc;
    }, {});

    const expensesByDay = expenses.reduce((acc, expense) => {
        const date = expense.date; 
        if (!acc[date]) {
          acc[date] = { totalSales: 0, totalExpenses: 0, payment_source: {} };
        }
        paymentSourceList.map((row) => {
          const newName = row.name.replace(/([a-z])([A-Z])/g, '$1_$2') .replace(/\s+/g, '_').replace(/-+/g, '_').toLowerCase();
          acc[date].payment_source[newName] = acc[date].payment_source[newName] || 0
          if(row.name === expense.payment_source)
          acc[date].payment_source[newName] = (acc[date].payment_source[newName] || 0) + expense.total;    
        });
        acc[date].totalExpenses += expense.total;
        return acc;
    }, {});

    const combinedData = { ...salesByDay };
    Object.keys(expensesByDay).forEach((date) => {
        if (!combinedData[date]) {
            combinedData[date] = { totalSales: 0, totalExpenses: 0, payment_source: {}, sales_source: {} };
            options.map((row) => {
              const newName = row.name.replace(/([a-z])([A-Z])/g, '$1_$2') .replace(/\s+/g, '_').replace(/-+/g, '_').toLowerCase();
              combinedData[date].sales_source[newName] =  0
            });
        }
        combinedData[date].totalExpenses += expensesByDay[date].totalExpenses;
        combinedData[date].payment_source = {...expensesByDay[date].payment_source}
    });
    
    return combinedData;
    
}, [transactions, expenses, paymentSourceList]);

const getTotal = (combinedData) => {
    return combinedData.reduce(
      (acc, data) => {
            acc.totalSales += data.totalSales;
            acc.totalExpenses += data.totalExpenses;
        return acc;
      },
      { totalSales: 0, totalExpenses: 0,  }
    );
  };

  const balanceData = useMemo(() => {
    return balance.reduce(
      (acc, item) => {
        acc.totalBalance += item.amount;
  
        paymentSourceList.forEach((row) => {
          const newName = row.name
            .replace(/([a-z])([A-Z])/g, '$1_$2')
            .replace(/\s+/g, '_')
            .replace(/-+/g, '_')
            .toLowerCase();
  
          acc[newName] = acc[newName] || 0;
          const pushItem = (newName, amount) => {
            const existingSource = acc.salesSource.find((src) => src.date === item.date);
            if (existingSource) {
              existingSource[newName] = existingSource[newName] || 0
              existingSource[newName] = (existingSource[newName] || 0) + amount;
              existingSource.total += amount
            } else {
              acc.salesSource.push({ date: item.date, [newName]: amount, total: amount});
            }
          }
          if (row.name.toLowerCase().includes(item.type.toLowerCase())) {
            pushItem(newName, item.amount)
          } else{
            pushItem(newName, 0)
          }
  
        });
  
        return acc;
      },
      { totalBalance: 0, salesSource: [] }
    );
  }, [balance, paymentSourceList]);
  


  const {totalBalance, salesSource} = balanceData
  

  
  const sortedPaymentSourceList = paymentSourceList.sort((a, b) => a.name - b.name)
  const sortedOptionsList = options.sort((a, b) => a.name - b.name)

  const financeData = useMemo(() => {
    const fixedData = Object.entries(groupSalesByDay).map(([date, data]) => ({
      date,
      totalSales: data.totalSales,
      sales_source: data.sales_source,
      payment_source: data.payment_source,
      totalExpenses: data.totalExpenses,
    }));
  
    const sortedData = fixedData.sort((a, b) => new Date(a.date) - new Date(b.date));
  
    let previousSourceBalance
    const computedData = [];
    previousSourceBalance = null

    sortedData.forEach((data) => {
      const net = data.totalSales - data.totalExpenses;
      const prevSourceBalance = () => {
        const existingSource = salesSource.find((src) => src.date === data.date)
        if(existingSource) {
          return {...existingSource}; 
        }

        
        const reducedResult = paymentSourceList.reduce(
          (acc, row) => {
              const newName = row.name.replace(/([a-z])([A-Z])/g, '$1_$2') .replace(/\s+/g, '_').replace(/-+/g, '_').toLowerCase();
              acc[newName] = 0
              acc.total = 0
            return acc
          },
          {}
         )
        return reducedResult
      }

      const newPrevBalData = prevSourceBalance()
      if(previousSourceBalance !== null) {
        const combinedPrevAndNew = () => {
          return previousSourceBalance = paymentSourceList.reduce((acc, row) => {
            const newName = normalizeName(row.name);
            acc[newName] = previousSourceBalance[newName] + newPrevBalData[newName];
            return acc;
          }, { ...previousSourceBalance })
        
        }
        previousSourceBalance = combinedPrevAndNew()
  
      } else {
        previousSourceBalance = newPrevBalData
      }
      

      const calculateSourceBalance = () => {
        return sortedOptionsList.reduce((acc, item) => {
          const optionName = normalizeName(item.name);
          let matched = false;
          sortedPaymentSourceList.forEach((row) => {
            const newName = normalizeName(row.name);
            acc[newName] = acc[newName] || 0;
            
            if (isNameMatch(item.name, row.name)) {
              matched = true;
              acc[newName] =
              previousSourceBalance[newName] +
              (data.sales_source[optionName] || 0) -
              (data.payment_source[newName] || 0);

              acc.total += acc[newName]
            }
          });
  
          if (!matched) {
            acc.others = previousSourceBalance.others+
                      (data.sales_source[optionName] || 0) -
                      (data.payment_source.others || 0);
            acc.total += acc.others
          };
  
          return acc;
        }, {total: 0});
      };
  
      const currentSourceBalance = calculateSourceBalance()
      // const currentSourceBalance = useMemo(() => {
      //   return calculateSourceBalance();
      // }, [sortedOptionsList, sortedPaymentSourceList, previousSourceBalance]);
  
      const endBalance = previousSourceBalance.total + net;
  
      computedData.push({
        date: data.date,
        totalSales: data.totalSales,
        totalExpenses: data.totalExpenses,
        net,
        sales_source: data.sales_source,
        payment_source: data.payment_source,
        prev_source_balance: previousSourceBalance,
        prevBalance: previousSourceBalance.total,
        end_source_balance: currentSourceBalance,
        endBalance,
      });
  
    
      previousSourceBalance = currentSourceBalance;
    });
  
    return computedData;
  }, [groupSalesByDay, totalBalance, salesSource, sortedOptionsList, sortedPaymentSourceList]);
  
  function normalizeName(name) {
    return name
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/\s+/g, '_')
      .replace(/-+/g, '_')
      .toLowerCase();
  }
  
  function isNameMatch(sourceName, paymentName) {
    const aliases = {
      cash: ['cash in the box', 'cash in box'],
      gcash: ['gcash'],
    };
    const sourceAliases = aliases[sourceName.toLowerCase()] || [sourceName.toLowerCase()];
    return sourceAliases.includes(paymentName.toLowerCase());
  }
  

const filteredData = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear()
    if(selectedKey === 'this year'){
        const filterByYear = financeData.filter(finance => dateParser(finance.date).getFullYear() === year);
        return filterByYear
    } 
    else if (selectedKey === 'this month'){
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth(); 
        const filterByCurrentMonth = financeData.filter(finance => {
                const financeDate = dateParser(finance.date);
                return financeDate.getFullYear() === currentYear && financeDate.getMonth() === currentMonth;
            });

        return filterByCurrentMonth
    }
    else if (selectedKey === 'date range'){
        const start = new Date(value.start);
        const end = new Date(value.end);
        const filterByDateRange = financeData.filter(finance => {
                const financeDate = new Date(finance.date);
                  return financeDate >= start && financeDate <= end;;
            });

        return filterByDateRange
    } else{
        return financeData
    }

}, [financeData, selectedKey, value.start, value.end]);

const totals = useMemo(() => {
  return getTotal(filteredData);
}, [filteredData]);

const { totalSales, totalExpenses} = totals
  return (
    <AdminLayout>
        <main className="flex flex-1 rounded-md flex-col gap-4 m-4 lg:gap-6 lg:m-6">
          <div className='flex flex-col gap-2'>
            <div className=" rounded-xl bg-white dark:bg-gray-900 p-5">
              <div className='flex gap-5'>
                <div>
                  <h1 className="font-bold text-2xl text-blue-950 dark:text-blue-600">Summary Report</h1>
                  <span className="text-sm text-slate-400">{"Let's"} see the current statistic performance</span>
                  <Select
                  label="Filter Sales"
                  defaultSelectedKeys={[selectedKey]}
                  value={selectedKey}
                  onChange={(e)=> setSelectedKey(e.target.value)}
                  >
                    <SelectItem key="this month">This Month</SelectItem>
                    <SelectItem key="this year">This Year</SelectItem>
                    <SelectItem key="date range">Date Range</SelectItem>
                    <SelectItem key="all">All</SelectItem>
                  </Select>
                </div>
                <div className='w-full'>
                  <div className='p-3 shadow-sm rounded-xl bg-gradient-to-r from-blue-900 to-blue-600 flex flex-col gap-2 w-full'>
                    <div className='text-sm font-bold text-slate-100 rounded-xl  p-2 flex justify-between items-end'>
                      {selectedKey === "date range"? (
                        <div className='mt-2'>
                          <DateRangePicker
                            value={value}
                            onChange={setValue}
                            color='primary'
                            size='sm'
                            startContent={
                              <div>
                                <IoMdCloseCircle 
                                className='cursor-pointer hover:text-red-400' 
                                onClick={()=>(setValue({
                                    start: parseDate(date),
                                    end: parseDate(date),
                                  })
                                )}
                            /></div>
                            }
                          />
                      </div>
                      ) : null}
                      {selectedKey === 'this month'? (
                        <span>{(formatDate(date)).split(" ")[0]} - {(formatDate(date)).split(" ")[2]}</span>
                      ) : selectedKey === 'this year'? (
                        <span>January - December {(formatDate(date)).split(" ")[2]}</span>
                      ): selectedKey === 'date range'? (
                        <span>{formatDate(value.start)} - {formatDate(value.end)}</span>
                      ): null}
                    </div>
                      <div className='flex flex-col items-start gap-2'>
                        <span className='font-sans font-semibold text-slate-100'>Balance: <span>₱ {formattedNumber(totalBalance + (totalSales - totalExpenses))}</span></span>
                        {/* {selectedKey === 'today'? (
                          <span className='text-slate-200 text-md font-bold'>₱{ formattedNumber(totalSalesToday) }</span>
                        ) : selectedKey === 'date range'? (
                          <span className='text-slate-200 text-md font-bold'>₱{ formattedNumber(totalSalesInRange) }</span>
                        ) : (
                          <span className='text-slate-200 text-md font-bold'>₱{ formattedNumber(totalSales) }</span>
                        )} */}
                        <div className='flex items-start gap-5 bg-white dark:bg-gray-800 w-full'>
                          {/* {options.length > 0? ( */}
                            <div className='border border-blue-600 p-3 rounded-md w-full'>
                              {/* <span>Payment Method Breakdown</span> */}
                              <div className='grid grid-cols-2 gap-4'>
                                  {/* {options.map((transactionOptions) => ( */}
                                    {/* salesByOptions[transactionOptions.name] > 0? ( */}
                                      <div className='flex  gap-1 items-center'>
                                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                        <span className='font-sans text-slate-700 dark:text-slate-200 text-sm flex items-center'> Sales: ₱ {formattedNumber(totalSales)} </span>                              
                                      </div>
                                      <div className='flex  gap-1 items-center'>
                                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                        <span className='font-sans text-slate-700 dark:text-slate-200 text-sm flex items-center'> Expenses: ₱ {formattedNumber(totalExpenses)} </span>                              
                                      </div>
                                    {/* ) : null */}
                                  {/* ))} */}
                              </div>
                            </div>
                          {/* ): null} */}

                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-white dark:bg-gray-900 rounded-lg p-5'>
              <FinanceTable financeData={filteredData} loading={isLoading} totalBalance={totalBalance} paymentSourceList={sortedPaymentSourceList} options={sortedOptionsList} done={loadData}/>
            </div>
          </div>
        </main>
    </AdminLayout>
  )
}
