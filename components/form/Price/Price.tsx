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
        <label
          htmlFor="pricemin"
          className={formStyles.accesibileLabel}
        >
          Min Price
        </label>
        <input
          type="text"
          placeholder='Min'
          className={formStyles.input}
          id="pricemin"
          onBlur={props.onBlur}
        />
        <InputFromToSeparator />
        <label
          htmlFor="pricemax"
          className={formStyles.accesibileLabel}
        >
          Max Price
        </label>
        <input
          type="text"
          placeholder='Max'
          className={formStyles.input}
          id="pricemax"
          onBlur={props.onBlur}
        />
      </div>
    </MenuButton>
  )
}

export default Price
