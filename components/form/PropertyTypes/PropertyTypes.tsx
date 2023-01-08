import type { NextPage } from 'next'
import type {
  PropertyTypeID,
  PropertyTypeIDArray,
  PropertyTypesInterface
} from '../../../lib/property_types'
import type { ChangeEvent } from 'react'
import styles from './PropertyTypes.module.css'
import Fieldset from '../Fieldset/Fieldset'
import Legend from '../Legend/Legend'

interface PropertyTypeProps {
  propertyTypes: Readonly<PropertyTypesInterface>
  params: PropertyTypeIDArray
  onChange: (updatedPropertyTypes: PropertyTypeIDArray) => void
}

const PropertyTypes: NextPage<PropertyTypeProps> = ({
  propertyTypes,
  params,
  onChange
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: PropertyTypeID
  ) => {
    const updatedPropertyTypes = e.target.checked
      ? params.concat(id)
      : params.filter((t) => t !== id)
    onChange(updatedPropertyTypes)
  }

  return (
    <Fieldset>
      <Legend>Home Type</Legend>
      <div className={styles.propertyType}>
        {Object.entries(propertyTypes).map(([name, { label, id }]) => (
          <>
            <input
              key={`property-type-checkbox-${id}`}
              type='checkbox'
              id={name}
              className={styles.checkbox}
              name={name}
              value={id}
              checked={params.includes(id)}
              onChange={(e) => handleChange(e, id)}
            />
            <label key={`property-type-label-${id}`} htmlFor={name} className={styles.label}>
              {label}
            </label>
          </>
        ))}
      </div>
    </Fieldset>
  )
}

export default PropertyTypes
