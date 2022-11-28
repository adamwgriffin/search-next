import type { NextPage } from 'next'
import styles from './Login.module.css'
import OutlinedButton from '../../form/OutlinedButton/OutlinedButton'

const Login: NextPage = () => {
  const handleLogin = () => {
    alert("TBD")
  }

  return (
    <OutlinedButton onClick={handleLogin} highlighted={false}>
      Sign up or Log in
    </OutlinedButton>
  )
}

export default Login
