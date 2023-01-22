import type { NextPage } from 'next'
import type { BedsBathsParam } from '../../../lib/listing_service_params_types'
import css from 'styled-jsx/css'
import MenuButton from '../MenuButton/MenuButton'
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup'
import { countOptions, RadioButtonGroups } from '../../../lib/beds_and_baths'

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
  return (
    <MenuButton label='Beds & Baths' alignRight>
      <div className='bedsAndBaths'>
        {RadioButtonGroups.map(({ param, label }) => (
          <RadioButtonGroup
            key={param}
            name={param}
            label={label}
            options={countOptions(param, countArr, bedsAndBaths)}
            onChange={(value) => onChange?.({ [param]: value || null })}
          />
        ))}
      </div>
      <style jsx>{styles}</style>
    </MenuButton>
  )
}

const styles = css`
  .bedsAndBaths {
    display: grid;
    gap: 1rem;
    padding: 1rem;
    min-height: 12rem;
  }
`

export default BedsAndBaths
