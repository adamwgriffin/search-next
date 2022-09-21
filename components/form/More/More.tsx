import type { NextPage } from 'next'
import type {
  MoreFiltersParams,
  ExcludeStatusParams
} from '../../../lib/constants/search_param_constants'
import type { MoreFiltersParamsUpdatePatch } from '../../../store/listingSearch/listingSearchSlice'
import styles from './More.module.css'
import MenuButton from '../MenuButton/MenuButton'
import ListingStatus from '../ListingStatus/ListingStatus'

interface MoreProps {
  params: MoreFiltersParams
  onChange?: (params: MoreFiltersParamsUpdatePatch) => void
}

const More: NextPage<MoreProps> = ({ params, onChange }) => {
  const selectStatusParms = (
    params: MoreFiltersParams
  ): ExcludeStatusParams => {
    const { ex_pend, ex_cs } = params
    return { ex_pend, ex_cs }
  }

  const handleListingStatusChange = (param: ExcludeStatusParams) =>
    onChange?.(param)

  return (
    <MenuButton label='More'>
      <div className={styles.more}>
        <ListingStatus
          statusParms={selectStatusParms(params)}
          onChange={handleListingStatusChange}
        />
      </div>
    </MenuButton>
  )
}

export default More
