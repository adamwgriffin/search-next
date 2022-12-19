import type { NextPage } from 'next'
import type {
  MoreFiltersParams,
  MoreFiltersParamsPartial,
  ExcludeStatusParams,
  SquareFeetRangeParams,
  YearBuiltRangeParams,
  OpenHouseParam
} from '../../../lib/listing_service_params_types'
import styles from './More.module.css'
import MenuButton from '../MenuButton/MenuButton'
import ListingStatus from '../ListingStatus/ListingStatus'
import SquareFeet from '../SquareFeet/SquareFeet'
import LotSize from '../LotSize/LotSize'
import YearBuilt from '../YearBuilt/YearBuilt'
import OpenHouse from '../OpenHouse/OpenHouse'

interface MoreProps {
  params: MoreFiltersParams
  onUpdateSearch?: (params: MoreFiltersParamsPartial) => void
  onChangeParams?: (params: MoreFiltersParamsPartial) => void
}

const More: NextPage<MoreProps> = ({
  params,
  onUpdateSearch,
  onChangeParams
}) => {
  const selectOpenHouseParam = (params: MoreFiltersParams): OpenHouseParam => {
    const { openhouse } = params
    return { openhouse }
  }

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

  const selectYearBuiltParams = (
    params: MoreFiltersParams
  ): YearBuiltRangeParams => {
    const { yearblt_min, yearblt_max } = params
    return { yearblt_min, yearblt_max }
  }

  return (
    <MenuButton label='More'>
      <div className={styles.more}>
        <OpenHouse
          openHouseParam={selectOpenHouseParam(params)}
          onChange={onUpdateSearch}
        />
        <ListingStatus
          statusParms={selectStatusParams(params)}
          onChange={onUpdateSearch}
        />
        <SquareFeet
          squareFeetRange={selectSquareFeetParams(params)}
          onChange={onChangeParams}
          onBlur={onUpdateSearch}
        />
        <LotSize lotSizeMin={params.lotsize_min} onChange={onUpdateSearch} />
        <YearBuilt
          yearBuiltRange={selectYearBuiltParams(params)}
          onChange={onChangeParams}
          onBlur={onUpdateSearch}
        />
      </div>
    </MenuButton>
  )
}

export default More
