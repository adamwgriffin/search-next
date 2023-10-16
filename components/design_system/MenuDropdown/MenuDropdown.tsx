import type { NextPage } from 'next'
import type { CSSProperties, ReactNode } from 'react'
import { useUpdateEffect } from 'react-use'
import styles from './MenuDropdown.module.css'

interface MenuDropdownProps {
  open: boolean
  alignCenter?: boolean
  alignRight?: boolean
  alignBottom?: boolean
  children: ReactNode
  onOpen?: () => void
  onClose?: () => void
}

const AlignCenterStyles: CSSProperties = {
  left: '50%',
  right: 'auto',
  transform: 'translateX(-50%)'
}

const getStyles = (props: MenuDropdownProps): CSSProperties => {
  const styles: CSSProperties = {
    display: props.open ? 'block' : undefined,
    bottom: props.alignBottom ? '100%' : undefined
  }
  if (props.alignCenter) {
    return { ...styles, ...AlignCenterStyles }
  }
  if (props.alignRight) {
    return { ...styles, right: '0' }
  }
  return styles
}

const MenuDropdown: NextPage<MenuDropdownProps> = (props) => {
  // TODO: why are these onOpen & onClose callbacks for? the parent already knows it's passing open
  useUpdateEffect(() => {
    props.open ? props.onOpen?.() : props.onClose?.()
  }, [props.open])

  return (
    <div style={getStyles(props)} className={styles.menu}>
      {props.children}
    </div>
  )
}

export default MenuDropdown
