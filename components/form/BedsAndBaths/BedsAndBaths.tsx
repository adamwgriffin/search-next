import type { NextPage } from 'next'
import type { CountOption } from '../../../lib/types'
import styles from './BedsAndBaths.module.css'
import MenuButton from '../../MenuButton/MenuButton'
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup'

export interface BedsAndBathsProps {
  countArr: number[]
}

export const countFormatted = (n: number) => {
  return n ? `${n}+` : 'Any'
}

export const countOptions = (countArr: number[]): CountOption[] => {
  return countArr.map(c => ({ label: countFormatted(c), value: c, checked: (c === 0) }) )
}

const BedsAndBaths: NextPage<BedsAndBathsProps> = ({ countArr }) => {
  return (
    <MenuButton label="Beds & Baths">
      <div className={styles.bedsAndBaths}>
        <RadioButtonGroup
          name='bed_min'
          label='Beds'
          options={countOptions(countArr)}
        />
        <RadioButtonGroup
          name='bath_min'
          label='Baths'
          options={countOptions(countArr)}
        />
      </div>
    </MenuButton>
  )
}

export default BedsAndBaths
