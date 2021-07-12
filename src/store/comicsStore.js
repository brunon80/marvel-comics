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

async function fechComics(offset = 0) {
  const response = await fetch(`http://gateway.marvel.com/v1/public/comics?apikey=${API_KEY}&limit=15&offset=${offset}&orderBy=-focDate`)
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