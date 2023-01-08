import type { NextPage } from 'next'
import type { MoreFiltersParamsPartial } from '../../lib/listing_service_params_types'
import type { SearchTypeOption } from '../../store/listingSearch/listingSearchSlice'
import styles from './More.module.css'
import { useAppSelector, useAppDispatch } from '../../hooks'
import {
  selectOpenHouseParam,
  selectStatusParams,
  selectSquareFeetParams,
  selectLotSizeParams,
  selectYearBuiltParams,
  selectFeatureParams,
  selectSearchType,
  SearchTypes,
  setSearchType,
  setFilterParams,
  searchWithUpdatedFilters
} from '../../store/listingSearch/listingSearchSlice'
import MenuButton from '../../components/form/MenuButton/MenuButton'
import SearchTypeSelector from '../../components/form/SearchTypeSelector/SearchTypeSelector'
import ListingStatus from '../../components/form/ListingStatus/ListingStatus'
import SquareFeet from '../../components/form/SquareFeet/SquareFeet'
import LotSize from '../../components/form/LotSize/LotSize'
import YearBuilt from '../../components/form/YearBuilt/YearBuilt'
import OpenHouse from '../../components/form/OpenHouse/OpenHouse'
import Features from '../../components/form/Features/Features'

const More: NextPage = () => {
  const dispatch = useAppDispatch()
  const searchType = useAppSelector(selectSearchType)
  const openHouseParam = useAppSelector(selectOpenHouseParam)
  const statusParams = useAppSelector(selectStatusParams)
  const squareFeetRange = useAppSelector(selectSquareFeetParams)
  const lotSizeParams = useAppSelector(selectLotSizeParams)
  const yearBuiltRange = useAppSelector(selectYearBuiltParams)
  const featureParams = useAppSelector(selectFeatureParams)

  const handleSearchTypeChange = (searchType: SearchTypeOption) => {
    dispatch(setSearchType(searchType))
    dispatch(searchWithUpdatedFilters())
  }

  const handleChange = (params: MoreFiltersParamsPartial) => {
    dispatch(setFilterParams(params))
  }

  const handleChangeAndInitiateSearch = (params: MoreFiltersParamsPartial) => {
    dispatch(setFilterParams(params))
    dispatch(searchWithUpdatedFilters())
  }

  const initiateSearch = () => {
    dispatch(searchWithUpdatedFilters())
  }

  return (
    <MenuButton label='More'>
      <div className={styles.more}>
        <SearchTypeSelector
          searchType={searchType}
          onChange={handleSearchTypeChange}
        />
        <OpenHouse
          openHouseParam={openHouseParam}
          onChange={handleChangeAndInitiateSearch}
        />
        <ListingStatus
          statusParms={statusParams}
          onChange={handleChangeAndInitiateSearch}
        />
        <SquareFeet
          squareFeetRange={squareFeetRange}
          onChange={handleChange}
          onBlur={initiateSearch}
        />
        <LotSize
          lotSizeMin={lotSizeParams.lotsize_min}
          onChange={handleChangeAndInitiateSearch}
        />
        <YearBuilt
          yearBuiltRange={yearBuiltRange}
          onChange={handleChange}
          onBlur={initiateSearch}
        />
        <Features
          featureParams={featureParams}
          onChange={handleChangeAndInitiateSearch}
        />
      </div>
    </MenuButton>
  )
}

export default More
