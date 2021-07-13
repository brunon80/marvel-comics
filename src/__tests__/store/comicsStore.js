import { renderHook } from '@testing-library/react-hooks'
import { ComicsProvider, useComics } from '../../store/comicsStore'
import { COMICS } from '../../mocks/reponse.mock'

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(() => ({ })),
  useHistory: jest.fn(),
  useLocation: jest.fn(() => ({ search: '' }))
}))

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(COMICS),
  })
)

describe('Comics store tests', () => {
  it('should popute states at first render', async () => {
    const wrapper = ({ children }) => <ComicsProvider>{ children }</ComicsProvider>
    const { result, waitForNextUpdate } = renderHook(() => useComics(), { wrapper })
    await waitForNextUpdate()

    expect(result.current.isFetching).toBe(false)
    expect(Array.isArray(result.current.comics)).toBeTruthy()
    expect(result.current.comics.length).toBe(15)
    expect(result.current.page).toBe(0)
    expect(typeof result.current.getComicsCb).toBe('function')
    expect(typeof result.current.toggleFavorite).toBe('function')
  })
})