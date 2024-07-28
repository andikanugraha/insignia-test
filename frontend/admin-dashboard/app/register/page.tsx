'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { postRegister } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const RegisterPage = () => {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const FormSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    passwordConfirm: z.string().min(8, 'Confirm Password must be at least 8 characters'),
  }).superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['passwordConfirm']
      })
    }
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    }
  })

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true)

    postRegister(data.username, data.password)
      .then((result) => { 
        if (result && result.token) {
          toast({
            title: 'Register succesful!',
            description: 'You will be redirect to login page.'
          })
          router.push('/login')
          return
        } 
        toast({
          variant: 'destructive',
          title: 'Register failed!',
          description: 'Please try again.'
        })
        
      })
      .catch((error) => { 
        console.error(error)
        if (error.message === '409') {
          toast({
            variant: 'destructive',
            title: 'Username already exist!',
            description: 'Please change your username.'
          })
          return
        }
        toast({
          variant: 'destructive',
          title: 'Something is wrong!',
          description: 'Please try again or call administrator.'
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
    
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-start md:items-center p-8">
      <div>
        <Image src="/logo-ins.webp" width="100" height="100" alt="Insignia" className="mb-6"></Image>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
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
              <div className="my-3">
                <FormField control={form.control} name="passwordConfirm" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Please re-type Password" {...field} />
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
              </div>
              <div className="my-3">
                <Label htmlFor="password">Confirm Password</Label>
                <Input id="passwordConfirm" name="passwordConfirm" placeholder="Please input Password" type="password"></Input>
              </div> */}
              <Button className="my-3 w-full" disabled={isLoading} type="submit">
                {isLoading && (<>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <div>Please wait</div>
                </>)}
                {!isLoading && <div>Register</div>}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="ghost" asChild>
            <Link href="/login">Login Here</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default RegisterPage