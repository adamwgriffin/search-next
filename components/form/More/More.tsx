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
  onChange?: (params: MoreFiltersParamsPartial) => void
  onChangeAndInitiateSearch?: (params: MoreFiltersParamsPartial) => void
  onInitiateSearch?: () => void
}

const More: NextPage<MoreProps> = ({
  params,
  onChange,
  onChangeAndInitiateSearch,
  onInitiateSearch
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
          onChange={onChangeAndInitiateSearch}
        />
        <ListingStatus
          statusParms={selectStatusParams(params)}
          onChange={onChangeAndInitiateSearch}
        />
        <SquareFeet
          squareFeetRange={selectSquareFeetParams(params)}
          onChange={onChange}
          onBlur={onInitiateSearch}
        />
        <LotSize
          lotSizeMin={params.lotsize_min}
          onChange={onChangeAndInitiateSearch}
        />
        <YearBuilt
          yearBuiltRange={selectYearBuiltParams(params)}
          onChange={onChange}
          onBlur={onInitiateSearch}
        />
      </div>
    </MenuButton>
  )
}

export default More
