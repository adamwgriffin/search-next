import type { NextPage } from 'next'
import type {
  MoreFiltersParams,
  MoreFiltersParamsPartial,
  ExcludeStatusParams,
  SquareFeetRangeParams
} from '../../../lib/listing_service_params_types'
import styles from './More.module.css'
import MenuButton from '../MenuButton/MenuButton'
import ListingStatus from '../ListingStatus/ListingStatus'
import SquareFeet from '../SquareFeet/SquareFeet'

interface MoreProps {
  params: MoreFiltersParams
  onUpdateSearch?: (params: MoreFiltersParamsPartial) => void
  onChangeParams?: (params: MoreFiltersParamsPartial) => void
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
  ): SquareFeetRangeParams => {
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
