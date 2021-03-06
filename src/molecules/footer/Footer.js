import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import styles from './Footer.module.scss'
import { useComics } from '../../store/comicsStore'

export default function Footer() {
  const { page, isFetching } = useComics()
  let location = useLocation()

  if (isFetching) return null

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link
          className={styles.button}
          to={`${location.pathname}?page=${page ? page - 1 : 0}`}
        >Previous Page</Link>
        <Link
          className={styles.button}
          to={`${location.pathname}?page=${page + 1}`}>Next Page</Link>
      </div>
    </footer>
  )
}