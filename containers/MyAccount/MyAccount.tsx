'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useAppSelector, useAppDispatch } from '../../hooks/app_hooks'
import { getCurrentUser, selectCurrentUser } from '../../store/user/userSlice'
import LoadingDots from '../../components/design_system/LoadingDots/LoadingDots'

const MyAccount: React.FC = () => {
  const { status } = useSession()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectCurrentUser)

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch(getCurrentUser())
    }
  }, [dispatch, status])

  if (!currentUser) {
    return <div><LoadingDots /></div>
  }


  return (
    <div>
      <p>Name: {currentUser.name}</p>
      <p>Email: {currentUser.email}</p>
    </div>
  )
}

export default MyAccount
