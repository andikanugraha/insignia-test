import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TableCell, TableRow } from '@/components/ui/table'
import { TransactionInterface } from '@/lib/types/transaction'
import { MoreHorizontal } from 'lucide-react'
import React from 'react'

const TransactionItem = ({ transaction }: { transaction: TransactionInterface }) => {

  const deleteTransaction = (formData: FormData) => { }
  
  return (
    <TableRow>
      <TableCell className="">{transaction.fromId}</TableCell>
      <TableCell className="">{transaction.toId}</TableCell>
      <TableCell className="">Rp. {transaction.amount}</TableCell>
      <TableCell className="">{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deleteTransaction}>
                <Button type="submit">Delete</Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

export default TransactionItem