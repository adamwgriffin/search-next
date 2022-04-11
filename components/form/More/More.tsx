import type { NextPage } from 'next'
import styles from './More.module.css'
import MenuButton from '../../MenuButton/MenuButton'

const More: NextPage = () => {

  return (
    <MenuButton label="More">
      <div className={styles.more}>
        More, more!
      </div>
    </MenuButton>
  )
}

export default More
