"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart"
import { useSalesStore } from '@/app/stores/transactionStore'
import { useEffect, useState } from "react"

export const description = "A stacked area chart"


const chartConfig = {
  sales: {
    label: "Expenses",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Sales",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function Revenue() {
  const {transactions, loading, fetchTransactions } = useSalesStore()
  const [chartData, setChartData] = useState([
    { month: "January", sales: 0, expenses: 0 },
    { month: "February", sales: 0, expenses: 0 },
    { month: "March", sales: 0, expenses: 0 },
    { month: "April", sales: 0, expenses: 0 },
    { month: "May", sales: 0, expenses: 0 },
    { month: "June", sales: 0, expenses: 0 },
    { month: "July", sales: 0, expenses: 0 },
    { month: "August", sales: 0, expenses: 0 },
    { month: "September", sales: 0, expenses: 0 },
    { month: "October", sales: 0, expenses: 0 },
    { month: "November", sales: 0, expenses: 0 },
    { month: "December", sales: 0, expenses: 0 },
  ])

  useEffect(()=>{
    fetchTransactions()
  }, [fetchTransactions])

  const getData = () =>{
    transactions.map((item) =>{
      const date = item.date.split('-')
      // if(date[1].toString() === '11'){
        const total = chartData[10].sales + item.total
        const newData = [...chartData]
        newData[10] = { ...newData[10], sales: total}
        console.log(date[1], total);
        
      // }


    })
  }
  useEffect(()=>{
    getData()
  }, [])
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue - Monthly</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="expenses"
              type="natural"
              fill="var(--color-expenses)"
              fillOpacity={0.4}
              stroke="var(--color-expenses)"
              stackId="a"
            />
            <Area
              dataKey="sales"
              type="natural"
              fill="var(--color-sales)"
              fillOpacity={0.4}
              stroke="var(--color-sales)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
