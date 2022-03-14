import type { NextPage } from 'next'
import styles from './MenuOpenIcon.module.css'

const MenuOpenIcon: NextPage<{ open: boolean }> = (props) => {
  return (
    <svg
      role="button"
      aria-pressed={props.open}
      className={props.open ? styles.open : styles.closed}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="#212e35"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    </svg>
  )
}

export default MenuOpenIcon
