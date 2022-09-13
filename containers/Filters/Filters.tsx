import type { NextPage } from 'next'
import type { PriceRange } from '../../components/form/Price/Price'
import { useState, ChangeEvent } from 'react'
import styles from './Filters.module.css'
import Price from '../../components/form/Price/Price'
import BedsAndBaths from '../../components/form/BedsAndBaths/BedsAndBaths'
import PropertyType from '../../components/form/PropertyType/PropertyType'
import { PropertyTypes } from '../../lib/property_types'
import { StatusTypes } from '../../lib/status_types'
import More from '../../components/form/More/More'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { selectPriceRange, setSearchParams, searchWithUpdatedParams, selectLocationSearchField } from '../../store/listingSearch/listingSearchSlice'

const Filters: NextPage = () => {
  const dispatch = useAppDispatch()
  const priceRange = useAppSelector(selectPriceRange)
  const locationSearchField = useAppSelector(selectLocationSearchField)
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([1, 2])

  const handlePropertyTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.checked ?
      setSelectedPropertyTypes(selectedPropertyTypes.concat(+e.target.value)) :
      setSelectedPropertyTypes(selectedPropertyTypes.filter(t => t !== +e.target.value))
  }

  const handlePriceChange = (priceRange: PriceRange) => {
    dispatch(setSearchParams(priceRange))
  }

  const handleUpdatedParams = () => {
    dispatch(searchWithUpdatedParams())
  }

  return (
    <div className={styles.filters}>
      <Price
        priceRange={priceRange}
        onChange={handlePriceChange}
        onBlur={handleUpdatedParams}
      />
      <BedsAndBaths countArr={[0, 1, 2, 3, 4, 5]} />
      <PropertyType
        propertyTypes={PropertyTypes}
        params={selectedPropertyTypes}
        onChange={handlePropertyTypeChange}
      />
      <More
        status={StatusTypes}
      />
    </div>
  )
}

export default Filters
