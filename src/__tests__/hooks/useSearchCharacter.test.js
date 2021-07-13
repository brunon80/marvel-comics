import { useSearchCharacter } from '../../hooks'
import { renderHook } from '@testing-library/react-hooks'

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(() => ({ character: 'deadpool' })),
  useHistory: jest.fn()
}))

describe('useSearchCharacter hook tests', () => {
  it('should use search character', () => {
    const { result } = renderHook(() => useSearchCharacter())
    expect(result.current.searchInput.current).toBe(null)
    expect(typeof result.current.onSubmit).toBe('function')
  })
})