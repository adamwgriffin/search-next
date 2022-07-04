import { render, screen } from '@testing-library/react'
import RadioButton from './RadioButton'

describe('RadioButton', () => {

  it('Displays a label', () => {
    render(<RadioButton name="bed_min" label="Any" value={0} />)
    expect(screen.getByLabelText('Any')).toBeInTheDocument()
  })

  it('Uses the name prop to create a unique ID for the input', () => {
    render(
      <>
        <RadioButton name="bed_min" label="Any" value={0} />
        <RadioButton name="bed_min" label="0+" value={1} />
      </>
    )
    const inputOne = screen.getByLabelText('Any')
    const inputTwo = screen.getByLabelText('0+')
    expect(inputOne.id).toMatch(/^bed_min.+/)
    expect(inputOne.id).not.toMatch(inputTwo.id)
  })

})
