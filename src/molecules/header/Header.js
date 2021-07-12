import { Link, useParams } from "react-router-dom"
import MarvelLogo from '../../assets/marvel_logo.png'
import styles from './Header.module.scss'
import { TextInput } from '../../atoms'
import { useSearchCharacter } from '../../hooks'

export default function Header() {
  const { onSubmit } = useSearchCharacter()
  let { character } = useParams()

  return (
    <header className={styles.container}>
      <Link to="/">
        <img className={styles.logo} src={MarvelLogo} alt="marve-logo" />
      </Link>
      <form className={styles.form} onSubmit={onSubmit}>
        <TextInput
          defaultValue={character}
          className={styles.search}
          placeholder="Type to search a comic character and hit enter"
          name="search"
          id="search-char"
        />
      </form>
    </header>
  )
}