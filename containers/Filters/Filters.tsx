import type { NextPage } from 'next'
import type {
  PriceRangeParams,
  BedsBathsParam
} from '../../lib/listing_service_params_types'
import { useAppSelector, useAppDispatch } from '../../hooks'
import {
  selectPriceRange,
  selectBedBathParams,
  setFilterParams,
  searchWithUpdatedFilters
} from '../../store/listingSearch/listingSearchSlice'
import styles from './Filters.module.css'
import Price from '../../components/form/Price/Price'
import BedsAndBaths from '../../components/form/BedsAndBaths/BedsAndBaths'
import More from '../../containers/More/More'
import OutlinedButton from '../../components/form/OutlinedButton/OutlinedButton'

const Filters: NextPage = () => {
  const dispatch = useAppDispatch()
  const priceRange = useAppSelector(selectPriceRange)
  const bedsAndBaths = useAppSelector(selectBedBathParams)

  const handlePriceChange = (priceRange: Partial<PriceRangeParams>) => {
    dispatch(setFilterParams(priceRange))
  }

  const handleBedsAndBathsChange = (param: Partial<BedsBathsParam>) => {
    dispatch(setFilterParams(param))
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
      <More />
      <OutlinedButton textColor='var(--primary)' onClick={handleSaveSearch}>
        Save Search
      </OutlinedButton>
    </div>
  )
}

export default Filters
