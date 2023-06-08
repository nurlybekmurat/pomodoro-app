import { StatisticsHeader } from './StatisticsHeader';
import { StatisticsLayout } from './StatisticsLayout';
import styles from './statistics.module.css';

export const Statistics = () => {
  return (
    <main className={`${styles.statistics} container`}>
      <StatisticsHeader />
      <StatisticsLayout />
    </main>
  )
}