import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { Wrapper } from '../../atoms'
import styles from './Footer.module.scss'
import { useComics } from '../../store/comicsStore'

export default function Footer() {
  const { page } = useComics()
  let location = useLocation()

  return (
    <footer className={styles.footer}>
      <Wrapper>
        <div className={styles.container}>
          <Link
            className={styles.button}
            to={`${location.pathname}?page=${page ? page - 1 : 0}`}
          >Previous Page</Link>
          <Link
            className={styles.button}
            to={`${location.pathname}?page=${page + 1}`}>Next Page</Link>
        </div>
      </Wrapper>
    </footer>
  )
}