"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { department: "Engineering", satisfaction: 85 },
  { department: "Product", satisfaction: 92 },
  { department: "Design", satisfaction: 88 },
  { department: "Sales", satisfaction: 78 },
  { department: "Marketing", satisfaction: 81 },
  { department: "HR", satisfaction: 95 },
]

const chartConfig = {
  satisfaction: {
    label: "Satisfaction Score",
    color: "hsl(var(--chart-1))",
  },
};

export function SegmentationCard() {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Employee Segmentation</CardTitle>
        <CardDescription>Average satisfaction score by department</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" hide />
              <YAxis
                dataKey="department"
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                width={80}
                />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar dataKey="satisfaction" fill="var(--color-satisfaction)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
