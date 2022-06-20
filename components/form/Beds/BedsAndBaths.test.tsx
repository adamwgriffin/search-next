import { render, screen } from '@testing-library/react'
import BedsAndBaths from './BedsAndBaths'

describe('Beds', () => {
  render(<BedsAndBaths countArr={[0, 1, 2, 3, 4, 5]} />)
  
  it('Displays a title for Beds', () => {
    const beds = screen.getByText('Beds')
    expect(beds).toBeInTheDocument()
  })
})
