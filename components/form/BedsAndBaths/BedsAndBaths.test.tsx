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
  })

})
