import styles from './Comic.module.scss'

export default function Comic({ title, image, isFavorite = false, onToggleFavorite }) {
  return (
    <div aria-label="comic" className={styles.comic}>
      <img aria-label="comic-image" className={styles.image} src={image} alt="comic-img" />
      <div aria-label="comic-favorite" onClick={onToggleFavorite} className={isFavorite ? styles.favorite : undefined} >
        <div className={isFavorite ? styles["heart-on"] : styles.heart} />
      </div>
      <div className={styles.overlay}>
        <div className={styles.info}>
          <p aria-label="comic-title" className={styles.caption}>{title}</p>
        </div>
      </div>
    </div>
  )
}