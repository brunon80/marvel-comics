import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  useCallback 
} from 'react'
import { useLocation, useParams } from "react-router-dom"
import { DEFAULT_PAGE_SIZE, START_PAGE } from '../constants'
import { fechComics, searchCharacterByName } from '../services/marvelServices'
import { comicFactory } from '../factory'

const ComicsContext = createContext()

function ComicsProvider({ children }) {
  let location = useLocation()
  let { character } = useParams()

  const query = new URLSearchParams(location.search)
  const parsedPage = parseInt(query.get('page'), 10)
  const page = isNaN(parsedPage) ? START_PAGE : parsedPage

  const [comics, setComics] = useState([])
  const [isFetching, setIsFetching] = useState(true)

  const getComicsCb = useCallback(async (characterIds) => {
    const { data } = await fechComics(page * DEFAULT_PAGE_SIZE, characterIds)
    const parsedComics = data?.results?.map((comic) => comicFactory(comic))
    setComics(parsedComics)
  }, [page])

  const getCharactersByName = useCallback(async (name) => {
    const { data } = await searchCharacterByName(name)
    const characterIdList = data?.results?.reduce((acc, curr) => acc ? `${acc},${curr?.id}` : `${curr?.id}` ,'')
    return characterIdList
  }, [])

  const updateCharacterList = useCallback(async () => {
    setIsFetching(true)
    if (character) {
      const characterIds = await getCharactersByName(character)
      if (characterIds) await getComicsCb(characterIds)
      else alert('No comics found to that character')
    } else {
      await getComicsCb()
    }
    setIsFetching(false)
  }, [character, getCharactersByName, getComicsCb])


  useEffect(() => {
    updateCharacterList()
  }, [updateCharacterList])


  function toggleFavorite(comicIndex) {
    const comicsCopy = [...comics]
    comicsCopy[comicIndex].isFavorite = !comicsCopy[comicIndex].isFavorite
    setComics(comicsCopy)
  }
  
  const value = {
    isFetching,
    comics,
    page,
    getComicsCb,
    toggleFavorite,
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