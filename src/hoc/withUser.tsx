import React, { ComponentType, useEffect } from 'react'

import { useLazyGetCurrentUserQuery } from '../services/BlogService'
import { UserResponse } from '../models/responses'

export interface HocProps {
  data: UserResponse
}

export function withUser<P extends HocProps>(Component: ComponentType<P>): ComponentType<Omit<P, 'data'>> {
  return function Comp(props) {
    const [getUser, { data }] = useLazyGetCurrentUserQuery()

    useEffect(() => {
      const token = localStorage.getItem('token')
      if (!token) return
      ;(async () => {
        await getUser(token)
      })()
    }, [])

    return <Component data={data} {...(props as any)} />
  }
}
