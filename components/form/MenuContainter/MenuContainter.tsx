import type { NextPage } from 'next'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { useClickAway } from 'react-use'
import styles from './MenuContainter.module.css'

interface MenuContainterProps {
  children: ReactNode
  onClickAway?: (e: Event) => void
}

const MenuContainter: NextPage<MenuContainterProps> = ({ children, onClickAway }) => {
  const ref = useRef(null)

  useClickAway(ref, (e) => onClickAway?.(e))

  return (
    <div ref={ref} className={styles.menuContainter}>
      {children}
    </div>
  )
}

export default MenuContainter
