import styles from './statistics-logo.module.css';
import { ReactComponent as StatisticsIcon } from '../../../assets/img/statistics-icon.svg';

export const Statistics = () => {
  return (
    <div className={styles.StatisticsWrapper}>
      <StatisticsIcon className={styles.StatisticsIcon} />
      <span className={styles.StatisticsText}>
        Статистика
      </span>
    </div>
  )
}