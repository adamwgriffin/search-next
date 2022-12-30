import type { NextPage } from 'next'
import styles from './MenuOpenIcon.module.css'

const MenuOpenIcon: NextPage<{ open: boolean }> = (props) => {
  return (
    <svg
      role='button'
      aria-pressed={props.open}
      className={props.open ? styles.open : styles.closed}
      xmlns='http://www.w3.org/2000/svg'
      width='12'
      height='8'
    >
      <path fillRule='evenodd' d='M10.59.59 6 5.17 1.41.59 0 2l6 6 6-6z' />
    </svg>
  )
}

export default MenuOpenIcon
