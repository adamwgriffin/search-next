import type { NextPage } from 'next'
import styles from './Login.module.css'
import OutlinedButton from '../../form/OutlinedButton/OutlinedButton'

const Login: NextPage = () => {
  const handleLogin = () => {
    alert("TBD")
  }

  return (
    <div className={styles.login}>
      <OutlinedButton onClick={handleLogin} highlighted={false}>
        Log in
      </OutlinedButton>
    </div>
  )
}

export default Login
