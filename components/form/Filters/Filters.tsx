import type { NextPage } from 'next'
import Price from '../Price/Price'
import Beds from '../Beds/Beds'
import More from '../More/More'
import styles from './Filters.module.css'

const Filters: NextPage = () => {
  return (
    <div className={styles.filters}>
      <Price />
      <Beds />
      <More />
    </div>
  )
}

export default Filters
