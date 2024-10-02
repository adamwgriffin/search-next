'use client'

import { useSearchParams } from 'next/navigation'
import LoginOrRegisterForm from '../../components/form/LoginOrRegisterForm/LoginOrRegisterForm'
import styles from './login.module.css'

const Login: React.FC = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl') || '/'
  return (
    <div className={styles.page}>
      <div className={styles.login}>
        <header className={styles.header}>
          <h1 className={styles.heading}>Login or Sign Up</h1>
        </header>
        <div className={styles.formContainer}>
          <LoginOrRegisterForm callbackUrl={callbackUrl} />
        </div>
      </div>
    </div>
  )
}

export default Login
