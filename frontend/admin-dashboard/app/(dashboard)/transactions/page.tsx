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

const TransactionsPage = async (
  { searchParams }:
    { searchParams: { type: string; from: string; to: string; offset: string; limit: string } }) => {
  const session = await auth()
  const accessToken = session?.accessToken ?? ''
  const itemsPerPage = 10
  const type = searchParams.type ?? ''
  const from = searchParams.from ?? ''
  const to = searchParams.to ?? ''
  const offset = Number(searchParams.offset ?? 0)
  const limit = Number(searchParams.limit ?? itemsPerPage)
  const profile = await getProfile(accessToken)
  let transactions = await getMyTransactions(accessToken, type, from, to, offset, limit)
  transactions = transactions.map((transaction: TransactionInterface) => {
    return {
      ...transaction,
      type: transaction.fromId === profile.sub ? 'send' : 'receive'
    }
  })
  const totalItems = transactions.length

  async function prevPage() {
    'use server'
    let targetOffset = offset - itemsPerPage
    if (targetOffset < 0) {
      targetOffset = 0;
    }
    redirect(`/users?offset=${targetOffset}`)
    // router.back();
  }

  async function nextPage() {
    'use server'
    let targetOffset = offset + itemsPerPage
    redirect(`/users?offset=${targetOffset}`)
    // router.push(`/?offset=${offset}`, { scroll: false });
  }

  const transactionTypes = ['all', 'send', 'receive']

  const actionSearch = async (formData: FormData) => {
    'use server'
    const searchParams = new URLSearchParams({
      type: formData.get('type')?.toString() ?? '',
      from: formData.get('from')?.toString() ?? '',
      to: formData.get('to')?.toString() ?? '',
    })

    redirect('/transactions?' + searchParams)
  }

  return (
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
              <Select name="type">
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
              <Input name="from" placeholder="From username"></Input>
            </div>
            <div>
              <Input name="to" placeholder="To username"></Input>
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
            of <strong>{totalItems}</strong> products
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
  )
}

export default TransactionsPage