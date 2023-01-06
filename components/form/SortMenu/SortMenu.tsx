import type { NextPage } from 'next'
import type { SortById } from '../../../lib/listing_service_params_types'
import { useToggle } from 'react-use'
import styles from './SortMenu.module.css'
import { sortByEnum } from '../../../lib/listing_service_params'
import Dropdown from '../Dropdown/Dropdown'
import CheckIcon from '../../icons/CheckIcon/CheckIcon'

export interface SortMenuProps {
  sortBy: SortById
  onChange?: (sortById: SortById) => void
}

const SortByIdLabels: Partial<Record<SortById, string>> = {
  [sortByEnum.listing_date_desc]: 'Newest',
  [sortByEnum.price_asc]: 'Price (Lo-Hi)',
  [sortByEnum.price_desc]: 'Price (Hi-Lo)',
  [sortByEnum.beds_desc]: 'Beds',
  [sortByEnum.baths_desc]: 'Baths',
  [sortByEnum.total_square_footage_desc]: 'Square Feet'
}

const SortMenu: NextPage<SortMenuProps> = ({
  sortBy = sortByEnum.listing_date_desc,
  onChange
}) => {
  const [open, toggleMenu] = useToggle(false)

  const handleClick = (sortById: SortById) => {
    toggleMenu(false)
    onChange?.(sortById)
  }

  return (
    <Dropdown
      open={open}
      label={`Sort: ${SortByIdLabels[sortBy]}`}
      condensed
      alignRight
      onClick={toggleMenu}
      onClickAway={() => toggleMenu(false)}
    >
      <ul className={styles.menu}>
        {Object.entries(SortByIdLabels).map(([id, label]) => (
          <li
            key={id}
            onClick={() => handleClick(Number(id) as SortById)}
            className={styles.menuItem}
          >
            <div>{sortBy === Number(id) && <CheckIcon />}</div>
            <div>{label}</div>
          </li>
        ))}
      </ul>
    </Dropdown>
  )
}

export default SortMenu
