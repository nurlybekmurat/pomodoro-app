import styles from './taskcardname.module.css';

interface ITaskName {
  task: {
    title: string;
  }
  pomodorCount: number;
}

export const TaskCardName = ({ task, pomodorCount } : ITaskName) => {
  return (
    <div className={styles.tasNameContainer}>
      <span className={styles.taskNumber}>
      Задача {pomodorCount} -&nbsp;
      </span>
      <span className={styles.taskName}>
        {task.title}
      </span>
    </div>
  )
}