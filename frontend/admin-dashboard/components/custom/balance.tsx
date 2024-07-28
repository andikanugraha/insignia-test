'use client'

import { useSession } from 'next-auth/react'
import { getBalance } from '@/lib/api'
import { auth } from '@/lib/auth'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useFormatter } from 'next-intl';

const Balance = () => {
  const format = useFormatter();
  const { data: session, status } = useSession()
  const [balance, setBalance] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const accessToken = session?.accessToken
  useEffect(() => {
    getBalance(accessToken ?? '')
      .then((res) => {
        setBalance(Number(res.balance))
        setIsLoading(false)
      })
  }, [accessToken])

  if (isLoading) {
    return (
      <div className="flex items-center justify-space-between space-x-4 rounded-md border p-4">
        <div className="text-lg">Balance</div>
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-space-between space-x-4 rounded-md border p-4">
      <div className="text-lg">Balance</div>
      <div className="text-2xl font-bold">{format.number(balance, {style: 'currency', currency: 'IDR'})}</div>
    </div>
  )
}

export default Balance