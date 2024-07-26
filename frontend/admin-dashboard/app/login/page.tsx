import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from '@/lib/auth';
import { FormEvent, useState } from 'react';

export default function LoginPage() {

  const actionSignIn = async (formData: FormData) => {
    'use server'
    await signIn('credentials', {
      redirectTo: '/',
      username: formData.get('username'),
      password: formData.get('password'),
    });
}

  return (
    <div className="min-h-screen flex flex-col justify-center items-start md:items-center p-8">
      <div>
        <img src="/logo-ins.webp" width="100px" className="mb-6"></img>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Admin Dashboard for Insignia
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form
            action={actionSignIn}
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
            <Button className="w-full" type="submit">Sign in</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
