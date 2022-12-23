import type { NextPage } from 'next'
import type {
  MoreFiltersParams,
  MoreFiltersParamsPartial,
  ExcludeStatusParams,
  SquareFeetRangeParams,
  YearBuiltRangeParams,
  OpenHouseParam,
  FeaturesParams
} from '../../../lib/listing_service_params_types'
import styles from './More.module.css'
import pick from 'lodash/pick'
import MenuButton from '../MenuButton/MenuButton'
import ListingStatus from '../ListingStatus/ListingStatus'
import SquareFeet from '../SquareFeet/SquareFeet'
import LotSize from '../LotSize/LotSize'
import YearBuilt from '../YearBuilt/YearBuilt'
import OpenHouse from '../OpenHouse/OpenHouse'
import Features from '../Features/Features'

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
  const selectOpenHouseParam = (params: MoreFiltersParams): OpenHouseParam =>
    pick(params, ['openhouse'])

  const selectStatusParams = (params: MoreFiltersParams): ExcludeStatusParams =>
    pick(params, ['ex_pend', 'ex_cs'])

  const selectSquareFeetParams = (
    params: MoreFiltersParams
  ): SquareFeetRangeParams => pick(params, ['sqft_min', 'sqft_max'])

  const selectYearBuiltParams = (
    params: MoreFiltersParams
  ): YearBuiltRangeParams => pick(params, ['yearblt_min', 'yearblt_max'])

  const selectFeatureParams = (params: MoreFiltersParams): FeaturesParams => {
    return pick(params, [
      'water',
      'view',
      'onestory',
      'has_garage',
      'new_const',
      'virtual_tour',
      'has_pool',
      'senior_community'
    ])
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
        <Features
          featureParams={selectFeatureParams(params)}
          onChange={onChangeAndInitiateSearch}
        />
      </div>
    </MenuButton>
  )
}

export default More
