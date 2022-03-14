import type { NextPage } from 'next'
import { useState } from 'react'
import styles from './More.module.css'
import MenuButton from '../../MenuButton/MenuButton'

const More: NextPage = () => {
  const [open, setOpen] = useState(false)

  return (
    <MenuButton
      label="More"
      open={open}
      onClick={() => setOpen(!open)}
    >
      <div className={styles.more}>
        More, more!
      </div>
    </MenuButton>
  )
}

export default More
