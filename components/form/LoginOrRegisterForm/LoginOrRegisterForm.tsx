'use client'

import { signIn } from 'next-auth/react'
import LoginButton from '../LoginButton/LoginButton'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import styles from './LoginOrRegisterForm.module.css'

export interface LoginOrRegisterFormProps {
  onFormSuccess?: () => void
  callbackUrl?: string
}

const LoginOrRegisterForm: React.FC<LoginOrRegisterFormProps> = ({
  onFormSuccess,
  callbackUrl
}) => {
  return (
    <>
      <p className={styles.message}>Login with</p>
      <div className={styles.loginButtons}>
        <LoginButton
          icon={FcGoogle}
          label='Google'
          onClick={() => signIn('google', { callbackUrl })}
        />
        <LoginButton
          icon={AiFillGithub}
          label='Github'
          onClick={() => signIn('github', { callbackUrl })}
        />
      </div>
    </>
  )
}

export default LoginOrRegisterForm
