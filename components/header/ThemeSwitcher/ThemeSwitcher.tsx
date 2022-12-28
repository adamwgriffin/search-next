import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import styles from './ThemeSwitcher.module.css'
import Fieldset from '../../form/Fieldset/Fieldset'

const ThemeSwitcher: NextPage = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Fieldset>
      <select
        id='themeswitcher'
        className={styles.themeSwitcherDropdown}
        name='themeswitcher'
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value='system'>Theme: System</option>
        <option value='dark'>Theme: Dark</option>
        <option value='light'>Theme: Light</option>
      </select>
    </Fieldset>
  )
}

export default ThemeSwitcher
