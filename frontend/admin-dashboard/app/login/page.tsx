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
import { signIn } from '@/lib/auth';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [errors, setErrors] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

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
      await signIn('credentials', {
        redirectTo: '/',
        username: data.username,
        password: data.password,
      });
      toast({
        title: 'Login succesful!',
        description: 'You will be redirect to dashboard.'
      })
    } catch (error) {
      console.error(error)
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

              {/* <div className="my-3">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" placeholder="Please input Username" type="text"></Input>
              </div>
              <div className="my-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" placeholder="Please input Password" type="password"></Input>
              </div> */}
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
