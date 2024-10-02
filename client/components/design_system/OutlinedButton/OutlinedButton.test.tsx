import { render, screen } from '@testing-library/react'
import OutlinedButton from './OutlinedButton'

describe('OutlinedButton', () => {
  it('calls onClick when clicked', () => {
    const onClick = jest.fn()
    render(<OutlinedButton onClick={onClick}>Test onClick</OutlinedButton>)
    screen.getByRole('button').click()
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
