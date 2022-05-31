import type { NextPage } from 'next'
import { FocusEventHandler } from 'react'
import styles from './Price.module.css'
import formStyles from '../../../styles/forms.module.css'
import MenuButton from '../../MenuButton/MenuButton'
import InputFromToSeparator from '../InputFromToSeparator/InputFromToSeparator'

interface PriceProps {
  onBlur?: FocusEventHandler<HTMLInputElement>
}

const Price: NextPage<PriceProps> = (props) => {
  return (
    <MenuButton label="Price">
      <div className={styles.price}>
        <input
          type="text"
          placeholder='Min'
          className={formStyles.input}
          name="pricemin"
          onBlur={props.onBlur}
        />
        <InputFromToSeparator />
        <input
          type="text"
          placeholder='Max'
          className={formStyles.input}
          name="pricemax"
          onBlur={props.onBlur}
        />
      </div>
    </MenuButton>
  )
}

export default Price
