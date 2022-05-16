import type { NextPage } from 'next'
import type { CountOption } from '../../../lib/types'
import styles from './BedsAndBaths.module.css'
import MenuButton from '../../MenuButton/MenuButton'
import Fieldset from '../Fieldset/Fieldset'
import Legend from '../Legend/Legend'
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup'

const Beds: NextPage<{ countArr: number[] }> = ({ countArr }) => {

  const countFormatted = (n: number) => {
    return n ? `${n}+` : 'Any'
  }

  const countOptions = (countArr: number[]): CountOption[] => {
    return countArr.map(c => ({ label: countFormatted(c), value: c }) )
  }

  return (
    <MenuButton label="Beds & Baths">
      <div className={styles.bedsAndBaths}>
        <Fieldset>
          <Legend>Beds</Legend>
          <RadioButtonGroup
            name='bed_min'
            options={countOptions(countArr)}
          />
        </Fieldset>
        <Fieldset>
          <Legend>Baths</Legend>
          <RadioButtonGroup
            name='bath_min'
            options={countOptions(countArr)}
          />
        </Fieldset>
      </div>
    </MenuButton>
  )
}

export default Beds
