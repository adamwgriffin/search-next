import type { NextPage } from 'next'
import ContainedButton from '../../form/ContainedButton/ContainedButton'
import styles from './BoundaryControl.module.css'

const BoundaryControl: NextPage = () => {
  return (
      <div className={styles.boundaryControl}>
        <ContainedButton>
          Remove Boundary
        </ContainedButton>
      </div>
  )
}

export default BoundaryControl
