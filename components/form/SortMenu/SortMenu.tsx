import type { NextPage } from 'next'
import type {
  SortType,
  SortDirection,
  SortParams
} from '../../../lib/types/listing_service_params_types'
import { useToggle } from 'react-use'
import styles from './SortMenu.module.css'
import Dropdown from '../../design_system/Dropdown/Dropdown'
import CheckIcon from '../../design_system/icons/CheckIcon/CheckIcon'

export interface SortMenuProps {
  sortBy: SortParams
  onChange?: (sortParams: SortParams) => void
}

export interface SortTypeLabels {
  label: string
  type: SortType
  direction: SortDirection
}

const SortTypeLabels: SortTypeLabels[] = [
  {
    label: 'Newest',
    type: 'listedDate',
    direction: 'desc'
  },
  {
    label: 'Price (Lo-Hi)',
    type: 'listPrice',
    direction: 'asc'
  },
  {
    label: 'Price (Hi-Lo)',
    type: 'listPrice',
    direction: 'desc'
  },
  {
    label: 'Beds',
    type: 'beds',
    direction: 'desc'
  },
  {
    label: 'Baths',
    type: 'baths',
    direction: 'desc'
  },
  {
    label: 'Square Feet',
    type: 'sqft',
    direction: 'desc'
  }
]

const getCurrentSortLabel = (sortParams: SortParams) => {
  return SortTypeLabels.find(
    ({ type, direction }) =>
      type === sortParams.sort_by && direction === sortParams.sort_direction
  )?.label
}

const SortMenu: NextPage<SortMenuProps> = ({
  sortBy = { sort_by: 'listedDate', sort_direction: 'desc' },
  onChange
}) => {
  const [open, toggleMenu] = useToggle(false)

  const handleClick = (sortParams: SortParams) => {
    toggleMenu(false)
    onChange?.(sortParams)
  }

  return (
    <Dropdown
      open={open}
      label={`Sort: ${getCurrentSortLabel(sortBy)}`}
      condensed
      alignRight
      onClick={toggleMenu}
      onClickAway={() => toggleMenu(false)}
    >
      <ul className={styles.menu}>
        {SortTypeLabels.map(({ type, label, direction }) => (
          <li
            key={`${type}-${direction}`}
            onClick={() =>
              handleClick({ sort_by: type, sort_direction: direction })
            }
            className={styles.menuItem}
          >
            <div>
              {sortBy.sort_by === type &&
                sortBy.sort_direction == direction && <CheckIcon />}
            </div>
            <div>{label}</div>
          </li>
        ))}
      </ul>
    </Dropdown>
  )
}

export default SortMenu
