import type { NextPage } from 'next'
import { ChangeEventHandler } from 'react'
import formStyles from '../../../styles/forms.module.css'
import { PropertyTypesInterface } from '../../../lib/property_types'
import MenuButton from '../MenuButton/MenuButton'

interface PropertyTypeProps {
  propertyTypes: ReadonlyArray<PropertyTypesInterface>
  params: number[]
  onChange: ChangeEventHandler<HTMLInputElement>
}

const PropertyTypes: NextPage<PropertyTypeProps> = (props) => {
  return (
    <MenuButton label="Home Type">
      <ul className={formStyles.inputList}>
        {props.propertyTypes.map(({name, label, id}) => (
          <li key={id} className={formStyles.inputListItem}>
            <input
              type='checkbox'
              id={name}
              className={formStyles.checkbox}
              name={name}
              value={id}
              checked={props.params.includes(id)}
              onChange={props.onChange}
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
