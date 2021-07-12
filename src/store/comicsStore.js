import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  useCallback 
} from 'react'
import { useLocation } from "react-router-dom"

const ComicsContext = createContext()

const API_KEY = '07e3e205bebd46de31d15ee9a76d85c2'
const DEFAULT_PAGE_SIZE = 15

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

function comicFactory(comic) {
  return ({
    id: comic?.id,
    title: comic?.title,
    image: `${comic.thumbnail?.path}.${comic?.thumbnail?.extension}`
  })
}

function ComicsProvider({ children }) {
  let location = useLocation()
  const query = new URLSearchParams(location.search)
  const parsedPage = parseInt(query.get('page'), 10)
  const currentPage = isNaN(parsedPage) ? 0 : parsedPage

  const [comics, setComics] = useState([])
  const [page, setPage] = useState(currentPage)

  const getComicsCb = useCallback(async () => {
    const { data } = await fechComics(page * DEFAULT_PAGE_SIZE)
    const parsedComics = data.results.map((comic) => comicFactory(comic))
    setComics(parsedComics)
  }, [page])

  useEffect(() => {
    updatePage(currentPage)
  }, [currentPage])

  useEffect(() => {
    getComicsCb()
  }, [page, getComicsCb])

  function updatePage(page) {
    setPage(page)
  }
  
  const value = {
    comics,
    page,
    getComicsCb,
    updatePage
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