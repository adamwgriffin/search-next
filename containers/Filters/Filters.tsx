import type { NextPage } from 'next'
import type {
  PriceRangeParams,
  BedsBathsParam,
  MoreFiltersParams,
  MoreFiltersParamsPartial
} from '../../lib/listing_service_params_types'
import { useAppSelector, useAppDispatch } from '../../hooks'
import {
  selectSearchType,
  selectPriceRange,
  selectPropertyTypes,
  selectBedBathParams,
  selectMoreFiltersParams,
  setSearchType,
  setFilterParams,
  setPropertyTypes,
  searchWithUpdatedFilters,
  SearchTypes,
  SearchTypeOption
} from '../../store/listingSearch/listingSearchSlice'
import { PropertyTypeIDArray, PropertyTypes } from '../../lib/property_types'
import styles from './Filters.module.css'
import Price from '../../components/form/Price/Price'
import SearchTypeSelector from '../../components/form/SearchTypeSelector/SearchTypeSelector'
import BedsAndBaths from '../../components/form/BedsAndBaths/BedsAndBaths'
import PropertyType from '../../components/form/PropertyType/PropertyType'
import More from '../../components/form/More/More'
import OutlinedButton from '../../components/form/OutlinedButton/OutlinedButton'

const Filters: NextPage = () => {
  const dispatch = useAppDispatch()
  const searchType = useAppSelector(selectSearchType)
  const priceRange = useAppSelector(selectPriceRange)
  const selectedPropertyTypes = useAppSelector(selectPropertyTypes)
  const bedsAndBaths = useAppSelector(selectBedBathParams)
  const moreFiltersParams = useAppSelector<MoreFiltersParams>(
    selectMoreFiltersParams
  )

  const handleSearchTypeChange = (searchType: SearchTypeOption) => {
    dispatch(setSearchType(searchType))
    dispatch(searchWithUpdatedFilters())
  }

  const handlePropertyTypeChange = (
    updatedPropertyTypes: PropertyTypeIDArray
  ) => {
    dispatch(setPropertyTypes(updatedPropertyTypes))
    dispatch(searchWithUpdatedFilters())
  }

  const handlePriceChange = (priceRange: Partial<PriceRangeParams>) => {
    dispatch(setFilterParams(priceRange))
  }

  const handleBedsAndBathsChange = (param: Partial<BedsBathsParam>) => {
    dispatch(setFilterParams(param))
    dispatch(searchWithUpdatedFilters())
  }

  const handleMoreChange = (params: MoreFiltersParamsPartial) => {
    dispatch(setFilterParams(params))
  }

  const handleMoreChangeAndInitiateSearch = (
    params: MoreFiltersParamsPartial
  ) => {
    dispatch(setFilterParams(params))
    dispatch(searchWithUpdatedFilters())
  }

  const handleSearchInitiated = () => {
    dispatch(searchWithUpdatedFilters())
  }

  const handleSaveSearch = () => {
    alert('TBD')
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
      {searchType !== SearchTypes.Rent && (
        <PropertyType
          propertyTypes={PropertyTypes}
          params={selectedPropertyTypes}
          onChange={handlePropertyTypeChange}
        />
      )}
      <More
        params={moreFiltersParams}
        onChange={handleMoreChange}
        onChangeAndInitiateSearch={handleMoreChangeAndInitiateSearch}
        onInitiateSearch={handleSearchInitiated}
      />
      <OutlinedButton textColor='MediumPurple' onClick={handleSaveSearch}>
        Save Search
      </OutlinedButton>
    </div>
  )
}

export default Filters
