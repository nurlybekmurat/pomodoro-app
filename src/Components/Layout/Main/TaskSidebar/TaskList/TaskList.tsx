import { TaskListItem } from './TaskListItem';
import styles from './tasklist.module.css';

interface ITask {
  title: string;
  id: string;
  taskTime: number;
  pomodorCount: number;
  isDone: boolean;
}

interface ITaskListProps {
  tasks: [];
}

export const TaskList = ({tasks}: ITaskListProps) => {
  return (
    <div className={styles.TaskListContainer}>
      <ul className={styles.TaskList}>
        {
          tasks.map((task: ITask, index) => (
            <TaskListItem task={ task } key={task.id} index={index} />
          ))
        }
      </ul>
      <span className={styles.taskTime}>
      </span>
    </div>
  )
}

