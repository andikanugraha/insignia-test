'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { getMyTransactions, getTopTransactionsPerUser } from '@/lib/api'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { Area, AreaChart, Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react'
import { useFormatter } from 'next-intl'
import { CURRENCY } from '@/lib/constants'
import { formatDatetime } from '@/lib/utils'
import { TransactionInterface } from '@/lib/types/transaction'

const MyTransactions = () => {
  const format = useFormatter()
  const { data: session, status } = useSession()
  const accessToken = session?.accessToken ?? ''
  const [transactions, setTransactions] = useState<TransactionInterface[]>([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    getMyTransactions(accessToken, undefined, undefined, undefined, 0, 100).then((res) => {
      if (res && Array.isArray(res.data)) {
        const newTransactions = res.data.map((transaction: TransactionInterface) => {
          return {
            ...transaction,
            fill: transaction.type === 'send' ? 'var(--color-sender)': 'var(--color-receiver)',
            stroke: transaction.type === 'send' ? 'var(--color-sender)': 'var(--color-receiver)',
          }
        })
        newTransactions.reverse()
        setTransactions(newTransactions)
      }
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
          <CardTitle>My Transactions</CardTitle>
          <CardDescription>Show my transactions in timeline</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && <div className="font-bold">Loading...</div>}
          <div className="">
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={transactions}
                layout="horizontal"
                margin={{left: 20, right: 20}}
              >
                <Bar
                  dataKey="amount"
                  type="natural"
                  fill="var(--color-sender)"
                  fillOpacity={0.4}
                  stroke="var(--color-sender)"
                  stackId="a">
                  {/* <LabelList
                    dataKey="type"
                    position="left"
                    offset={8}
                    className="fill-foreground"
                    fontSize={12}
                    formatter={(value: string) => chartConfig[value as keyof typeof chartConfig]?.label}
                  /> */}
                  {/* <LabelList
                    dataKey="amount"
                    position="top"
                    offset={8}
                    className="fill-foreground"
                    fontSize={12}
                    formatter={(value: string) => `${format.number(Number(value), { style: 'currency', currency: CURRENCY })}`}
                  /> */}
                </Bar>
                <XAxis
                  dataKey="createdAt"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  hide={true}
                  tickFormatter={(value) => formatDatetime(value)}
                />
                <YAxis type="number" dataKey="amount"></YAxis>
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

export default MyTransactions