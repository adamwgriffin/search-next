import type { NextPage } from 'next'
import { useRef } from 'react'
import styles from './Price.module.css'
import formStyles from '../../../styles/forms.module.css'
import MenuButton from '../MenuButton/MenuButton'
import InputFromToSeparator from '../InputFromToSeparator/InputFromToSeparator'

export interface PriceRange {
  pricemin: number | null
  pricemax: number | null
}

export interface PriceProps {
  priceRange: PriceRange
  onBlur?: () => void
  onClose?: () => void
  onChange?: (priceRange: PriceRange) => void
}

const Price: NextPage<PriceProps> = ({ priceRange, onBlur, onClose, onChange }) => {
  const priceminRef = useRef<HTMLInputElement>(null)
  const pricemaxRef = useRef<HTMLInputElement>(null)

  const getPriceRange = () => {
    return {
      pricemin: Number(priceminRef.current?.value) || null,
      pricemax: Number(pricemaxRef.current?.value) || null
    }
  }

  const handleChange = () => {
    onChange?.(getPriceRange())
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
          value={priceRange.pricemax || ''}
          onChange={handleChange}
          onBlur={() => onBlur?.()}
        />
      </div>
    </MenuButton>
  )
}

export default Price
