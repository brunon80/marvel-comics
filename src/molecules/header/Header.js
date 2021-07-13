import { Link, useParams } from "react-router-dom"
import MarvelLogo from '../../assets/marvel_logo.png'
import styles from './Header.module.scss'
import { TextInput } from '../../atoms'
import { useSearchCharacter } from '../../hooks'

export default function Header() {
  const { onSubmit, searchInput } = useSearchCharacter()
  let { character } = useParams()

  return (
    <header className={styles.container}>
      <Link to="/">
        <img className={styles.logo} src={MarvelLogo} alt="marve-logo" />
      </Link>
      <form className={styles.form} onSubmit={onSubmit}>
        <TextInput
          ref={searchInput}
          defaultValue={character}
          className={styles.search}
          placeholder="Type to search comics by character name and hit enter"
          name="search"
          id="search-char"
        />
      </form>
    </header>
  )
}