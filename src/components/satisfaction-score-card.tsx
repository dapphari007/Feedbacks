"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Smile } from 'lucide-react';

const score = 82;
const data = [
  { name: 'Score', value: score },
  { name: 'Remaining', value: 100 - score },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted))'];

export function SatisfactionScoreCard() {
  return (
    <Card className="lg:col-span-1">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Overall Satisfaction</CardTitle>
        <Smile className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="relative h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        startAngle={90}
                        endAngle={450}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-4xl font-bold font-headline">{score}</p>
                <p className="text-sm text-muted-foreground">out of 100</p>
            </div>
        </div>
        <CardDescription className="text-center mt-2 text-xs">
            +5 points from last month
        </CardDescription>
      </CardContent>
    </Card>
  );
}
