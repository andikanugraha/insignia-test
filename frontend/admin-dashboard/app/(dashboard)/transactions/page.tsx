import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getTransactions } from '@/lib/api'
import { auth } from '@/lib/auth'
import { TransactionInterface } from '@/lib/types/transaction'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import TransactionItem from './transaction-item'

const TransactionsPage = async ({searchParams}: {searchParams: { q: string; offset: string }}) => {
  const session = await auth()
  const accessToken = session?.accessToken
  const search = searchParams.q ?? ''
  const offset = Number(searchParams.offset ?? 0)
  const transactions = [] as TransactionInterface[] //await getTransactions(search, offset)
  const totalItems = transactions.length
  let itemsPerPage = 10

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>View all my transactions.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
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