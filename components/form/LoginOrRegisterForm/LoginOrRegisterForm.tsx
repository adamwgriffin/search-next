'use client'

import ContainedButton from '../../design_system/ContainedButton/ContainedButton'
import LoginButton from '../LoginButton/LoginButton'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import styles from './LoginOrRegisterForm.module.css'

export interface LoginOrRegisterFormProps {
  onToggleForm: () => void
  showLoginForm: boolean
  onFormSuccess?: () => void
  callbackUrl?: string
}

const LoginOrRegisterForm: React.FC<LoginOrRegisterFormProps> = ({
  onToggleForm,
  showLoginForm,
  onFormSuccess,
  callbackUrl
}) => {
  return (
    <>
      <p className={styles.message}>Login with</p>
      <div className={styles.loginButtons}>
        <LoginButton icon={FcGoogle} label='Google' />
        <LoginButton icon={AiFillGithub} label='Github' />
      </div>
    </>
  )
}

export default LoginOrRegisterForm
