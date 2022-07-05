import { render, screen } from '@testing-library/react'
import BedsAndBaths, { countFormatted, countOptions } from './BedsAndBaths'

const countArr = [0, 1, 2, 3, 4, 5]

describe('countFormatted', () => {

  it('Adds a "+" to any non-zero number', () => {
    expect(countFormatted(1)).toMatch('1+')
  })

  it('Displays the number zero as "Any"', () => {
    expect(countFormatted(0)).toMatch('Any')
  })

})

describe('countOptions', () => {

  it('Creates a count options object for each item in the array', () => {
    countOptions(countArr).forEach(o => {
      expect(o).toMatchObject({
        label: countFormatted(o.value),
        value: o.value
      })
    })
  })

})

describe('BedsAndBaths', () => {
  
  it('Renders a group for each type of data', () => {
    render(<BedsAndBaths countArr={countArr} />)
    expect(screen.getByText('Beds')).toBeInTheDocument()
    expect(screen.getByText('Baths')).toBeInTheDocument()
  })

})
