import type { NextPage } from 'next'
import { useMedia } from 'react-use'
import MenuButton from '../../design_system/MenuButton/MenuButton'
import breakpointStyles from '../../../styles/breakpoints.module.css'
import styles from './PriceMenuButton.module.css'

export interface PriceMenuButtonProps {
  children: React.ReactNode
  onClose?: () => void
}

const PriceMenuButton: NextPage<PriceMenuButtonProps> = ({
  children,
  onClose
}) => {
  const isLargeAndUp = useMedia(breakpointStyles.largeAndUp, false)

  return (
    <MenuButton
      label='Price'
      alignRight={isLargeAndUp}
      onClose={onClose}
    >
      <div className={styles.priceMenuContainer}>
        {children}
      </div>
    </MenuButton>
  )
}

export default PriceMenuButton
