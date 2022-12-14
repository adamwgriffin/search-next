import type { NextPage } from 'next'
import type { SortById } from '../../../lib/constants/search_param_constants'
import styles from './SortMenu.module.css'
import { sortByEnum } from '../../../lib/constants/search_param_constants'

export interface SortMenuProps {
  sortBy: SortById
  onChange: (sortById: SortById) => void
}

const SortMenu: NextPage<SortMenuProps> = ({ sortBy=sortByEnum.listing_date_desc, onChange }) => {
  return (
    <div className={styles.sortMenu}>
      <div className={styles.sortLabel}>
        Sort:
      </div>
      <select
        className={styles.sortByDropdown}
        value={sortBy}
        onChange={(e) => onChange(+e.target.value as SortById)}
      >
        <option value={sortByEnum.listing_date_desc}>
          Newest
        </option>
        <option value={sortByEnum.price_asc}>
          Price (Lo-Hi)
        </option>
        <option value={sortByEnum.price_desc}>
          Price (Hi-Lo)
        </option>
        <option value={sortByEnum.beds_desc}>
          Beds
        </option>
        <option value={sortByEnum.baths_desc}>
          Baths
        </option>
        <option value={sortByEnum.total_square_footage_desc}>
          Square Feet
        </option>
      </select>
    </div>
  )
}

export default SortMenu
