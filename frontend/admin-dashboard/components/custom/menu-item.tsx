'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CirclePlus } from 'lucide-react'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'

const MenuItem = ({ text, href, icon }: { text: string, href: string, icon: JSX.Element }) => {
  const router = useRouter()  
  const onClick = async () => {
    router.push(href)
  }

  return (
    <Card onClick={onClick} className="hover:cursor-pointer">
      <CardContent className="mt-6 flex flex-col items-center justify-center">
        <div>
          {icon}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div>{text}</div>
      </CardFooter>
    </Card>
  )
}

export default MenuItem