import type { NextPage } from 'next'
import { useMedia } from 'react-use'
import MenuButton from '../../design_system/MenuButton/MenuButton'
import styles from './MoreMenuButton.module.css'

export interface MoreMenuButtonProps {
  children: React.ReactNode
  onClose?: () => void
}

const MoreMenuButton: NextPage<MoreMenuButtonProps> = ({
  children,
  onClose
}) => {
  const isLargeAndUp = useMedia('(min-width: 992px)', false)
  return (
    <MenuButton
      label='More'
      onClose={onClose}
      alignRight={isLargeAndUp}
      alignCenter={!isLargeAndUp}
    >
      <div className={styles.moreMenuButtonContainer}>
        {children}
      </div>
    </MenuButton>

  )
}

export default MoreMenuButton
