import type { NextPage } from 'next'
import type {
  MoreFiltersParams,
  ExcludeStatusParams,
  SquareFeetRangeParam
} from '../../../lib/constants/search_param_constants'
import type { MoreFiltersParamsUpdatePatch } from '../../../store/listingSearch/listingSearchSlice'
import styles from './More.module.css'
import MenuButton from '../MenuButton/MenuButton'
import ListingStatus from '../ListingStatus/ListingStatus'
import SquareFeet from '../SquareFeet/SquareFeet'

interface MoreProps {
  params: MoreFiltersParams
  onUpdateSearch?: (params: MoreFiltersParamsUpdatePatch) => void
  onChangeParams?: (params: MoreFiltersParamsUpdatePatch) => void
}

const More: NextPage<MoreProps> = ({ params, onUpdateSearch, onChangeParams }) => {
  const selectStatusParams = (
    params: MoreFiltersParams
  ): ExcludeStatusParams => {
    const { ex_pend, ex_cs } = params
    return { ex_pend, ex_cs }
  }

  const selectSquareFeetParams = (
    params: MoreFiltersParams
  ): SquareFeetRangeParam => {
    const { sqft_min, sqft_max } = params
    return { sqft_min, sqft_max }
  }

  return (
    <MenuButton label='More'>
      <div className={styles.more}>
        <ListingStatus
          statusParms={selectStatusParams(params)}
          onChange={onUpdateSearch}
        />
        <SquareFeet
          squareFeetRange={selectSquareFeetParams(params)}
          onChange={onChangeParams}
          onBlur={onUpdateSearch}
        />
      </div>
    </MenuButton>
  )
}

export default More
