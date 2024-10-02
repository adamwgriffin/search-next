import type { NextPage } from 'next'
import styles from './FiltersButton.module.css'
import FiltersIcon from '../../design_system/icons/FiltersIcon/FiltersIcon'

export interface FiltersButtonProps {
  onClick: () => void
}

const FiltersButton: NextPage<FiltersButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.filtersButton} onClick={onClick}>
      <FiltersIcon />
      Filters
    </button>
  )
}

export default FiltersButton
