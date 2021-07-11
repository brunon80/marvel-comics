import { useEffect } from "react"
import styles from './Comics.module.scss'
import { Comic } from '../../molecules'
import { Wrapper } from '../../atoms'
import { useComics } from '../../store/comicsStore'

export default function ComicsList() {
  const {
    comics,
    getComics
  } = useComics()

  useEffect(() => {
    getComics()
  }, [])

  return (
    <section className={styles.container}>
      <Wrapper>
        <div className={styles.grid}>
          {
            comics?.map((comic, index) => (
              <Comic
                key={comic.id}
                title={comic.title}
                year={comic.date}
                image={comic.image}
              />
            ))
          }

        </div>
      </Wrapper>
    </section>
  )
}