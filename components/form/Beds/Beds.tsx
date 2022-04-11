import type { NextPage } from 'next'
import styles from './Beds.module.css'
import MenuButton from '../../MenuButton/MenuButton'

const Beds: NextPage = () => {
  return (
    <MenuButton label="Beds">
      <div className={styles.beds}>
        Bedrooms
      </div>
    </MenuButton>
  )
}

export default Beds
