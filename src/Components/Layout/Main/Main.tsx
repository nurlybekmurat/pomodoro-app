import styles from './main.module.css';
import { TaskSidebar } from './TaskSidebar';
import { TaskContent } from './TaskContent';

export const Main = () => {
  return (
    <div className="container">
      <main className={styles.main}>
        <TaskSidebar />
        <TaskContent />
      </main>
    </div>
  )
}