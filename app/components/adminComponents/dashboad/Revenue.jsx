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
import { useEffect, useState } from "react"

export const description = "A stacked area chart"


const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-3))",
  },
} 

export default function Revenue(props) {
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


  const getData = () => {
    const monthlySales = Array(12).fill(0);
    const monthlyExpenses = Array(12).fill(0);
  
    props.transactions.forEach(item => {
      const [year, month] = item.date.split('-'); 
      const monthIndex = parseInt(month, 10) - 1; 
      monthlySales[monthIndex] += item.total_amount; 
    });

    props.expenses.forEach(item => {
      const [year, month] = item.date.split('-');
      const monthIndex = parseInt(month, 10) - 1; 
      monthlyExpenses[monthIndex] += item.total; 
    });

    const newChartData = monthlySales.map((sales, index) => ({
      month: new Date(0, index).toLocaleString('en-US', { month: 'long' }), 
      sales,
      expenses: monthlyExpenses[index],
    }));
  
    if (newChartData[10].sales > 0 || newChartData[10].expenses > 0) {
      setChartData(newChartData);
    }
  };
  


  useEffect( ()=>{
    getData()
  }, [])
  return (
    <Card className="dark:bg-gray-900">
      <CardHeader>
        <CardTitle>Revenue - Monthly</CardTitle>
        <CardDescription>
          Showing total sales and expenses for this 12 months
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
              dataKey="sales"
              type="natural"
              fill="var(--color-expenses)"
              fillOpacity={0.4}
              stroke="var(--color-expenses)"
              stackId="a"
            />
            <Area
              dataKey="expenses"
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
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - December 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
