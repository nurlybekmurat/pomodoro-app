import { TaskFaq } from './TaskFaq';
import { TaskForm } from './TaskForm';
import styles from './tasksidebar.module.css';

export const TaskSidebar = () => {
  return (
    <div className={styles.TaskSidebar}>
      <TaskFaq />
      <TaskForm />
    </div>
  )
}