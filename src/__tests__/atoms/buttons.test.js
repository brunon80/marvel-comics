import { render, screen } from '@testing-library/react'
import { Button } from '../../src/atoms/buttons'

describe('Buttons tests', () => {
  it('should render correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})