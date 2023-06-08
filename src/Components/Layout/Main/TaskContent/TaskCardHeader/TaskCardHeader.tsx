import styles from './taskcardheader.module.css';

interface ITaskName {
  task: {
    title: string;
  }
  pomodorCount: number;
  taskStatus: string;
}

export const TaskCardHeader = ({ task, pomodorCount, taskStatus }: ITaskName) => {
  const completedClass = taskStatus === "onWork" ? styles.onWork : taskStatus === "onPause" ? styles.onPause : "";

  return (
    <div className={`${styles.taskHeader} ${completedClass}`}>
      <span className={styles.taskTitle}>
        {task.title}
      </span>
      <span className={styles.taskCount}>
        Помидор {pomodorCount}
      </span>
    </div>
  )
}