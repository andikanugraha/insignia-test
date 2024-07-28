'use client'

import Balance from '@/components/custom/balance';
import SetBreadcrumbs from '@/components/custom/set-breadcrumbs';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { getBalance, postTopup } from '@/lib/api';
import { auth } from '@/lib/auth';
import { BreadcrumbInterface } from '@/lib/types/breadcrumb';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from 'app/hooks';
import { pushBreadcrumb, resetBreadcrumbs } from 'features/user/userSlice';
import { useSession } from 'next-auth/react';
import { revalidatePath } from 'next/cache';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function TopupPage() {
  // const dispatch = useAppDispatch()
  const { toast } = useToast()
  const { data: session, status } = useSession()
  const accessToken = session?.accessToken ?? ''
  const [isLoading, setIsLoading] = useState(true)
  const [refreshBalance, setRefreshBalance] = useState(false)
  const currentBreadcrumb = {
    text: 'Topup',
    href: '/topup'
  } as BreadcrumbInterface

  const FormSchema = z.object({
    amount: z.coerce.number()
      .gt(0, 'Amount must be greater than zero.')
      .lt(10000000, 'Amount must be less than 10000000'),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 0
    }
  })

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true)
    postTopup(accessToken, Number(data.amount))
      .then((response) => {
        if (response) {
          toast({
            title: 'Topup success!',
            description: 'Your balance will be added.'
          })
        } else {
          toast({
            variant: 'destructive',
            title: 'Topup failed!',
            description: 'Please try again.'
          })  
        }
      })
      .catch((error) => { 
        console.error(error)
        toast({
          variant: 'destructive',
          title: 'Topup failed!',
          description: 'Please try again.'
        })
      })
      .finally(() => {
        setIsLoading(false)
        setRefreshBalance(!refreshBalance)
      })
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-span-6 xl:col-span-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Topup Balance</CardTitle>
                <CardDescription>Topup your Balance Wallet.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Balance refresh={refreshBalance}></Balance>
                <div className="">
                  <div className="my-3">
                    <FormField control={form.control} name="amount" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <div className="flex space-x-4 items-center">
                            <div>IDR</div>
                            <Input type="number" placeholder="Please input amount" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Please input amount between IDR 1 and IDR 10,000,000
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}>
                    </FormField>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button type="submit">Topup</Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
      <SetBreadcrumbs breadcrumb={currentBreadcrumb}></SetBreadcrumbs>
    </div>
  );
}
