'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
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
import { signIn as signInServer } from '@/lib/auth';
import { signIn } from "next-auth/react";
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function LoginPage({ searchParams }: { searchParams: { error: string } }) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const error = searchParams.error;
  
  useEffect(() => {
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Login failed!',
        description: 'Invalid username or password.'
      })
    }
  }, [toast, error])

  const FormSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    }
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true)
    try {
      // Manual parse and validate input user, currently we use react-hook-form
      // const username = formData.get('username')?.toString()
      // const password = formData.get('password')?.toString()
      // const response = FormSchema.safeParse({
      //   username,
      //   password
      // })
      // if (!response.success) {
      //   let errArr: any[] = [];
      //   const { errors: err } = response.error;
      //   for (var i = 0; i < err.length; i++) {
      //     errArr.push({ for: err[i].path[0], message: err[i].message });
      //   }
      //   setErrors(errArr);
      //   throw err;
      // }
      
      const user = await signIn('credentials', {
        callbackUrl: '/',
        redirectTo: false, // for server signin
        username: data.username,
        password: data.password,
      });
      if (user && user.ok) {
        toast({
          title: 'Login succesful!',
          description: 'You will be redirect to dashboard.'
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: 'Login failed!',
        description: 'Invalid username or password.'
      })
    } finally {
      setIsLoading(false)
    }
    
}

  return (
    <div className="min-h-screen flex flex-col justify-center items-start md:items-center p-8">
      <div>
        <Image src="/logo-ins.webp" width="100" height="100" alt="Insignia" className="mb-6"></Image>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Admin Dashboard for Insignia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full"
            >
              <div className="my-3">
                <FormField control={form.control} name="username" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Please input Username" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}>
                </FormField>
              </div>
              <div className="my-3">
                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Please input Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}>
                </FormField>
              </div>
              <Button className="my-3 w-full" disabled={isLoading} type="submit">
                {isLoading && (<>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <div>Please wait</div>
                </>)}
                {!isLoading && <div>Sign in</div>}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="ghost" asChild>
            <Link href="/register">Register Here</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
