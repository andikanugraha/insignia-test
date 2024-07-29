'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { getTopUsers } from '@/lib/api'
import { CURRENCY } from '@/lib/constants'
import { useSession } from 'next-auth/react'
import { useFormatter } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts'

interface TopUser {
  username: string,
  transacted_value: number
}

const TopUsers = () => {
  const format = useFormatter()
  const { data: session, status } = useSession()
  const accessToken = session?.accessToken ?? ''
  const [users, setUsers] = useState<TopUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    getTopUsers(accessToken)
      .then((res) => {
        if (Array.isArray(res)) {
          setUsers(res)
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
    transacted_value: {
      label: 'Total Amount',
      color: 'hsl(var(--chart-3))',
    },
    label: {
      label: 'Label',
      color: "hsl(var(--background))",
    },
  } satisfies ChartConfig


  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>
            Top Users Transactions
          </CardTitle>
          <CardDescription>
            Show top 10 users total transactions value
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && <div className="font-bold">Loading...</div>}
          <div>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={users}
                layout="vertical"
                margin={{left: 50}}
              >
                <Bar dataKey="transacted_value" fill="var(--color-transacted_value)" radius={4}>
                  <LabelList
                    dataKey="username"
                    position="left"
                    offset={8}
                    className="fill-foreground"
                    fontSize={12}
                    formatter={(value: string) => value}
                  />
                  <LabelList
                    dataKey="transacted_value"
                    position="right"
                    offset={8}
                    className="fill-foreground"
                    fontSize={12}
                    formatter={(value: string) => `${format.number(Number(value), { style: 'currency', currency: CURRENCY })}`}
                  />
                </Bar>
                <YAxis
                  dataKey="username"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  hide={true}
                  tickFormatter={(value) => value}
                />
                <XAxis type="number" dataKey="transacted_value"></XAxis>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}>
                </ChartTooltip>
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TopUsers