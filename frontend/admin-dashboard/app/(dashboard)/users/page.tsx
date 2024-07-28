import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getUsers } from '@/lib/api';
import { auth } from '@/lib/auth';
import { UserInterface } from '@/lib/types/user';
import UserItem from './user-item';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { redirect, } from 'next/navigation';

export default async function UsersPage({searchParams}: {searchParams: { q: string; offset: string }}) {

  const session = await auth()
  const search = searchParams.q ?? ''
  const offset = Number(searchParams.offset ?? 0)

  const accessToken = session?.accessToken
  const users = await getUsers(search, offset)
  const totalItems = users.length
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
        <CardTitle>Users</CardTitle>
        <CardDescription>View all users and their balance.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                {/* <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: UserInterface) => (
                <UserItem key={user.id} user={user} />
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
            of <strong>{totalItems}</strong> users
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
  );
}
