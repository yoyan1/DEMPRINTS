"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
import { useEffect, useState, useMemo } from "react"


const chartConfig = {
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-1))",
  },
}

export default function Component(props) {
  const now = new Date()
  const yearNow = now.getFullYear()
  const [chartData, setChartData] = useState([
    { month: "January", expenses: 0 },
    { month: "February", expenses: 0 },
    { month: "March", expenses: 0 },
    { month: "April", expenses: 0 },
    { month: "May", expenses: 0 },
    { month: "June", expenses: 0 },
    { month: "July", expenses: 0 },
    { month: "August", expenses: 0 },
    { month: "September", expenses: 0 },
    { month: "October", expenses: 0 },
    { month: "November", expenses: 0 },
    { month: "December", expenses: 0 },
  ])

  const dateParser = (dateString) => new Date(dateString);
  const filteredExpenses = useMemo(() => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      const filterByCurrentMonth = props.expenses.filter(expense => {
          const expenseDate = dateParser(expense.date);
          return expenseDate.getFullYear() === currentYear;
      });
  
      return filterByCurrentMonth
  
    }, [props.expenses])

  const getData = () => {
    const monthlyExpenses = Array(12).fill(0);

    filteredExpenses.forEach(item => {
      const [year, month] = item.date.split('-');
      const monthIndex = parseInt(month, 10) - 1; 
      monthlyExpenses[monthIndex] += item.total; 
    });
    
    const newChartData = monthlyExpenses.map((expenses, index) => ({
      month: new Date(0, index).toLocaleString('en-US', { month: 'long' }),
      expenses
    }));
  
    if (newChartData[11].expenses > 0) {
      setChartData(newChartData);
    }
  };
  
  useEffect(()=>{
    getData()
  }, [getData])
  return (
    <Card className="dark:bg-gray-900">
      <CardHeader>
        <CardTitle>Expenses - Monthly</CardTitle>
        <CardDescription>January - December {yearNow}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total Expenses for this 12 months
        </div>
      </CardFooter>
    </Card>
  )
}
