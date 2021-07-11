import styles from './Wrapper.module.scss'

export default function Wrapper({ children, ...props }) {
  return (
    <div {...props} className={styles.wrapper}>{children}</div>
  )
}