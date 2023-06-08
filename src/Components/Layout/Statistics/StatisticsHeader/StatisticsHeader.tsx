import { Period } from './Period';
import styles from './statistics-header.module.css';

export const StatisticsHeader = () => {
  return (
    <div className={styles.header}>
      <h2 className={`title ${styles.title}`}>
        Ваша активность
      </h2>
      <Period />
    </div>
  )
}