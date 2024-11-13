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
    color: "hsl(var(--chart-2))",
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
    // Initialize sales and expenses for each month
    const monthlySales = Array(12).fill(0);
    const monthlyExpenses = Array(12).fill(0);
  
    // Loop over transactions and calculate total sales for each month
    props.transactions.forEach(item => {
      const [year, month] = item.date.split('-'); // Destructure the date string
      const monthIndex = parseInt(month, 10) - 1; // Convert to zero-based index
      monthlySales[monthIndex] += item.total; // Add to the correct month's sales
    });
  
    // Loop over expenses and calculate total expenses for each month
    props.expenses.forEach(item => {
      const [year, month] = item.date.split('-');
      const monthIndex = parseInt(month, 10) - 1; // Convert to zero-based index
      monthlyExpenses[monthIndex] += item.total; // Add to the correct month's expenses
    });
  
    // Create a new array for the chart data
    const newChartData = monthlySales.map((sales, index) => ({
      month: new Date(0, index).toLocaleString('en-US', { month: 'long' }), // Convert index to month name
      sales,
      expenses: monthlyExpenses[index],
    }));
  
    // If there's any data for November, update the chartData state
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
