import { RefObject, useState } from 'react';
import { Dropdown } from '../../../../../../Dropdown';
import { MenuItemsList } from './MenuItemsList';
import styles from './taskItemMenu.module.css';
import { DeleteModal } from './DeleteModal';

interface ITaskProps {
  task : {
    id: string;
    title: string;
    taskTime: number;
    pomodorCount: number;
    isDone: boolean;
  },
  taskInput: RefObject<HTMLInputElement>
}

export const TaskListMenu = ({task, taskInput}: ITaskProps) => {
  const doneClass = task.isDone ? styles.taskDone : '';
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <div className={styles.taskMenu}>
      {isModalOpened && (
      <DeleteModal id={task.id} onClose={ () => { setIsModalOpened(false); }  } />
      )}
      <Dropdown
        isOpen={false}
        dropdownContentRootId={'dropdown_root'}
        button={
          <button
            onClick={(e: React.MouseEvent) => {
              const node = document.getElementById('dropdown_root');
              if (!node) return;
              node.style.position = 'absolute';
              node.style.top = `${e.pageY}px`;
              node.style.left = `${e.pageX}px`;
            }}
            className={`${styles.menuButton} ${doneClass}`}
          >
            <svg width="26" height="6" viewBox="0 0 26 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="3" cy="3" r="3" fill="#C4C4C4"/>
            <circle cx="13" cy="3" r="3" fill="#C4C4C4"/>
            <circle cx="23" cy="3" r="3" fill="#C4C4C4"/>
            </svg>
          </button>
        }
      >
        <div className={styles.dropdown}>
          { !task.isDone && (
              <MenuItemsList task={task} taskInput={taskInput} setIsModalOpened={setIsModalOpened} />
            )
          }
        </div>
      </Dropdown>
    </div>
  )
}