'use client'

import type { NextPage } from 'next'
import { useToggle } from 'react-use'
import { useSession } from 'next-auth/react'
import styles from './UserMenu.module.css'
import MenuContainter from '../../design_system/MenuContainter/MenuContainter'
import MenuDropdown from '../../design_system/MenuDropdown/MenuDropdown'
import HamburgerIcon from '../../design_system/icons/HamburgerIcon/HamburgerIcon'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'
import Avatar from '../Avatar/Avatar'

const UserMenu: NextPage = () => {
  const { data: session } = useSession()
  const [open, toggleMenu] = useToggle(false)

  return (
    <MenuContainter onClickAway={() => toggleMenu(false)}>
      <button className={styles.loginButton} onClick={toggleMenu}>
        <HamburgerIcon active={open} />
      </button>
      <MenuDropdown open={open} alignRight>
        <div className={styles.loginMenu}>
          <Avatar src={session?.user?.image} />
          <h1 className={styles.user}>
            {session?.user?.name}
          </h1>
          <ThemeSwitcher />
          <p>Sign Out</p>
        </div>
      </MenuDropdown>
    </MenuContainter>
  )
}

export default UserMenu
