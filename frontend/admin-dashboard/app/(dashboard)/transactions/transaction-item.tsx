'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TableCell, TableRow } from '@/components/ui/table'
import { TransactionInterface } from '@/lib/types/transaction'
import { formatDatetime } from '@/lib/utils'
import { MoreHorizontal } from 'lucide-react'
import React from 'react'

const TransactionItem = ({ transaction }: { transaction: TransactionInterface }) => {

  const deleteTransaction = (formData: FormData) => { }
  
  const showTextColor = () => {
    return transaction.type === 'send' ? 'text-red-500' : 'text-green-600'
  }

  return (
    <TableRow>
      <TableCell className="font-bold uppercase">{transaction.type}</TableCell>
      <TableCell className="">{transaction.fromUsername}</TableCell>
      <TableCell className="">{transaction.toUsername}</TableCell>
      <TableCell className={showTextColor()}>Rp. {transaction.amount}</TableCell>
      <TableCell className="">{formatDatetime(transaction.createdAt)}</TableCell>
    </TableRow>
  )
}

export default TransactionItem