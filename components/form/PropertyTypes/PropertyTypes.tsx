import type { NextPage } from 'next'
import type {
  PropertyTypeID,
  PropertyTypeIDArray,
  PropertyTypesInterface
} from '../../../lib/property_types'
import type { ChangeEvent } from 'react'
import { Fragment } from 'react'
import styles from './PropertyTypes.module.css'
import Fieldset from '../../design_system/Fieldset/Fieldset'
import Legend from '../../design_system/Legend/Legend'

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
          <Fragment key={`property-type-${label}-${id}`}>
            <input
              type='checkbox'
              id={name}
              className={styles.checkbox}
              name={name}
              value={id}
              checked={params.includes(id)}
              onChange={(e) => handleChange(e, id)}
            />
            <label htmlFor={name} className={styles.label}>
              {label}
            </label>
          </Fragment>
        ))}
      </div>
    </Fieldset>
  )
}

export default PropertyTypes
