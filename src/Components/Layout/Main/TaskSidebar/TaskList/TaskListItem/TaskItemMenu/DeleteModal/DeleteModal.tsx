import ReactDOM from 'react-dom';
import styles from './delete-modal.module.css';
import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../../../../../../../../store/store';
import { deleteTask } from '../../../../../../../../store/tasks/tasksSlice';

interface IDeleteModalProps {
  id: string;
  onClose?: () => void;
}


export const DeleteModal = ({id, onClose}: IDeleteModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  
  const deleteHandler = (id: string) => {
    dispatch(deleteTask(id));
  }

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && ref.current === event.target) {
        onClose?.();
      }
    }
  
    document.addEventListener('click', handleClick);
  
    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, [onClose]);

  const node = document.getElementById('modal_root');
  if (!node) return null;

  return ReactDOM.createPortal((
    <div className={styles.modalWrapper} ref={ref} >
      <div className={styles.modal} >
        <button 
          className={styles.closeBtn}
          onClick={onClose}
        >
          <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.9115 13.8058L6.84406 18.9567L4.96166 17.0433L10.0291 11.8924L5.0675 6.84914L6.85992 5.02721L11.8215 10.0705L16.7673 5.04334L18.6497 6.95672L13.7039 11.9839L18.6655 17.0272L16.8731 18.8491L11.9115 13.8058Z" fill="#C4C4C4"/>
          </svg>
        </button>
        <h2 className={styles.modalTitle}>
          Удалить задачу?
        </h2>
        <button 
          className={styles.deleteBtn}
          onClick={()=> { deleteHandler(id) }}
        >
          Удалить
        </button>
        <button 
          className={styles.preventBtn}
          onClick={onClose}
        >
          Отмена
        </button>
      </div>
    </div>
  ), node);
}