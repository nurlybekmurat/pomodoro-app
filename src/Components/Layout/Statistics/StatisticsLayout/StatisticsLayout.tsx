import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { StatisticsOfDay } from './StatisticsOfDay';
import { StatisticsPomodors } from './StatisticsPomodors';
import { getStats, getTimeFromSeconds,  } from '../../../../utils/utils';
import styles from './statistics-layout.module.css';
import { Fragment, useEffect, useState,  } from 'react';
import { StatisticsChart } from './StatisticsChart';
import { setStats } from '../../../../store/period/periodSlice';
import { FooterStats } from './FooterStats';

interface IstatisticsListProps {
  day: string
  taskTimeSpent: number;
  numberOfPomodoros: number;
  taskOnPauseTime: number;
  taskStops: number;
}

export const StatisticsLayout = () => {
  const currentDayNumeric = new Date().toLocaleDateString('ru-RU', {day: 'numeric', month: 'numeric', weekday: 'long'});
  const [currentDay, setCurrentDay] = useState(currentDayNumeric);
  const periodWeek = useAppSelector(state => state.period.periodList.periodWeek);
  const periodStats = useAppSelector(state => state.period.periodStats);
  const [statsOfDay, setStatsOfDay] = useState('');
  const [pomodorCount, setPomodorCount] = useState(0);
  const [focusTime, setFocusTime] = useState(0);
  const [pauseTime, setPauseTime] = useState(0);
  const [taskStops, setTaskStops] = useState(0);

  const statisticsList = useAppSelector(state => state.task.tasksStatisticsList);
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(setStats({
      ...periodStats,
      stats: getStats(periodWeek, statisticsList),
    }));
  }, [periodWeek]);

  useEffect(() => {
    statisticsList.forEach((item : IstatisticsListProps) => {
      if (item.day === currentDay) {
        setStatsOfDay(getTimeFromSeconds(item.taskTimeSpent));
        setPomodorCount(item.numberOfPomodoros);
        setFocusTime(item.taskTimeSpent);
        setPauseTime(item.taskOnPauseTime);
        setTaskStops(item.taskStops);
      }
    });
  }, [statisticsList, currentDay]);

  return (
    <Fragment>
      <div className={styles.StatisticsLayout}>
        <div className={styles.StatisticsSideBar}>
          <StatisticsOfDay 
            statsOfDay={statsOfDay}
            currentDay={currentDay}
          />
          <StatisticsPomodors pomodorCount={pomodorCount} />
        </div>
        <StatisticsChart 
          statisticsList={statisticsList}
          labels={periodWeek}
          dataList={periodStats}
          setCurrentDay={setCurrentDay}
        />
      </div>
      <FooterStats 
        pauseTime={pauseTime} 
        taskStops={taskStops}
        focusTime={focusTime}
      />
    </Fragment>
  )
}