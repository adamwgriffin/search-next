import type { NextPage } from 'next'
import type { CountOption } from '../../../lib/types'
import type { BedsBathsParam } from '../../../lib/listing_service_params_types'
import css from 'styled-jsx/css'
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

export const RadioButtonGroups = [
  { param: 'bed_min', label: 'Beds' },
  { param: 'bath_min', label: 'Baths' }
]

export const countOptions = (
  param: string,
  countArr: number[],
  bedsAndBaths: BedsBathsParam
): CountOption[] => {
  return countArr.map((c) => ({
    label: c ? `${c}+` : 'Any',
    value: c,
    checked: c === Number(bedsAndBaths[param as keyof BedsBathsParam])
  }))
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
