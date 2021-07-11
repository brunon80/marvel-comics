import {
  Link
} from "react-router-dom"
import { Wrapper } from '../../atoms'
import styles from './Footer.module.scss'

export default function Footer() {
  return(
    <footer className={styles.footer}>
      <Wrapper>
        <div className={styles.container}>
          <Link className={styles.button} to="/">Previous Page</Link>
          <Link className={styles.button}  to="/">Next Page</Link>
        </div>
      </Wrapper>
    </footer>
  )
}