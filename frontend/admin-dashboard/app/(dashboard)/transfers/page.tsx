import { SessionProvider } from 'next-auth/react';
import { revalidatePath } from 'next/cache';
import Balance from '@/components/custom/balance';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { getBalance, getUsers, postTransfer } from '@/lib/api';
import { auth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default async function TransfersPage() {
  const session = await auth()
  const accessToken = session?.accessToken
  const search = ''
  const offset = 0
  const balanceResult = await getBalance(accessToken ?? '')
  const users = await getUsers(search, Number(offset));

  const actionSubmit = async (formData: FormData) => {
    'use server'
    const amount = formData.get('amount')?.toString()
    const toUsername = formData.get('toUsername')?.toString() ?? ''
    await postTransfer(accessToken ?? '', toUsername, Number(amount))
    revalidatePath('/transfers')
  }

  return (
    <div className="grid grid-cols-12">
      <form action={actionSubmit} className="col-span-4">
        <Card>
          <CardHeader>
            <CardTitle>Transfers</CardTitle>
            <CardDescription>Transfer your wallet balance to other account.</CardDescription>
          </CardHeader>
          <CardContent>
            <SessionProvider>
              <Balance></Balance>
            </SessionProvider>
            <div>
              <div className="my-3">
                <Label htmlFor="toUsername">Send to User</Label>
                <Select name="toUsername">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Username" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user: any) => (
                      <SelectItem key={user.id} value={user.username}>{user.username}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="my-3">
                <Label htmlFor="amount">Amount</Label>
                <Input type="number" id="amount" name="amount" placeholder="Masukkan nominal"></Input>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Transfer</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
