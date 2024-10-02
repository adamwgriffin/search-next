import type { NextPage } from 'next'
import styles from './NoResults.module.css'
import ContainedButton from '../../design_system/ContainedButton/ContainedButton'

export interface NoResultsProps {
  onClearFiltersClick: () => void
}

const NoResults: NextPage<NoResultsProps> = ({ onClearFiltersClick }) => {
  return (
    <div className={styles.noResults}>
      <div className={styles.emoji}>🤷‍♂️</div>
      <p className={styles.message}>
        Hmm, we can&apos;t find anything for this search.
        Try removing some filters and see if that helps.
      </p>
      <p className={styles.message}>
        Or, just nuke them all! 💥
      </p>
      <ContainedButton
        onClick={onClearFiltersClick}
      >
        Clear All Filters
      </ContainedButton>
    </div>
  )
}

export default NoResults
