import { render, screen, fireEvent } from '@testing-library/react'
import { TextInput } from '../../atoms'

describe('TextInput tests', () => {
  const setup = () => {
    const utils = render(<TextInput aria-label="search" />)
    const input = utils.getByLabelText('search')
    return {
      input,
      ...utils,
    }
  }

  it('should render correctly', () => {
    setup()
    expect(screen.getByLabelText('search')).toBeInTheDocument()
  })

  it('should write on text input', () => {
    const value = 'deadpool'
    const { input } = setup()

    fireEvent.change(input, { target: { value } })
    expect(input.value).toBe(value)
  })

  it('should macth snapshot <TextInput />', async () => {
    const { input } = setup()
    expect(input).toMatchSnapshot()
  })
})