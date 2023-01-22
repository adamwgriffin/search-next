import { render, screen } from '@testing-library/react'
import { countArr, RadioButtonGroups } from '../../../lib/beds_and_baths'
import BedsAndBaths from './BedsAndBaths'

const bedsAndBaths = {bed_min: 0, bath_min: 0}

describe('BedsAndBaths', () => {
  
  it('Renders a group for each type of data', () => {
    render(<BedsAndBaths countArr={countArr} bedsAndBaths={bedsAndBaths} />)
    RadioButtonGroups.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('Returns a partial BedsBathsParam when a radio button is clicked', () => {
    const onChange = jest.fn()
    render(<BedsAndBaths countArr={countArr} bedsAndBaths={bedsAndBaths} onChange={onChange} />)
    screen.getAllByText('1+')[0].click()
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({bed_min: 1})
  })

})
