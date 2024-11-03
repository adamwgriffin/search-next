'use client'

import { useSearchParams } from 'next/navigation'
import { type SignInOptions, signIn } from 'next-auth/react'
import LoginButton from '../LoginButton/LoginButton'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import styles from './LoginOrRegisterForm.module.css'

export interface LoginOrRegisterFormProps {
  onFormSuccess?: () => void
  useCallbackUrl?: boolean
}

const LoginOrRegisterForm: React.FC<LoginOrRegisterFormProps> = ({
  onFormSuccess,
  useCallbackUrl = false
}) => {
  const searchParams = useSearchParams()
  let signInOptions: SignInOptions = {}
  if (useCallbackUrl) {
    signInOptions.callbackUrl = searchParams?.get('callbackUrl') || '/'
  }

  return (
    <>
      <p className={styles.message}>Login with</p>
      <div className={styles.loginButtons}>
        <LoginButton
          icon={FcGoogle}
          label='Google'
          onClick={() => signIn('google', signInOptions)}
        />
        <LoginButton
          icon={AiFillGithub}
          label='Github'
          onClick={() => signIn('github', signInOptions)}
        />
      </div>
    </>
  )
}

export default LoginOrRegisterForm
