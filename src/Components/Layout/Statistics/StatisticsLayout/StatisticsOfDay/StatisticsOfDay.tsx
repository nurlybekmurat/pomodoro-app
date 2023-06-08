import styles from './statistics-of-day.module.css';

interface IstatisticsListProps {
  statsOfDay: string,
  currentDay: string
}

export const StatisticsOfDay = ({ statsOfDay, currentDay } : IstatisticsListProps) => {

  return (
    <div className={styles.stats}>
      <h2 className={styles.day}>
        { currentDay.split(',')[0] }
      </h2>
      {statsOfDay ? (
        <p className={styles.statsText}>
          Вы работали над задачами в течение 
          <span className={styles.statsTime}> { statsOfDay }</span> 
        </p>
      ) : (
        <p className={styles.statsText}>
          Нет данных
        </p>
      )
      }
    </div>
  )
}