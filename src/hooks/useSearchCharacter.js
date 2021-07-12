import { useHistory } from "react-router-dom"

export default function useSearchCharacter() {
  let history = useHistory()

  function onSubmit(event) {
    event.preventDefault()
    const character = event.target.search.value
    history.push(`/${character}`)
  }

  return {
    onSubmit
  }
}