import { Formik, Field, Form  } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import styles from './taskform.module.css';
import { TaskList } from '../TaskList';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { addTask, addTasksStatistic } from '../../../../../store/tasks/tasksSlice';

interface MyFormValues {
  text: string;
  id: string;
  taskTime: number;
  pomodorCount: number;
}

interface Itask {
  day: string;
}

interface IInput {
  length: number;
}

export const TaskForm = () => {
  const tasksList = useAppSelector(state => state.task.tasksList);
  const tasksStatisticsList = useAppSelector(state => state.task.tasksStatisticsList);
  const tasksTotalTime = tasksList.reduce((currSum: number, currTaskTime: MyFormValues) => {
    return currSum + 1500 * currTaskTime.pomodorCount
  },0);
  const tasksTotalTimeFormatted = `${Math.floor(tasksTotalTime / 60)} мин ${tasksTotalTime % 60} c`;
  const initialValues: MyFormValues = { text: '', id: '', taskTime: 1500, pomodorCount: 1 };
  const dispatch = useAppDispatch();

  function validateTask(values: IInput) {
    let error;
    if (values.length < 3) {
      error = 'Введите более 3-х символов';
    }
    return error;
  }

  return (
    <>
      <Formik
        initialValues={ initialValues }
        onSubmit={(values, actions) => {
          dispatch(addTask({
            id: uuidv4(),
            title: values.text,
            isDone: false,
            status: '',
            pomodorCount: 1,
            taskTime: 1500,
            day: new Date().toLocaleDateString('ru-RU', {day: 'numeric', month: 'numeric', weekday: 'long'}),
        }));
        if(tasksStatisticsList.length === 0) {
          dispatch(addTasksStatistic({
            day: new Date().toLocaleDateString('ru-RU', {day: 'numeric', month: 'numeric', weekday: 'long'}),
            taskTimeSpent: 0,
            taskOnPauseTime: 0,
            taskFocusTime: 0,
            taskStops: 0,
            timeOnPause: 0,
            numberOfPomodoros: 0,
          }))
        }
        tasksStatisticsList.forEach((task :Itask) => {
          if(task.day !== new Date().toLocaleDateString('ru-RU', {day: 'numeric', month: 'numeric', weekday: 'long'})) {
            dispatch(addTasksStatistic({
              day: new Date().toLocaleDateString('ru-RU', {day: 'numeric', month: 'numeric', weekday: 'long'}),
              taskTimeSpent: 0,
              taskOnPauseTime: 0,
              taskFocusTime: 0,
              taskStops: 0,
              timeOnPause: 0,
              numberOfPomodoros: 0,
            }))
          }
        });
          actions.setSubmitting(false);
          actions.resetForm();
        }}
      >
        {({
          values, errors, touched
        })=> (
          <Form className={styles.form}>
          <Field 
            validate={validateTask}
            value={values.text}
            className={styles.input} 
            name="text" type="text" 
            placeholder="Название задачи"
            required
          />
          {errors.text && touched.text && <div className={styles.inputError}>{errors.text}</div>}
          <button
              type="submit"
              className={styles.button}
            >
              Добавить
          </button>
        </Form>
        )}
      </Formik>
      <TaskList tasks={tasksList} />
      <span className={styles.taskTotalTime}>
          { tasksTotalTimeFormatted }
      </span>
    </>
  );
};

