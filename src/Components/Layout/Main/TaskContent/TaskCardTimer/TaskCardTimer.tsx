import { useAppDispatch } from '../../../../../store/store';
import { increaseTaskTime } from '../../../../../store/tasks/tasksSlice';

import styles from './taskcardtimer.module.css';

interface ITimerProps {
  timerPreview: string;
  currentTaskId: string;
}

export const TaskCardTimer = ({timerPreview, currentTaskId} : ITimerProps) => {
  const dispatch = useAppDispatch();
  const increaseTaskTimeHandler = () => {
    dispatch(increaseTaskTime(currentTaskId));
  }

  return (
    <div className={styles.timerContainer}>
      <span className={styles.timer}>
        {timerPreview}
      </span>
      <button 
        className={styles.timerBtn}
        onClick={()=> increaseTaskTimeHandler()}
      >
        <svg className={styles.timerIcon} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="25" fill="#C4C4C4"/>
          <path d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z" fill="white"/>
        </svg>
      </button>
    </div>
  )
}