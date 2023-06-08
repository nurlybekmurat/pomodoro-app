import { useRef, useState } from 'react';
import { TaskListMenu } from './TaskItemMenu';
import { useAppDispatch } from '../../../../../../store/store';
import styles from './tasklistitem.module.css';
import { updateTask } from '../../../../../../store/tasks/tasksSlice';

interface ITaskProps {
  index : number;
  task : {
    title: string;
    id: string;
    taskTime: number;
    pomodorCount: number;
    isDone: boolean;
  }
}

export const TaskListItem = ({ task, index }: ITaskProps) => {
  const taskInput = useRef<HTMLInputElement>(null);
  const [value, setInputValue] = useState(task.title);
  const dispatch = useAppDispatch();
  const doneClass = task.isDone ? styles.taskDone : '';

  const handleInputBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (task.title !== event.target.value) {
      dispatch(updateTask({
        ...task,
        title: event.target.value
      }));
    }
  };

  return (
    <li className={styles.TaskListItem}>
      <span className={styles.listIndex}>
        {index + 1}
      </span>
      <input 
        className={`${styles.TaskItemInput} ${doneClass}`} 
        type="text" 
        value={value} 
        ref={taskInput}
        onChange={(e) => {setInputValue(e.target.value)}}
        onBlur={handleInputBlur}
      />
      <TaskListMenu task={task} taskInput={taskInput} />
    </li>
  )
}