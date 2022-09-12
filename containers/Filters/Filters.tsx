import type { NextPage } from 'next'
import { useState, ChangeEvent } from 'react'
import styles from './Filters.module.css'
import Price from '../../components/form/Price/Price'
import BedsAndBaths from '../../components/form/BedsAndBaths/BedsAndBaths'
import PropertyType from '../../components/form/PropertyType/PropertyType'
import { PropertyTypes } from '../../lib/property_types'
import { StatusTypes } from '../../lib/status_types'
import More from '../../components/form/More/More'

const Filters: NextPage = () => {
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([1, 2])

  const handlePropertyTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.checked ?
      setSelectedPropertyTypes(selectedPropertyTypes.concat(+e.target.value)) :
      setSelectedPropertyTypes(selectedPropertyTypes.filter(t => t !== +e.target.value))
  }

  return (
    <div className={styles.filters}>
      {/* we can handle blur events on Price likes so once we're ready to wire this up: */}
      {/* <Price onBlur={(e) => console.log("Blur triggered:", { [e.target.name]: +e.target.value })} /> */}
      <Price />
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
