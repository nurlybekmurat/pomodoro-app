import { Fragment, useCallback, useEffect, useState } from 'react';
import { getSeconds } from '../../../../utils/utils'
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { updateTaskTimeSpent, updateTaskTime, updatePauseTimeSpent,  } from '../../../../store/tasks/tasksSlice';
import { TaskCardHeader } from './TaskCardHeader';
import styles from './taskcontent.module.css';
import { TaskCardTimer } from './TaskCardTimer';
import { TaskCardName } from './TaskCardName';
import { TaskCardButtons } from './TaskCardButtons';

export const TaskContent= () => {
  const dispatch = useAppDispatch();
  const tasksList = useAppSelector(state => state.task.tasksList);
  const tasksStatisticsList = useAppSelector(state => state.task.tasksStatisticsList);
  const [currentTask, setCurrentTask] = useState<any>({});
  const [timerPreview, setTimerPreview] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [pomodorCount, setPomodorCount] = useState(1);
  const [isCurrentTask, setIsCurrentTask] = useState(false);

  const setTask = useCallback(() => {
    if (tasksList.length > 0) {
      for (let i = 0; i < tasksList.length; i++) {
        if(tasksList[i].isDone === false) {
          setCurrentTask(tasksList[i]);
          setIsCurrentTask(true);
          break;
        }
      }
      setTimerPreview(`${Math.floor(currentTask.taskTime / 60)}:${getSeconds(currentTask.taskTime)}`);
    } else {
      setIsCurrentTask(false);
    }
  }, [tasksList, currentTask.taskTime]);

  useEffect(() => {
    setTask();
  }, [setTask, tasksList]);

  useEffect(() => {

    if (!isActive) return;

    const interval = setInterval(function() {
      dispatch(updateTaskTime({
        ...tasksList,
        id: currentTask.id
      }))
      dispatch(updateTaskTimeSpent({
        ...tasksStatisticsList
      }));
      if (currentTask.taskTime === 0) {
        clearInterval(interval);
        setPomodorCount(pomodorCount => pomodorCount + 1);
      };
    }, 1000);

    return () => clearInterval(interval);
  }, [tasksList, dispatch, isActive, timerPreview, currentTask, setTask, tasksStatisticsList, currentTask.taskTime ]);

  useEffect(() => {
    if(!isCurrentTask) return;
    const interval = setInterval(function() {
      if (currentTask.status === 'onPause') {
        dispatch(updatePauseTimeSpent({
          ...tasksStatisticsList,
          day: currentTask.day
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [tasksList, dispatch, tasksStatisticsList, currentTask.day, currentTask, isActive, currentTask.isDone, isCurrentTask ]);

  return (
    <Fragment>
      {isCurrentTask && 
        (
        <div className={styles.TaskContent}>
          <TaskCardHeader task={currentTask} pomodorCount={pomodorCount} taskStatus={currentTask.status} />
          <TaskCardTimer timerPreview={timerPreview} currentTaskId={currentTask.id} />
          <TaskCardName task={currentTask} pomodorCount={pomodorCount} />
          <TaskCardButtons 
            isActive={isActive} 
            setIsActive={setIsActive}
            currentTaskId={currentTask.id}
            taskStatus={currentTask.status}
            currentTaskDay={currentTask.day}
            setIsCurrentTask={setIsCurrentTask}
          />
        </div>
        )
      }
    </Fragment>
  )
}