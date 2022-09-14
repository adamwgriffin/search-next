import type { NextPage } from 'next'
import { ChangeEventHandler } from 'react'
import styles from './PropertyType.module.css'
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
      <ul className={styles.propertyTypesList}>
        {props.propertyTypes.map(({name, label, id}) => (
          <li key={id} className={styles.propertyTypesListItem}>
            <input
              type='checkbox'
              id={name}
              className={formStyles.checkbox}
              name={name}
              value={id}
              checked={props.params.includes(id)}
              onChange={props.onChange}
            />
            <label htmlFor={name} className={styles.propertyTypesLabel}>
              {label}
            </label>
          </li>
        ))}
      </ul>
    </MenuButton>
  )
}

export default PropertyTypes
