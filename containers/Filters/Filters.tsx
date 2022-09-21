import type { NextPage } from 'next'
import type { PriceRangeParam } from '../../components/form/Price/Price'
import type { BedsBathsParam, MoreFiltersParams } from '../../lib/constants/search_param_constants'
import type { MoreFiltersParamsUpdatePatch } from '../../store/listingSearch/listingSearchSlice'
import { ChangeEvent } from 'react'
import styles from './Filters.module.css'
import Price from '../../components/form/Price/Price'
import SearchTypeSelector from '../../components/form/SearchTypeSelector/SearchTypeSelector'
import BedsAndBaths from '../../components/form/BedsAndBaths/BedsAndBaths'
import PropertyType from '../../components/form/PropertyType/PropertyType'
import { PropertyTypes } from '../../lib/property_types'
import More from '../../components/form/More/More'
import { useAppSelector, useAppDispatch } from '../../hooks'
import {
  selectSearchType,
  selectPriceRange,
  selectPropertyTypes,
  selectBedBathParams,
  selectMoreFiltersParams,
  setSearchType,
  setSearchParams,
  searchWithUpdatedFilters,
  SearchTypes,
  SearchTypeOption,
} from '../../store/listingSearch/listingSearchSlice'

const Filters: NextPage = () => {
  const dispatch = useAppDispatch()
  const searchType = useAppSelector(selectSearchType)
  const priceRange = useAppSelector(selectPriceRange)
  const selectedPropertyTypes = useAppSelector(selectPropertyTypes)
  const bedsAndBaths = useAppSelector(selectBedBathParams)
  const moreFiltersParams = useAppSelector<MoreFiltersParams>(selectMoreFiltersParams)

  const handleSearchTypeChange = (searchType: SearchTypeOption) => {
    dispatch(setSearchType(searchType))
    dispatch(searchWithUpdatedFilters())
  }

  const handlePropertyTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedPropertyTypes = e.target.checked ?
      selectedPropertyTypes.concat(+e.target.value) :
      selectedPropertyTypes.filter(t => t !== +e.target.value)
    dispatch(setSearchParams({ ptype: updatedPropertyTypes }))
    dispatch(searchWithUpdatedFilters())
  }

  const handlePriceChange = (priceRange: PriceRangeParam) => {
    dispatch(setSearchParams(priceRange))
  }

  const handleBedsAndBathsChange = (param: BedsBathsParam) => {
    dispatch(setSearchParams(param))
    dispatch(searchWithUpdatedFilters())
  }

  const handleMoreFiltersChange = (params: MoreFiltersParamsUpdatePatch) => {
    dispatch(setSearchParams(params))
    dispatch(searchWithUpdatedFilters())
  }

  const handleSearchInitiated = () => {
    dispatch(searchWithUpdatedFilters())
  }

  return (
    <div className={styles.filters}>
      <SearchTypeSelector
        searchType={searchType}
        onChange={handleSearchTypeChange}
      />
      <Price
        priceRange={priceRange}
        onChange={handlePriceChange}
        onBlur={handleSearchInitiated}
      />
      <BedsAndBaths
        countArr={[0, 1, 2, 3, 4, 5]}
        onChange={handleBedsAndBathsChange}
        bedsAndBaths={bedsAndBaths}
      />
      {searchType !== SearchTypes.Rent && <PropertyType
        propertyTypes={PropertyTypes}
        params={selectedPropertyTypes}
        onChange={handlePropertyTypeChange}
      />}
      <More
        params={moreFiltersParams}
        onChange={handleMoreFiltersChange}
      />
    </div>
  )
}

export default Filters
