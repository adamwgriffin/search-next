import type { NextPage } from 'next'
import { useState } from 'react'
import styles from './Beds.module.css'
import MenuButton from '../../MenuButton/MenuButton'

const Beds: NextPage = () => {
  const [open, setOpen] = useState(false)

  return (
    <MenuButton
      label="Beds"
      open={open}
      onClick={() => setOpen(!open)}
    >
      <div className={styles.beds}>
        Bedrooms
      </div>
    </MenuButton>
  )
}

export default Beds
