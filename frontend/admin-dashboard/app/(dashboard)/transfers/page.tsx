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
import { getBalance, getUsers, postTransfer } from '@/lib/api';
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

const TransfersPage = () => {
  const { toast } = useToast()
  const { data: session, status } = useSession()
  const accessToken = session?.accessToken ?? ''
  const [users, setUsers] = useState<UserInterface[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshBalance, setRefreshBalance] = useState(false)

  useEffect(() => {
    getUsers()
      .then((res) => {
        setUsers(res)
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
  }, [toast])

  const FormSchema = z.object({
    amount: z.coerce.number()
      .gt(0, 'Amount must be greater than zero.')
      .lt(10000000, 'Amount must be less than 10000000'),
    to: z.string({ required_error: 'Please select a user' })
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
                <Button type="submit">Transfer</Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default TransfersPage