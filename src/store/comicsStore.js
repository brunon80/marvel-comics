import { createContext, useContext, useState } from 'react'

const ComicsContext = createContext()

const API_KEY = '07e3e205bebd46de31d15ee9a76d85c2'

async function fechComics(offset = 0) {
  const response = await fetch(`http://gateway.marvel.com/v1/public/comics?apikey=${API_KEY}&limit=15&offset=${offset}&orderBy=-focDate`)
  const json = await response.json()
  return json
}

function comicFactory(comic) {
  return ({
    id: comic?.id,
    title: comic?.title,
    year: new Date(comic?.dates?.[0]?.type?.date),
    image: `${comic.thumbnail?.path}.${comic.thumbnail?.extension}`
  })
}

function ComicsProvider({ children }) {
  const [comics, setComics] = useState([])
  const [offset, setOffset] = useState(0)

  async function getComics () {
    const { data } = await fechComics(offset)
    console.log(data)
    const parsedComics = data.results.map((comic) => comicFactory(comic))
    setComics(parsedComics)
  }
  
  const value = {
    comics,
    getComics
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