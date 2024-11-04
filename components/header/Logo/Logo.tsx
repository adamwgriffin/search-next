import type { NextPage } from 'next'
import Link from 'next/link'
import { FaHouse } from 'react-icons/fa6'
import styles from './Logo.module.css'

const Logo: NextPage = () => {
  return (
    <Link href='/' className={styles.link}>
      <div className={styles.logo}>
        <FaHouse className={styles.logoImage} />
        wsom
      </div>
    </Link>
  )
}

export default Logo
