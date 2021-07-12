import { useRef, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"

export default function useSearchCharacter() {
  let history = useHistory()
  const searchInput = useRef(null)
  const { character } = useParams()

  useEffect(() => {
    if (!character) searchInput.current.value = ''
  }, [character])

  function onSubmit(event) {
    event.preventDefault()
    const character = event.target.search.value
    history.push(`/${character}`)
  }

  return {
    onSubmit,
    searchInput
  }
}