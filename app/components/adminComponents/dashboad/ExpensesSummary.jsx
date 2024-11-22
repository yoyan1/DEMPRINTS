"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart";

const chartConfig = {
  operational: {
    label: "Operational",
    color: "hsl(var(--chart-1))",
  },
  manpower: {
    label: "Manpower",
    color: "hsl(var(--chart-2))",
  },
  marketing: {
    label: "Marketing",
    color: "hsl(var(--chart-3))",
  },
  stakeholder: {
    label: "Stakeholder",
    color: "hsl(var(--chart-4))",
  },
  production: {
    label: "Production",
    color: "hsl(var(--chart-5))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-2))", 
  },
};

export default function ExpensesSummary(props) {
  const date = new Date()
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  const year = date.getFullYear()
  const month = months[date.getMonth()]
  const groupedExpenses = props.expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.total;
    return acc;
  }, {});
  

  const newChartData = props.categories.map((cat) => {
    const configKey = cat.name.toLowerCase().replace(/\s+/g, "_");
    const config = chartConfig[configKey] || chartConfig.other;
    return {
      category: config.label,
      expenses: groupedExpenses[cat.name] || 0,
      fill: config.color,
    };
  });

  const totalExpenses = newChartData.reduce((sum, item) => sum + item.expenses, 0);

  return (
    <Card className="flex flex-col dark:bg-gray-900">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expenses Summary - Monthly</CardTitle>
        <CardDescription>{month} - {year}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={newChartData}
              dataKey="expenses"
              nameKey="category"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalExpenses.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          expenses
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total expenses for this month 
        </div>
      </CardFooter>
    </Card>
  );
}
