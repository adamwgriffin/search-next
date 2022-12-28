import type { NextPage } from 'next'
import OutlinedButton from '../../form/OutlinedButton/OutlinedButton'

const Login: NextPage = () => {
  const handleLogin = () => {
    alert("TBD")
  }

  return (
    <OutlinedButton onClick={handleLogin} highlighted={false}>
      Log in
    </OutlinedButton>
  )
}

export default Login
