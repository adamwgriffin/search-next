import type { NextPage } from 'next'
import Link from 'next/link'
import styles from './Logo.module.css'

const Logo: NextPage = () => {
  return (
    <Link href='/' className={styles.link}>
      <div className={styles.logo}>
        AwsömRE 🤟
      </div>
    </Link>
  )
}

export default Logo
