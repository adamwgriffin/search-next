import type { NextPage } from 'next'
import Price from '../Price/Price'
import Beds from '../Beds/BedsAndBaths'
import More from '../More/More'
import styles from './Filters.module.css'

const Filters: NextPage = () => {
  return (
    <div className={styles.filters}>
      <Price />
      <Beds countArr={[0, 1, 2, 3, 4, 5]} />
      <More />
    </div>
  )
}

export default Filters
