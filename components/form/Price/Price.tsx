import type { NextPage } from 'next'
import { useState } from 'react'
import styles from './Price.module.css'
import MenuButton from '../../MenuButton/MenuButton'

const Price: NextPage = () => {
  const [open, setOpen] = useState(false)

  return (
    <MenuButton
      label="Price"
      open={open}
      onClick={() => setOpen(!open)}
    >
      <div className={styles.price}>
        Price Range
      </div>
    </MenuButton>
  )
}

export default Price
