import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getMyTransactions, getProfile } from '@/lib/api'
import { auth } from '@/lib/auth'
import { TransactionInterface } from '@/lib/types/transaction'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import TransactionItem from './transaction-item'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { BreadcrumbInterface } from '@/lib/types/breadcrumb'
import SetBreadcrumbs from '@/components/custom/set-breadcrumbs'
import { ITEMS_PER_PAGE } from '@/lib/constants'

interface SearchParams {
  type: string
  from: string
  to: string
  offset: string
  limit: string
  sort: string
  order: string
}

const TransactionsPage = async ({ searchParams } : { searchParams: SearchParams }) => {
  const session = await auth()
  const accessToken = session?.accessToken ?? ''
  const currentBreadcrumb = {
    text: 'Transactions',
    href: '/transactions'
  } as BreadcrumbInterface
  const itemsPerPage = ITEMS_PER_PAGE
  const type = searchParams.type ?? ''
  const from = searchParams.from ?? ''
  const to = searchParams.to ?? ''
  const sort = searchParams.sort ?? 'id'
  const order = searchParams.order ?? 'desc'
  const offset = Number(searchParams.offset ?? 0)
  const limit = Number(searchParams.limit ?? itemsPerPage)
  const profile = await getProfile(accessToken)
  const result = await getMyTransactions(accessToken, type, from, to, offset, limit, sort, order)
  let transactions = []
  if (result.data) {
    transactions = result.data.map((transaction: TransactionInterface) => {
      return {
        ...transaction,
        type: transaction.fromId === profile.sub ? 'send' : 'receive'
      }
    })
  }
  const totalItems = result.total

  const prevPage = async () => {
    'use server'
    let targetOffset = offset - itemsPerPage
    if (targetOffset < 0) {
      targetOffset = 0;
    }
    const searchParams = new URLSearchParams({
      type,
      from,
      to,
      offset: String(targetOffset),
      limit: String(limit),
      sort,
      order
    })
    redirect(`/transactions?${searchParams}`)
  }

  const nextPage = async () => {
    'use server'
    let targetOffset = offset + itemsPerPage
    const searchParams = new URLSearchParams({
      type,
      from,
      to,
      offset: String(targetOffset),
      limit: String(limit),
      sort,
      order
    })
    redirect(`/transactions?${searchParams}`)
  }

  const transactionTypes = ['all', 'send', 'receive']
  const sortOptions = [
    {
      text: 'Default',
      value: 'id'
    },
    {
      text: 'From',
      value: 'fromId'
    },
    {
      text: 'To',
      value: 'toId'
    },
    {
      text: 'Amount',
      value: 'amount'
    },
    {
      text: 'Transaction Time',
      value: 'createdAt'
    },
  ]
  const orderOptions = [
    { 
      text: 'Ascending',
      value: 'asc'
    },
    { 
      text: 'Descending',
      value: 'desc'
    },
  ]
  

  const actionSearch = async (formData: FormData) => {
    'use server'
    const searchParams = new URLSearchParams({
      type: formData.get('type')?.toString() ?? '',
      from: formData.get('from')?.toString() ?? '',
      to: formData.get('to')?.toString() ?? '',
      sort: formData.get('sort')?.toString() ?? '',
      order: formData.get('order')?.toString() ?? '',
    })

    redirect('/transactions?' + searchParams)
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>View all my transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="">
            <form action={actionSearch} className="flex items-center gap-4">
              <div className="">Filters</div>
              <div>
                <Select name="type" defaultValue={type}>
                  <SelectTrigger className="w-[180px] capitalize">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {transactionTypes.map((t: any) => (
                      <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Input name="from" placeholder="From username" className="w-[180px]"></Input>
              </div>
              <div>
                <Input name="to" placeholder="To username" className="w-[180px]"></Input>
              </div>
              <div>
                <Select name="sort" defaultValue={sort}>
                  <SelectTrigger className="w-[180px] capitalize">
                    <SelectValue placeholder="Select Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((t: any) => (
                      <SelectItem key={t.value} value={t.value} className="capitalize">{t.text}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select name="order" defaultValue={order}>
                  <SelectTrigger className="w-[180px] capitalize">
                    <SelectValue placeholder="Select Order" />
                  </SelectTrigger>
                  <SelectContent>
                    {orderOptions.map((t: any) => (
                      <SelectItem key={t.value} value={t.value} className="capitalize">{t.text}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button type="submit" variant="outline" size="icon">
                  <Search className="h-5 w-5"></Search>
                </Button>
              </div>
            </form>
          </div>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Transaction Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction: TransactionInterface) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter>
          <form className="flex items-center w-full justify-between">
            <div className="text-xs text-muted-foreground">
              Showing{' '}
              <strong>
                {offset+1}-{Math.min(offset + itemsPerPage, totalItems)}
              </strong>{' '}
              of <strong>{totalItems}</strong> transactions
            </div>
            <div className="flex">
              <Button
                formAction={prevPage}
                variant="ghost"
                size="sm"
                type="submit"
                disabled={offset === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Prev
              </Button>
              <Button
                formAction={nextPage}
                variant="ghost"
                size="sm"
                type="submit"
                disabled={offset + itemsPerPage > totalItems}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardFooter>
      </Card>
      <SetBreadcrumbs breadcrumb={currentBreadcrumb}></SetBreadcrumbs>
    </div>
  )
}

export default TransactionsPage