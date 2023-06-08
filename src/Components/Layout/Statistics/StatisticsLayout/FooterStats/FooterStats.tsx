import { getMinuteFromSeconds } from '../../../../../utils/utils';
import styles from './footer-stats.module.css';

interface IFooterStatsProps {
  pauseTime: number;
  taskStops: number;
  focusTime: number;
}

export const FooterStats = ({pauseTime, taskStops, focusTime}: IFooterStatsProps) => {
  const activeClass = focusTime > 0 ? 'active' : '';
  
  return (
    <div className={styles.statsWrapper}>
      <div className={`${styles.statsItem} focus ${activeClass}`}>
        <div className={styles.statsInfo}>
          <h3 className={styles.statsTitle}>
            Фокус
          </h3>
          <p className={styles.statsText}>
           { focusTime === 0 ? '0' : Math.round((focusTime / (pauseTime + focusTime) * 100)) }%
          </p>
        </div>
        <svg className={`${styles.statsIcon} focus-icon ${activeClass}`} width="115" height="115" viewBox="0 0 115 115" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M57.3158 111.632C87.3136 111.632 111.632 87.3136 111.632 57.3158C111.632 27.318 87.3136 3 57.3158 3C27.318 3 3 27.318 3 57.3158C3 87.3136 27.318 111.632 57.3158 111.632Z" stroke="#C4C4C4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M57.5 95C78.2107 95 95 78.2107 95 57.5C95 36.7893 78.2107 20 57.5 20C36.7893 20 20 36.7893 20 57.5C20 78.2107 36.7893 95 57.5 95Z" stroke="#C4C4C4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M57.5 78C68.8218 78 78 68.8218 78 57.5C78 46.1782 68.8218 37 57.5 37C46.1782 37 37 46.1782 37 57.5C37 68.8218 46.1782 78 57.5 78Z" stroke="#C4C4C4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className={`${styles.statsItem} pause ${activeClass}`}>
        <div className={styles.statsInfo}>
          <h3 className={styles.statsTitle}>
            Время на паузе
          </h3>
          <p className={styles.statsText}>
            { getMinuteFromSeconds(pauseTime) }
          </p>
        </div>
        <svg className={`${styles.statsIcon} pause-icon ${activeClass}`} width="115" height="115" viewBox="0 0 115 115" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M57.3158 111.632C87.3136 111.632 111.632 87.3136 111.632 57.3158C111.632 27.318 87.3136 3 57.3158 3C27.318 3 3 27.318 3 57.3158C3 87.3136 27.318 111.632 57.3158 111.632Z" stroke="#C4C4C4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M57.3154 30.1579V57.3158L70.8944 70.8947" stroke="#C4C4C4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className={`${styles.statsItem} stops ${activeClass}`}>
        <div className={styles.statsInfo}>
          <h3 className={styles.statsTitle}>
            Остановки
          </h3>
          <p className={styles.statsText}>
            { taskStops }
          </p>
        </div>
        <svg className={`${styles.statsIcon} stops-icon ${activeClass}`} width="115" height="115" viewBox="0 0 115 115" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M57.3158 111.632C87.3136 111.632 111.632 87.3136 111.632 57.3158C111.632 27.318 87.3136 3 57.3158 3C27.318 3 3 27.318 3 57.3158C3 87.3136 27.318 111.632 57.3158 111.632Z" stroke="#C4C4C4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 20L95 94" stroke="#C4C4C4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}