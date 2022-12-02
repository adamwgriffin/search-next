import type { NextPage } from 'next'
import type { MouseEventHandler } from 'react'
import ContainedButton from '../../form/ContainedButton/ContainedButton'
import styles from './BoundaryControl.module.css'

export interface BoundaryControlProps {
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const BoundaryControl: NextPage<BoundaryControlProps> = ({ onClick }) => {
  return (
    <div className={styles.boundaryControl}>
      <ContainedButton
        textColor='inherit'
        backgroundColor='rgba(255, 255, 255, 0.7)'
        onClick={onClick}
      >
        Remove Boundary
      </ContainedButton>
    </div>
  )
}

export default BoundaryControl
