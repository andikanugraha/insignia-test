'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { getMyTransactions, getTopTransactionsPerUser } from '@/lib/api'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { Area, AreaChart, Bar, BarChart, Label, LabelList, Pie, PieChart, XAxis, YAxis } from 'recharts'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react'
import { useFormatter } from 'next-intl'
import { CURRENCY } from '@/lib/constants'
import { formatDatetime } from '@/lib/utils'
import { TransactionInterface } from '@/lib/types/transaction'

const MyTransactionsAggregate = () => {
  const format = useFormatter()
  const { data: session, status } = useSession()
  const accessToken = session?.accessToken ?? ''
  const [transactions, setTransactions] = useState<TransactionInterface[]>([])
  // const [totalSender, setTotalSender] = useState(0)
  // const [totalReceiver, setTotalReceiver] = useState(0)
  const [totalAll, setTotalAll] = useState(0)
  const [aggregate, setAggregate] = useState([
    {
      type: 'send',
      amount: 0,
      fill: "var(--color-send)"
    },
    {
      type: 'receive',
      amount: 0,
      fill: "var(--color-receive)"
    },
  ])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    getMyTransactions(accessToken, undefined, undefined, undefined, 0, 100)
      .then((res) => {
        if (res && Array.isArray(res.data)) {
          const newTransactions = res.data.map((t: any, index: number) => {
            return {
              ...t,
              // type: t.fromId === profile.sub ? 'send' : 'receive'
            }
          })
          newTransactions.reverse()
          const amountSend = newTransactions.reduce((accumulator: number, transaction: TransactionInterface) => accumulator + transaction.amount, 0)
          const amountReceive = newTransactions.reduce((accumulator: number, transaction: TransactionInterface) => accumulator + transaction.amount, 0)
          const amountAll = newTransactions.reduce((accumulator: number, transaction: TransactionInterface) => accumulator + transaction.amount, 0)
          setAggregate([
            {
              type: 'send',
              amount: amountSend,
              fill: "var(--color-send)"
            },
            {
              type: 'receive',
              amount: amountReceive,
              fill: "var(--color-receive)"
            },
          ])
          setTotalAll(amountAll)
          setTransactions(newTransactions)
        }
        
      })
      .catch((error) => { 
        console.error(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [accessToken, aggregate])

  const chartConfig = {
    amount: {
      label: 'Amount',
    },
    send: {
      label: 'Send',
      color: 'hsl(var(--chart-1))',
    },
    receive: {
      label: 'Receive',
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
          <CardTitle>My Aggregate Transactions</CardTitle>
          <CardDescription>Show my aggregate transactions in pie chart</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && <div className="font-bold">Loading...</div>}
          <div className="">
            <ChartContainer config={chartConfig}>
              <PieChart>
                <Pie
                  data={aggregate}
                  dataKey="amount"
                  nameKey="type"
                  innerRadius={60}
                  strokeWidth={5}>
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
                              y={(viewBox.cy || 0) - 24}
                              className="fill-foreground text-xl"
                            >
                              IDR
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-xl font-bold"
                            >
                              {format.number(totalAll, { style: 'decimal' })}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Total Transfers
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}>
                </ChartTooltip>
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            </ChartContainer>
          </div>
        </CardContent>
        <CardFooter>

        </CardFooter>
      </Card>
    </div>
  )
}

export default MyTransactionsAggregate