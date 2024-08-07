'use client'

import Image from 'next/image';
import { TableCell, TableRow } from '@/components/ui/table'
import React from 'react'
import { UserInterface } from '@/lib/types/user';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { formatDatetime } from '@/lib/utils';
import { useFormatter } from 'next-intl';
import { CURRENCY } from '@/lib/constants';

const UserItem = ({ user }: { user: UserInterface }) => {
  const format = useFormatter();
  const deleteUser = (formData: FormData) => {}

  return (
    <TableRow>
      <TableCell className="font-medium">{user.username}</TableCell>
      <TableCell className="">{format.number(user.balance, {style: 'currency', currency: CURRENCY})}</TableCell>
      <TableCell className="">{formatDatetime(user.createdAt)}</TableCell>
      <TableCell className="">{formatDatetime(user.updatedAt)}</TableCell>
      {/* <TableCell>
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
              <form action={deleteUser}>
                <Button type="submit">Delete</Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell> */}
    </TableRow>
  )
}

export default UserItem