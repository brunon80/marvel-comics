import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  useCallback 
} from 'react'
import { useLocation, useParams } from "react-router-dom"

const ComicsContext = createContext()

const API_KEY = '07e3e205bebd46de31d15ee9a76d85c2'
const DEFAULT_PAGE_SIZE = 15
const START_PAGE = 0

function urlBuilder(url, params) {
  if(!params) return url
  const query = new URLSearchParams(params).toString()
  return `${url}?${query}`
}

async function fechComics(offset = 0, characters) {
  const baseUrl = 'http://gateway.marvel.com/v1/public/comics'
  const params = {
    apikey: API_KEY,
    limit: DEFAULT_PAGE_SIZE,
    offset,
    orderBy: '-focDate'
  }
  if(characters) params.characters = characters

  const url = urlBuilder(baseUrl, params)
  const response = await fetch(url)
  const json = await response.json()
  return json
}

async function seachCharacterByName(name) {
  const baseUrl = 'http://gateway.marvel.com/v1/public/characters'
  const params = { 
    name,
    apikey: API_KEY,
  }
  const url = urlBuilder(baseUrl, params)
  const response = await fetch(url)
  const json = await response.json()
  return json
}

function comicFactory(comic) {
  return ({
    id: comic?.id,
    title: comic?.title,
    image: `${comic.thumbnail?.path}.${comic?.thumbnail?.extension}`,
    isFavorite: false
  })
}

function ComicsProvider({ children }) {
  let location = useLocation()
  let { character } = useParams()

  const query = new URLSearchParams(location.search)
  const parsedPage = parseInt(query.get('page'), 10)
  const currentPage = isNaN(parsedPage) ? START_PAGE : parsedPage

  const [comics, setComics] = useState([])
  const [page, setPage] = useState(currentPage)

  const getComicsCb = useCallback(async (characterIds) => {
    const { data } = await fechComics(page * DEFAULT_PAGE_SIZE, characterIds)
    const parsedComics = data.results.map((comic) => comicFactory(comic))
    setComics(parsedComics)
  }, [page])

  const getCharacterByName = useCallback(async (name) => {
    const { data } = await seachCharacterByName(name)
    const characterIdList = data?.results?.reduce((acc, curr) => acc ? `${acc},${curr?.id}` : `${curr?.id}` ,'')
    return characterIdList
  }, [])

  const updateCharacterList = useCallback(async () => {
    if (character) {
      const characterIds = await getCharacterByName(character)
      getComicsCb(characterIds)
    } else {
      getComicsCb()
    }
  }, [character, getCharacterByName, getComicsCb])

  useEffect(() => {
    updatePage(currentPage)
  }, [currentPage])

  useEffect(() => {
    updateCharacterList()
  }, [updateCharacterList])

  function updatePage(page) {
    setPage(page)
  }

  function toggleFavorite(comicIndex) {
    const comicsCopy = [...comics]
    comicsCopy[comicIndex].isFavorite = !comicsCopy[comicIndex].isFavorite
    setComics(comicsCopy)
  }
  
  const value = {
    comics,
    page,
    getComicsCb,
    toggleFavorite
  }
  return <ComicsContext.Provider value={value}>{children}</ComicsContext.Provider>
}

function useComics() {
  const context = useContext(ComicsContext)
  if (context === undefined) {
    throw new Error('useComics must be used within a ComicsProvider')
  }
  return context
}

export {
  ComicsProvider,
  useComics
}