import styles from './Comic.module.scss'

export default function Comic({ title, year, number, image, isFavorite = false }) {
  return (
    <div className={styles.comic}>
      <img className={styles.image} src={image} alt="comic-img" />
      <div className={isFavorite && styles.favorite} >
        <div className={isFavorite ? styles["heart-on"] : styles.heart} />
      </div>
      <div className={styles.overlay}>
        <div className={styles.info}>
          <p className={styles.caption}>{title}</p>
          <p className={styles.caption}>{year} {number}</p>
        </div>
      </div>
    </div>
  )
}