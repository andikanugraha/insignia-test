'use client'

import { useSession } from 'next-auth/react'
import { getBalance } from '@/lib/api'
import { auth } from '@/lib/auth'
import React, { useCallback } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useFormatter } from 'next-intl';
import { Loader2, RefreshCcw } from 'lucide-react'
import { useToast } from '../ui/use-toast'
import { Button } from '../ui/button'

const Balance = ({ refresh }: { refresh: boolean }) => {
  const { toast } = useToast()
  const format = useFormatter();
  const { data: session, status } = useSession()
  const [balance, setBalance] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefresh, setIsRefresh] = useState(refresh)
  const accessToken = session?.accessToken ?? ''

  const loadBalance = useCallback(() => {
    setIsLoading(true)
    getBalance(accessToken)
      .then((res) => {
        if (res && !isNaN(res.balance)) {
          setBalance(Number(res.balance))
          return
        }
        toast({
          variant: 'destructive',
          title: 'Load Balance failed!',
          description: 'Please refresh the page.'
        })
      })
      .catch((error) => {
        console.error(error)
        toast({
          variant: 'destructive',
          title: 'Load Balance failed!',
          description: 'Please refresh the page.'
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
    
  }, [toast, accessToken])

  useEffect(() => {
    loadBalance()
    setIsRefresh(refresh)
  }, [loadBalance, refresh])

  
  const onClickRefresh = () => {
    loadBalance()
  }

  return (
    <div className="flex items-center justify-space-between space-x-4 rounded-md border p-4">
      <div className="text-lg">Balance</div>
      <div className="text-2xl font-bold">
        {isLoading && <Loader2 className="animate-spin"></Loader2>}
        {!isLoading && <span>{format.number(balance, { style: 'currency', currency: 'IDR' })}</span>}
      </div>
      {!isLoading && 
        <div>
          <Button variant="outline" onClick={onClickRefresh}>
            <RefreshCcw className="h-5 w-5"></RefreshCcw>
          </Button>
        </div>
      }
    </div>
  )
}

export default Balance