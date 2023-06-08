import { updateTaskStatus, addStopCount, resetTaskTime, setTaskIsDone } from '../../../../../store/tasks/tasksSlice';
import styles from './taskcardbuttons.module.css';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';

interface IButtonsProps {
  isActive: boolean;
  setIsActive: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  setIsCurrentTask: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  taskStatus: string;
  currentTaskId: string; 
  currentTaskDay: string; 
}

export const TaskCardButtons = ( {
  isActive, setIsActive, taskStatus, currentTaskId, currentTaskDay, setIsCurrentTask
  } : IButtonsProps) => {
  const disabledClass = !isActive && taskStatus !== 'onPause' ? styles.isDisabled : '';
  const dispatch = useAppDispatch();
  const tasksList = useAppSelector(state => state.task.tasksList);
  const tasksStatisticsList = useAppSelector(state => state.task.tasksStatisticsList);

  function buttonHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>,) {
    if (!(event.target instanceof HTMLElement)) return;

    event.target.textContent === "Пауза" ? setIsActive(false) : 
    event.target.textContent === "Старт" ? setIsActive(true) : 
    event.target.textContent === "Продолжить" ? setIsActive(true) : setIsActive(false)

    if (event.target.textContent === "Пауза") {
      dispatch(updateTaskStatus({        
        ...tasksList,
        task: {
          id: currentTaskId,
          status: 'onPause'
        }
      }));
    } else if (event.target.textContent === "Старт" || event.target.textContent === "Продолжить") {
      dispatch(updateTaskStatus({        
        ...tasksList,
        task: {
          id: currentTaskId,
          status: 'onWork'
        }
      }));
    }
  }

  const stopHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>,) => {
    if (!(event.target instanceof HTMLElement)) return;
    if (event.target.textContent === "Сделано") {
      setIsCurrentTask(false);
      setIsActive(false);
      dispatch(setTaskIsDone({
        ...tasksList,
        currentTaskId  
      }))
    }
    if (event.target.textContent === "Стоп") {
      setIsActive(false);
      dispatch(addStopCount({        
        ...tasksStatisticsList,
        task: {
          day: currentTaskDay,
        }
      }));
      dispatch(resetTaskTime({
        ...tasksList,
        currentTaskId    
      }))
    } 
  }

  return (
    <div className={styles.buttonsContainer}>
      <button
        className={`${styles.btn} ${styles.btnPrimary}`}
        onClick={buttonHandler}
      >
        { taskStatus === '' ? 'Старт' : taskStatus === 'onPause' ? 'Продолжить' : taskStatus === 'onWork' ? 'Пауза' : '' }
      </button>
      <button
        className={`${styles.btn} ${styles.btnSecondary} ${disabledClass}`}
        onClick={stopHandler}
        disabled={!isActive && taskStatus !== 'onPause' ? true : false}
      >
        {taskStatus === 'onPause' ? 'Сделано' : 'Стоп'}
      </button>
    </div>
  )
}