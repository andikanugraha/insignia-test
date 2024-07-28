'use client'

import { BreadcrumbInterface } from '@/lib/types/breadcrumb'
import { useAppDispatch } from 'app/hooks'
import { pushBreadcrumb, resetBreadcrumbs } from 'features/user/userSlice'
import React, { useEffect } from 'react'

const SetBreadcrumbs = ({ breadcrumb }: { breadcrumb?: BreadcrumbInterface }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(resetBreadcrumbs())
    if (breadcrumb) {
      dispatch(pushBreadcrumb(breadcrumb))
    }
  }, [dispatch, breadcrumb])

  return (
    <></>
  )
}

export default SetBreadcrumbs