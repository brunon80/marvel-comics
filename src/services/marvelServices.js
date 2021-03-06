import { BASE_URL, API_KEY, DEFAULT_PAGE_SIZE } from '../constants'
import { urlBuilder, fetcher } from '../utils'

export async function fetchComics(offset = 0, characters) {
  const comicsUrl = `${BASE_URL}/comics`
  const params = {
    apikey: API_KEY,
    limit: DEFAULT_PAGE_SIZE,
    offset,
    orderBy: '-focDate'
  }
  if(characters) params.characters = characters

  const url = urlBuilder(comicsUrl, params)
  return fetcher({ url })
}

export async function searchCharacterByName(name) {
  const charactersUrl = `${BASE_URL}/characters`
  const params = { 
    nameStartsWith: name,
    apikey: API_KEY,
  }
  const url = urlBuilder(charactersUrl, params)
  return fetcher({ url })
}