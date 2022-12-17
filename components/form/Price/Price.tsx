import type { NextPage } from 'next'
import type { PriceRangeParams } from '../../../lib/listing_service_params_types'
import { useRef } from 'react'
import styles from './Price.module.css'
import formStyles from '../../../styles/forms.module.css'
import MenuButton from '../MenuButton/MenuButton'
import InputFromToSeparator from '../InputFromToSeparator/InputFromToSeparator'

export interface PriceProps {
  priceRange: PriceRangeParams
  onBlur?: () => void
  onClose?: () => void
  onChange?: (priceRange: PriceRangeParams) => void
}

const Price: NextPage<PriceProps> = ({ priceRange, onBlur, onClose, onChange }) => {
  const priceminRef = useRef<HTMLInputElement>(null)
  const pricemaxRef = useRef<HTMLInputElement>(null)

  const handleChange = () => {
    onChange?.({
      pricemin: Number(priceminRef.current?.value) || null,
      pricemax: Number(pricemaxRef.current?.value) || null
    })
  }

  return (
    <MenuButton label="Price" onClose={() => onClose?.()}>
      <div className={styles.price}>
        <label
          htmlFor="pricemin"
          className={formStyles.accessibleLabel}
        >
          Min Price
        </label>
        <input
          ref={priceminRef}
          type="text"
          placeholder='Min'
          className={formStyles.input}
          id="pricemin"
          autoComplete='off'
          value={priceRange.pricemin || ''}
          onChange={handleChange}
          onBlur={() => onBlur?.()}
        />
        <InputFromToSeparator />
        <label
          htmlFor="pricemax"
          className={formStyles.accessibleLabel}
        >
          Max Price
        </label>
        <input
          ref={pricemaxRef}
          type="text"
          placeholder='Max'
          className={formStyles.input}
          id="pricemax"
          autoComplete='off'
          value={priceRange.pricemax || ''}
          onChange={handleChange}
          onBlur={() => onBlur?.()}
        />
      </div>
    </MenuButton>
  )
}

export default Price
