'use client'

import type { NextPage } from 'next'
import Link from 'next/link'
import { useToggle } from 'react-use'
import { useCallback } from 'react'
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

  const handleLogout = useCallback(() => {
    toggleMenu(false)
    console.log("TBD")
  }, [toggleMenu])

  const handleLogin = useCallback(() => {
    toggleMenu(false)
    console.log("TBD")
  }, [toggleMenu])

  return (
    <MenuContainter onClickAway={() => toggleMenu(false)}>
      <button className={styles.menuButton} onClick={toggleMenu}>
        <HamburgerIcon active={open} />
      </button>
      <MenuDropdown open={open} alignRight>
        {session?.user ? (
          <>
            <header className={styles.header}>
              <Avatar src={session?.user?.image} />
              <h1 className={styles.name}>{session?.user?.name}</h1>
            </header>
            <ul className={styles.menuListWithSeparator}>
              <li className={styles.menuItem}>
                <Link href='/account' className={styles.link}>
                  My Account
                </Link>
              </li>
              <li className={styles.menuItem}>
                {/* Real link TBD */}
                <Link href='/account' className={styles.link}>
                  Favorites
                </Link>
              </li>
              <li className={styles.menuItem}>
                {/* Real link TBD */}
                <Link href='/account' className={styles.link}>
                  Saved Searches
                </Link>
              </li>
            </ul>
            <ul className={styles.menuListWithSeparator}>
              <li className={styles.menuItem}>
                <ThemeSwitcher />
              </li>
              <li onClick={handleLogout} className={styles.menuItem}>
                Log Out
              </li>
            </ul>
          </>
        ) : (
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <ThemeSwitcher />
            </li>
            <li onClick={handleLogin} className={styles.menuItem}>
              Log in
            </li>
          </ul>
        )}
      </MenuDropdown>
    </MenuContainter>
  )
}

export default UserMenu
