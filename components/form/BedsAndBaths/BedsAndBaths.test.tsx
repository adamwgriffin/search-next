import { render, screen } from '@testing-library/react'
import BedsAndBaths from './BedsAndBaths'

const countArr = [0, 1, 2, 3, 4, 5]

describe('BedsAndBaths', () => {
  
  it('Renders a group for each type of data', () => {
    render(<BedsAndBaths countArr={countArr} bedsAndBaths={{bed_min: 0, bath_min: 0}} />)
    expect(screen.getByText('Beds')).toBeInTheDocument()
    expect(screen.getByText('Baths')).toBeInTheDocument()
  })

})
