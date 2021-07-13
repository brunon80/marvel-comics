import { fetchComics, searchCharacterByName } from '../../services/marvelServices'
import { comicFactory } from '../../factory'
import { DEFAULT_PAGE_SIZE } from '../../constants'

describe('Marvel Services Tests', () => {
  let comics = []
  let comic = {}
  beforeAll(async () => {
    const { data } = await fetchComics()
    comics = data?.results
    comic = comics[0]
  })

  it('should have the right page size', () => {
    expect(comics.length).toBe(DEFAULT_PAGE_SIZE)
  })

  it('should have the right properties', () => {
    expect(comic).toHaveProperty('id')
    expect(comic).toHaveProperty('title')
    expect(comic).toHaveProperty('thumbnail.path')
    expect(comic).toHaveProperty('thumbnail.extension')
  })

  it('should create a comic', () => {
    const parsedComic = comicFactory(comic)
    expect(parsedComic).toHaveProperty('id')
    expect(parsedComic).toHaveProperty('title')
    expect(parsedComic).toHaveProperty('image')
    expect(parsedComic).toHaveProperty('isFavorite', false)
  })

  it('should get characters by name', async () => {
    const name = 'deadpool'
    const { data } = await searchCharacterByName(name)
    expect(data.results.length).toBeGreaterThan(0)
    data.results.forEach(character => {
      expect(character.name.toLowerCase().includes(name)).toBeTruthy()
    })
  })
})