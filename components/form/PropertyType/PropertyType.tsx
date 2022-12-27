import type { NextPage } from 'next'
import type {
  PropertyTypeID,
  PropertyTypeIDArray,
  PropertyTypesInterface
} from '../../../lib/property_types'
import type { ChangeEvent } from 'react'
import formStyles from '../../../styles/forms.module.css'
import MenuButton from '../MenuButton/MenuButton'

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
    <MenuButton label='Home Type'>
      <ul className={formStyles.inputList}>
        {Object.entries(propertyTypes).map(([name, { label, id }]) => (
          <li key={id} className={formStyles.inputListItem}>
            <input
              type='checkbox'
              id={name}
              className={formStyles.checkbox}
              name={name}
              value={id}
              checked={params.includes(id)}
              onChange={(e) => handleChange(e, id)}
            />
            <label htmlFor={name} className={formStyles.inputListLabel}>
              {label}
            </label>
          </li>
        ))}
      </ul>
    </MenuButton>
  )
}

export default PropertyTypes
