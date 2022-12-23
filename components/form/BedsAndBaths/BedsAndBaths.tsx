import type { NextPage } from 'next'
import type { CountOption } from '../../../lib/types'
import type { BedsBathsParam } from '../../../lib/listing_service_params_types'
import styles from './BedsAndBaths.module.css'
import MenuButton from '../MenuButton/MenuButton'
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup'

export interface BedsAndBathsProps {
  countArr: number[]
  bedsAndBaths: BedsBathsParam
  onChange?: (param: Partial<BedsBathsParam>) => void
}

const BedsAndBaths: NextPage<BedsAndBathsProps> = ({
  countArr,
  bedsAndBaths,
  onChange
}) => {
  const countFormatted = (n: number) => {
    return n ? `${n}+` : 'Any'
  }

  const countOptions = (param: string, countArr: number[]): CountOption[] => {
    return countArr.map((c) => ({
      label: countFormatted(c),
      value: c,
      checked: c === Number(bedsAndBaths[param as keyof BedsBathsParam])
    }))
  }

  return (
    <MenuButton label='Beds & Baths'>
      <div className={styles.bedsAndBaths}>
        <RadioButtonGroup
          name='bed_min'
          label='Beds'
          options={countOptions('bed_min', countArr)}
          onChange={(value) => onChange?.({ bed_min: value || null })}
        />
        <RadioButtonGroup
          name='bath_min'
          label='Baths'
          options={countOptions('bath_min', countArr)}
          onChange={(value) => onChange?.({ bath_min: value || null })}
        />
      </div>
    </MenuButton>
  )
}

export default BedsAndBaths
