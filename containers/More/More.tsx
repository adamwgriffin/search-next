import type { NextPage } from 'next'
import type { ChangeEvent } from 'react'
import type {
  BedsAndBathsFilters,
  PriceRangeFilters,
  SquareFeetRangeFilters,
  YearBuiltRangeFilters,
  MoreFilters
} from '../../store/filters/filtersSlice'
import type { SearchTypeOption } from '../../store/filters/filtersSlice' 
import type { AppState } from '../../store'
import styles from './More.module.css'
import {
  useAppSelector,
  useAppDispatch,
  useRunCallbackIfChanged
} from '../../hooks'
import { searchWithUpdatedFilters } from '../../store/listingSearch/listingSearchSlice'
import {
  SearchTypes,
  selectSearchType,
  selectPriceRange,
  selectBedBathFilters,
  selectOpenHouse,
  selectPropertyTypes,
  selectIncludePending,
  selectSquareFeetRange,
  selectYearBuiltRange,
  selectFeatures,
  selectSoldDaysParam,
  setFilters,
  setSearchType
} from '../../store/filters/filtersSlice'
import { PropertyTypeIDArray, PropertyTypes } from '../../lib/property_types'
import SearchTypeSelector from '../../components/form/SearchTypeSelector/SearchTypeSelector'
import Price from '../../components/form/Price/Price'
import BedsAndBaths from '../../components/form/BedsAndBaths/BedsAndBaths'
import IncludePending from '../../components/form/IncludePending/IncludePending'
import PropertyType from '../../components/form/PropertyTypes/PropertyTypes'
import SquareFeet from '../../components/form/SquareFeet/SquareFeet'
import LotSize from '../../components/form/LotSize/LotSize'
import YearBuilt from '../../components/form/YearBuilt/YearBuilt'
import OpenHouse from '../../components/form/OpenHouse/OpenHouse'
import Features from '../../components/form/Features/Features'
import SoldDays from '../../components/form/SoldDays/SoldDays'

const More: NextPage = () => {
  const dispatch = useAppDispatch()
  const searchType = useAppSelector(selectSearchType)
  const priceRange = useAppSelector(selectPriceRange)
  const bedsAndBaths = useAppSelector(selectBedBathFilters)
  const openHouse = useAppSelector(selectOpenHouse)
  const selectedPropertyTypes = useAppSelector(selectPropertyTypes)
  const includePending = useAppSelector(selectIncludePending)
  const squareFeetRange = useAppSelector(selectSquareFeetRange)
  const lotSizeMin = useAppSelector((state: AppState) => state.filters.lotSizeMin)
  const yearBuiltRange = useAppSelector(selectYearBuiltRange)
  const features = useAppSelector(selectFeatures)
  const soldDays = useAppSelector(selectSoldDaysParam)
  const [setPreviousPriceRange, runSearchIfPriceRangeChanged] =
    useRunCallbackIfChanged(priceRange, () =>
      dispatch(searchWithUpdatedFilters())
    )
  const [setPreviousYearBuilt, runSearchIfYearBuiltChanged] =
    useRunCallbackIfChanged<YearBuiltRangeFilters>(yearBuiltRange, () =>
      dispatch(searchWithUpdatedFilters())
    )
  const [setPreviousSquareFeetRange, runSearchIfSquareFeetChanged] =
    useRunCallbackIfChanged<SquareFeetRangeFilters>(squareFeetRange, () =>
      dispatch(searchWithUpdatedFilters())
    )

  const handleSearchTypeChange = (searchType: SearchTypeOption) => {
    dispatch(setSearchType(searchType))
    dispatch(searchWithUpdatedFilters())
  }

  const handlePriceChange = (priceRange: Partial<PriceRangeFilters>) => {
    dispatch(setFilters(priceRange))
  }

  const handleBedsAndBathsChange = (param: Partial<BedsAndBathsFilters>) => {
    dispatch(setFilters(param))
    dispatch(searchWithUpdatedFilters())
  }

  const handlePropertyTypeChange = (
    updatedPropertyTypes: PropertyTypeIDArray
  ) => {
    dispatch(setFilters({ propertyTypes: updatedPropertyTypes }))
    dispatch(searchWithUpdatedFilters())
  }

  const handleIncludePendingChange = (includePending: boolean) => {
    dispatch(setFilters({ includePending }))
    dispatch(searchWithUpdatedFilters())
  }

  const handleOpenHouseChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ openHouse: e.target.checked }))
    dispatch(searchWithUpdatedFilters())
  }

  const handleChange = (params: Partial<MoreFilters>) => {
    dispatch(setFilters(params))
  }

  const handleChangeAndInitiateSearch = (params: Partial<MoreFilters>) => {
    dispatch(setFilters(params))
    dispatch(searchWithUpdatedFilters())
  }

  return (
    <div className={styles.more}>
      <SearchTypeSelector
        searchType={searchType}
        onChange={handleSearchTypeChange}
      />
      <div className={styles.mobileFilters}>
        <Price
          priceRange={priceRange}
          onChange={handlePriceChange}
          onFocus={setPreviousPriceRange}
          onBlur={runSearchIfPriceRangeChanged}
        />
        <BedsAndBaths
          onChange={handleBedsAndBathsChange}
          bedsAndBaths={bedsAndBaths}
        />
      </div>
      {searchType === SearchTypes.Buy && (
        <div className={styles.buyFilters}>
          <OpenHouse checked={openHouse} onChange={handleOpenHouseChange} />
          <IncludePending
            includePending={includePending}
            onChange={handleIncludePendingChange}
          />
        </div>
      )}
      {searchType !== SearchTypes.Rent && (
        <PropertyType
          propertyTypes={PropertyTypes}
          params={selectedPropertyTypes}
          onChange={handlePropertyTypeChange}
        />
      )}
      {searchType === SearchTypes.Sold && (
        <SoldDays
          soldDays={soldDays}
          onChange={handleChangeAndInitiateSearch}
        />
      )}
      <SquareFeet
        squareFeetRange={squareFeetRange}
        onChange={handleChange}
        onFocus={setPreviousSquareFeetRange}
        onBlur={runSearchIfSquareFeetChanged}
      />
      <LotSize
        lotSizeMin={lotSizeMin}
        onChange={handleChangeAndInitiateSearch}
      />
      <YearBuilt
        yearBuiltRange={yearBuiltRange}
        onChange={handleChange}
        onFocus={setPreviousYearBuilt}
        onBlur={runSearchIfYearBuiltChanged}
      />
      <Features
        featureFilters={features}
        onChange={handleChangeAndInitiateSearch}
      />
    </div>
  )
}

export default More
