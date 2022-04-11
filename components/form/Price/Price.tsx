import type { NextPage } from 'next'
import styles from './Price.module.css'
import MenuButton from '../../MenuButton/MenuButton'

const Price: NextPage = () => {
  return (
    <MenuButton label="Price">
      <div className={styles.price}>
        Price Range
      </div>
    </MenuButton>
  )
}

export default Price
