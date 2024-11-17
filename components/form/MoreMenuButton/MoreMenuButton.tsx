import { useState } from 'react'
import MenuContainter from '../../design_system/MenuContainter/MenuContainter'
import ToggleOpenButton from '../../design_system/ToggleOpenButton/ToggleOpenButton'
import More from '../../../containers/More/More'
import FiltersFooter from '../../../containers/FiltersFooter/FiltersFooter'
import styles from './MoreMenuButton.module.css'

const MoreMenuButton: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <MenuContainter onClickAway={() => setOpen(false)}>
      <ToggleOpenButton
        label='More'
        open={open}
        onClick={() => setOpen((o) => !o)}
      />
      <div className={open ? styles.menuOpen : styles.menuClosed}>
        <div className={styles.content}>
          <More />
        </div>
      </div>
    </MenuContainter>
  )
}

export default MoreMenuButton
