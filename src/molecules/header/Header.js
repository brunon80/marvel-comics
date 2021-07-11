import MarvelLogo from '../../assets/marvel_logo.png'
import styles from './Header.module.scss'
import { TextInput } from '../../atoms'

export default function Header() {
  return(
    <header className={styles.container}>
      <img className={styles.logo} src={MarvelLogo} alt="marve-logo" />
      <TextInput className={styles.search} placeholder="Type to search a character" name="search" id="search-char" />
    </header>
  )
}