import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getBalance, postTopup } from '@/lib/api';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export default async function TopupPage() {
  const session = await auth()
  const accessToken = session?.accessToken
  const balanceResult = await getBalance(accessToken ?? '')

  const actionSubmit = async (formData: FormData) => {
    'use server'
    const amount = formData.get('amount')?.toString()
    const result = await postTopup(accessToken ?? '', Number(amount))
    // if (result) {
    // }
    revalidatePath('/topup')
  }

  return (
    <div className="grid grid-cols-12">
      <form action={actionSubmit} className="col-span-4">
        <Card>
          <CardHeader>
            <CardTitle>Topup Balance</CardTitle>
            <CardDescription>Topup your Balance Wallet.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-space-between space-x-4 rounded-md border p-4">
              <div className="text-lg">Balance</div>
              <div className="text-2xl font-bold">Rp. {balanceResult.balance}</div>
            </div>
            <div className="">
              <div className="my-3">
                <Label htmlFor="amount">Topup</Label>
                <Input type="number" id="amount" name="amount" placeholder="Masukkan nominal"></Input>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Topup</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
