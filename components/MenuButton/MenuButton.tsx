import type { NextPage } from 'next'
import styles from './MenuButton.module.css'
import OutlinedButton from '../OutlinedButton/OutlinedButton'
import MenuOpenIcon from '../icons/MenuOpenIcon/MenuOpenIcon'

type MenuButtonProps = {
  open: boolean
  label: string
  onClick?: () => void
}

const MenuButton: NextPage<MenuButtonProps> = (props) => {
  return (
    <div className={styles.menuButton} onClick={props.onClick}>
      <OutlinedButton highlighted={props.open}>
        <span className={styles.label}>
          {props.label}
        </span>
        <MenuOpenIcon open={props.open} />
      </OutlinedButton>
      <div className={props.open ? styles.open : styles.closed}>
        {props.children}
      </div>
    </div>
  )
}

export default MenuButton
