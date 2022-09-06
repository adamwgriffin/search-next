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
        <ContainedButton onClick={onClick}>
          Remove Boundary
        </ContainedButton>
      </div>
  )
}

export default BoundaryControl
