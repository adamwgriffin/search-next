import { render, screen } from '@testing-library/react'
import Price from './Price'

describe('Price', () => {
  
  it('Includes a Min Price field', () => {
    render(<Price priceRange={{ price_min: null, price_max: null }} />)
    expect(screen.getByRole('textbox', { name: 'Min Price' })).toBeInTheDocument()
  })

  it('Includes a Max Price field', () => {
    render(<Price priceRange={{ price_min: null, price_max: null }}  />)
    expect(screen.getByRole('textbox', { name: 'Max Price' })).toBeInTheDocument()
  })

})
