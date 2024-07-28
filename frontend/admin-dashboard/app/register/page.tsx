import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { postRegister } from '@/lib/api'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const RegisterPage = () => {

  const actionRegister = async (formData: FormData) => {
    'use server'
    //TODO
    const username = formData.get('username')?.toString()
    const password = formData.get('password')?.toString()
    const passwordConfirm = formData.get('passwordConfirm')?.toString()
    if (!username || !password) {
      return
    }
    const result = await postRegister(username, password)
    console.log('register:', result)
    if (result && result.token) {
      redirect('/login')
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-start md:items-center p-8">
      <div>
        <img src="/logo-ins.webp" width="100px" className="mb-6"></img>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Admin Dashboard for Insignia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={actionRegister}
            className="w-full"
          >
            <div className="my-3">
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
            </div>
            <Button className="my-3 w-full" type="submit">Register</Button>
          </form>
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