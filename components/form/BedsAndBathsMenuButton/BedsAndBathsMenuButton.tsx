import type { NextPage } from 'next'
import { useMedia } from 'react-use'
import MenuButton from '../../design_system/MenuButton/MenuButton'
import styles from './BedsAndBathsMenuButton.module.css'

export interface BedsAndBathsMenuButtonProps {
  children: React.ReactNode
  onClose?: () => void
}

const BedsAndBathsMenuButton: NextPage<BedsAndBathsMenuButtonProps> = ({
  children,
  onClose
}) => {
  const isLargeAndUp = useMedia('(min-width: 992px)', false)

  return (
    <MenuButton
      label='Beds & Baths'
      alignRight={isLargeAndUp}
      onClose={onClose}
    >
      <div className={styles.bedsAndBathsMenuContainer}>
        {children}
      </div>
    </MenuButton>
  )
}

export default BedsAndBathsMenuButton
