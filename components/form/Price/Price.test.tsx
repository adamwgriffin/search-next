import { render, screen } from '@testing-library/react'
import Price from './Price'

describe('Price', () => {
  
  it('Includes a Min Price field', () => {
    render(<Price priceRange={{ priceMin: null, priceMax: null }} />)
    expect(screen.getByRole('textbox', { name: 'Min Price' })).toBeInTheDocument()
  })

  it('Includes a Max Price field', () => {
    render(<Price priceRange={{ priceMin: null, priceMax: null }}  />)
    expect(screen.getByRole('textbox', { name: 'Max Price' })).toBeInTheDocument()
  })

})
