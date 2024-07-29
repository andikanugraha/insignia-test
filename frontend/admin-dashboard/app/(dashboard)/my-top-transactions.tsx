'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { getTopTransactionsPerUser } from '@/lib/api'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react'
import { useFormatter } from 'next-intl'
import { CURRENCY } from '@/lib/constants'

interface TopTransaction {
  index: number,
  type: string,
  amount: number
}

const MyTopTransactions = () => {
  const format = useFormatter()
  const { data: session, status } = useSession()
  const accessToken = session?.accessToken
  const [transactions, setTransactions] = useState<TopTransaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    getTopTransactionsPerUser(accessToken ?? '')
      .then((res) => {
        if (Array.isArray(res)) {
          const newTransactions = res.map((t: any, index: number) => {
            return {
              index: index + 1,
              type: t.amount < 0 ? 'sender': 'receiver',
              amount: Math.abs(t.amount),
              fill: t.amount < 0 ? 'var(--color-sender)': 'var(--color-receiver)',
              stroke: t.amount < 0 ? 'var(--color-sender)': 'var(--color-receiver)',
            }
          })
          setTransactions(newTransactions)
        }
      })
      .catch((error) => { 
        console.error(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [accessToken])

  const chartConfig = {
    amount: {
      label: 'Amount',
    },
    sender: {
      label: 'Sender',
      color: 'hsl(var(--chart-1))',
    },
    receiver: {
      label: 'Receiver',
      color: 'hsl(var(--chart-2))',
    },
    label: {
      label: 'Label',
      color: "hsl(var(--background))",
    },
  } satisfies ChartConfig  

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>My Top 10 Transactions</CardTitle>
          <CardDescription>Show my top 10 all time transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && <div className="font-bold">Loading...</div>}
          <div className="">
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={transactions}
                layout="vertical"
                margin={{left: 50}}
              >
                <Bar
                  dataKey="amount"
                  fill="var(--color-sender)"
                  stroke="var(--color-sender)"
                  fillOpacity={0.4}
                  radius={4}>
                  <LabelList
                    dataKey="type"
                    position="left"
                    offset={8}
                    className="fill-foreground"
                    fontSize={12}
                    formatter={(value: string) => chartConfig[value as keyof typeof chartConfig]?.label}
                  />
                  <LabelList
                    dataKey="amount"
                    position="right"
                    offset={8}
                    className="fill-foreground"
                    fontSize={12}
                    formatter={(value: string) => `${format.number(Number(value), { style: 'currency', currency: CURRENCY })}`}
                  />
                </Bar>
                <YAxis
                  dataKey="type"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  hide={true}
                  tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label}
                />
                <XAxis type="number" dataKey="amount"></XAxis>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}>
                </ChartTooltip>
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
        <CardFooter>

        </CardFooter>
      </Card>
    </div>
  )
}

export default MyTopTransactions