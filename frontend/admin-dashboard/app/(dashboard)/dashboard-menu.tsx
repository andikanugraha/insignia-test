import Balance from '@/components/custom/balance'
import MenuItem from '@/components/custom/menu-item'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getProfile } from '@/lib/api'
import { auth } from '@/lib/auth'
import { ArrowRightLeft, CircleArrowUp, CirclePlus, Users2 } from 'lucide-react'
import React from 'react'

const DashboardMenu = async () => {
  const session = await auth()
  const accessToken = session?.accessToken
  const profile = await getProfile(accessToken ?? '')

  const menuItems = [
    {
      text: 'Topup',
      href: '/topup',
      icon: <CirclePlus className="h-12 w-12" />
    },
    {
      text: 'Transfers',
      href: '/transfers',
      icon: <CircleArrowUp className="h-12 w-12" />
    },
    {
      text: 'Transactions',
      href: '/transactions',
      icon: <ArrowRightLeft className="h-12 w-12" />
    },
    {
      text: 'Users',
      href: '/users',
      icon: <Users2 className="h-12 w-12" />
    },
  ]



  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>
            Dashboard Menu
          </CardTitle>
          <CardDescription>
            Your menu summary
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <span>Hello, </span>
            <span className="font-bold">{profile.username}</span>
          </div>
          <div className="mt-2">
            <Balance></Balance>
          </div>
          <div className="mt-4 grid grid-cols-12 gap-4">
            {menuItems.map(menuItem => (
              <div key={menuItem.href} className="col-span-3">
                <MenuItem
                  text={menuItem.text}
                  href={menuItem.href}
                  icon={menuItem.icon}
                ></MenuItem>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardMenu