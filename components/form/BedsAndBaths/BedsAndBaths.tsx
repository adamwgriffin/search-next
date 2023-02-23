import type { NextPage } from 'next'
import type { BedsBathsParam } from '../../../lib/types/listing_service_params_types'
import css from 'styled-jsx/css'
import RadioButtonGroup from '../../design_system/RadioButtonGroup/RadioButtonGroup'
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
    <>
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
    </>
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
