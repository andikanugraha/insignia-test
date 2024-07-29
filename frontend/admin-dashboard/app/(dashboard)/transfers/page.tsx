'use client'

import { useSession } from 'next-auth/react';
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
import { getBalance, getProfile, getUsers, postTransfer } from '@/lib/api';
import { auth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserInterface } from '@/lib/types/user';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import { BreadcrumbInterface } from '@/lib/types/breadcrumb';
import SetBreadcrumbs from '@/components/custom/set-breadcrumbs';
import { CURRENCY, MAX_TRANSFER_AMOUNT } from '@/lib/constants';
import { useFormatter } from 'next-intl';
import { ProfileInterface } from '@/lib/types/profile';

const TransfersPage = () => {
  const format = useFormatter()
  const { toast } = useToast()
  const { data: session, status } = useSession()
  const accessToken = session?.accessToken ?? ''
  const [profile, setProfile] = useState<ProfileInterface>()
  const [users, setUsers] = useState<UserInterface[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshBalance, setRefreshBalance] = useState(false)
  const currentBreadcrumb = {
    text: 'Transfer',
    href: '/transfer'
  } as BreadcrumbInterface

  useEffect(() => {
    getProfile(accessToken)
      .then((resProfile) => {
        setProfile(resProfile)
        getUsers()
          .then((res) => {
            if (res && Array.isArray(res)) {
              const users = res.filter((user: UserInterface) => user.id !== profile?.sub)
              setUsers(users)
            }
          })
          .catch((error) => {
            console.error(error)
            toast({
              variant: 'destructive',
              title: 'Load user failed!',
              description: 'Please refresh the page.'
            })  
          })
          .finally(() => {
            setIsLoading(false)
          })
      })
      .catch((error) => {
        console.error(error)
        toast({
          variant: 'destructive',
          title: 'Load profile failed!',
          description: 'Please refresh the page.'
        }) 
        setIsLoading(false)
      })
  }, [toast, accessToken, profile])

  const FormSchema = z.object({
    amount: z.coerce.number()
      .gt(0, 'Amount must be greater than zero.')
      .lt(MAX_TRANSFER_AMOUNT, `Amount must be less than ${MAX_TRANSFER_AMOUNT}`),
    to: z.string().min(1, 'Please select a user')
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 0,
      to: '',
    }
  })

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true)
    postTransfer(accessToken, data.to, Number(data.amount))
      .then((response) => {
        if (response) {
          toast({
            title: 'Transfer success!',
            description: 'Your balance will be deducted.'
          })
        } else {
          toast({
            variant: 'destructive',
            title: 'Transfer failed!',
            description: 'Please try again.'
          })  
        }
      })
      .catch((error) => { 
        console.error(error)
        if (error.message === '400') {
          toast({
            variant: 'destructive',
            title: 'Transfer failed!',
            description: 'Insufficient balance.'
          })
          return
        }
        toast({
          variant: 'destructive',
          title: 'Transfer failed!',
          description: 'Please try again.'
        })
      })
      .finally(() => {
        setIsLoading(false)
        setRefreshBalance(!refreshBalance)
        form.setValue('amount', 0)
        form.setValue('to', '')
      })
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-span-6 xl:col-span-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Transfers</CardTitle>
                <CardDescription>Transfer your wallet balance to other account.</CardDescription>
              </CardHeader>
              <CardContent>
                <Balance refresh={refreshBalance}></Balance>
                <div>
                  <div className="my-3">
                    <FormField control={form.control} name="to" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Send to user</FormLabel>
                          <Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select user by username" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {users.map((user: any) => (
                                <SelectItem key={user.id} value={user.username}>{user.username}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        <FormMessage />
                      </FormItem>
                    )}>
                    </FormField>                    
                  </div>
                  <div className="my-3">
                    <FormField control={form.control} name="amount" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <div className="flex space-x-4 items-center">
                            <div>{CURRENCY}</div>
                            <Input type="number" placeholder="Please input amount" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Please input amount between {CURRENCY} 1 and {CURRENCY} {format.number(MAX_TRANSFER_AMOUNT, { style: 'decimal' })}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}>
                    </FormField>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button type="submit">Transfer</Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
      <SetBreadcrumbs breadcrumb={currentBreadcrumb}></SetBreadcrumbs>
    </div>
  );
}

export default TransfersPage