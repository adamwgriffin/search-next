import type { NextPage } from 'next'
import type { PriceRange } from '../../components/form/Price/Price'
import { ChangeEvent } from 'react'
import styles from './Filters.module.css'
import Price from '../../components/form/Price/Price'
import BedsAndBaths from '../../components/form/BedsAndBaths/BedsAndBaths'
import PropertyType from '../../components/form/PropertyType/PropertyType'
import { PropertyTypes } from '../../lib/property_types'
import { StatusTypes } from '../../lib/status_types'
import More from '../../components/form/More/More'
import { useAppSelector, useAppDispatch } from '../../hooks'
import {
  selectPriceRange,
  selectPropertyTypes,
  setSearchParams,
  searchWithUpdatedFilters,
} from '../../store/listingSearch/listingSearchSlice'

const Filters: NextPage = () => {
  const dispatch = useAppDispatch()
  const priceRange = useAppSelector(selectPriceRange)
  const selectedPropertyTypes = useAppSelector(selectPropertyTypes)

  const handlePropertyTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedPropertyTypes = e.target.checked ?
      selectedPropertyTypes.concat(+e.target.value) :
      selectedPropertyTypes.filter((t) => t !== +e.target.value)
    dispatch(setSearchParams({ ptype: updatedPropertyTypes }))
    dispatch(searchWithUpdatedFilters())
  }

  const handlePriceChange = (priceRange: PriceRange) => {
    dispatch(setSearchParams(priceRange))
  }

  const handleSearchInitiated = () => {
    dispatch(searchWithUpdatedFilters())
  }

  return (
    <div className={styles.filters}>
      <Price
        priceRange={priceRange}
        onChange={handlePriceChange}
        onBlur={handleSearchInitiated}
      />
      <BedsAndBaths countArr={[0, 1, 2, 3, 4, 5]} />
      <PropertyType
        propertyTypes={PropertyTypes}
        params={selectedPropertyTypes}
        onChange={handlePropertyTypeChange}
      />
      <More status={StatusTypes} />
    </div>
  )
}

export default Filters
