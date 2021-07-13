import styles from './Comics.module.scss'
import { Comic } from '../../molecules'
import { Wrapper } from '../../atoms'
import { useComics } from '../../store/comicsStore'

export default function ComicsList() {
  const { comics, toggleFavorite, isFetching } = useComics()

  return (
    <section className={styles.container}>
      <Wrapper>
        {
          isFetching
            ? <div aria-label="loading" className={styles['loading-wrapper']}>
                <div className={styles['lds-dual-ring']} />
              </div>
            : <div className={styles.grid}>
              {
                comics?.map((comic, index) => (
                  <Comic
                    key={comic.id}
                    title={comic.title}
                    image={comic.image}
                    isFavorite={comic.isFavorite}
                    onToggleFavorite={() => toggleFavorite(index)}
                  />
                ))
              }
            </div>
        }
      </Wrapper>
    </section>
  )
}