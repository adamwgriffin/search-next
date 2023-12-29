'use client'

import { useSearchParams } from 'next/navigation'
import { useToggle } from 'react-use'
import LoginOrRegisterForm from '../../components/form/LoginOrRegisterForm/LoginOrRegisterForm'
import styles from './login.module.css'

const Login: React.FC = () => {
  const [showLoginForm, toggleShowLoginForm] = useToggle(true)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl') || '/'
  return (
    <div className={styles.page}>
      <div className={styles.login}>
        <header className={styles.header}>
          <h1 className={styles.heading}>
            {showLoginForm ? 'Login' : 'Register'}
          </h1>
        </header>
        <div className={styles.formContainer}>
          <LoginOrRegisterForm
            showLoginForm={showLoginForm}
            onToggleForm={toggleShowLoginForm}
            callbackUrl={callbackUrl}
          />
        </div>
      </div>
    </div>
  )
}

export default Login
