import { createSlice } from "@reduxjs/toolkit";

interface ITask {
  id: string;
  isDone: boolean;
  title: string;
  taskTime: number;
  pomodorCount:number;
  status: string;
}

interface ITaskStatistics {
  day: string;
  taskTimeSpent: number;
  taskStops: number;
  taskOnPauseTime: number;
}
// Function for Init TodoList in Local-Storage
function getTasksListfromLocalStorage()
{
  const localStorageTask = window.localStorage.getItem('tasksList');
  if(localStorageTask) return JSON.parse(localStorageTask);
  window.localStorage.setItem('tasksList',JSON.stringify([]));
  return []
}

function getTasksStatisticsListfromLocalStorage()
{
  const localStorageTaskStatistics = window.localStorage.getItem('tasksStatisticsList');
  if(localStorageTaskStatistics) return JSON.parse(localStorageTaskStatistics);
  window.localStorage.setItem('tasksStatisticsList',JSON.stringify([]));
  return []
}

// initialState as Default Value in Toolkit(slice)
const initialState = {
  tasksList: getTasksListfromLocalStorage(),
  tasksStatisticsList: getTasksStatisticsListfromLocalStorage()
};

export const tasksSlice = createSlice({
  name:'task',
  initialState,
  reducers:{
    addTask: (state,action) => 
    {
      state.tasksList.push(action.payload);
      const tasksList = window.localStorage.getItem('tasksList');
      if(tasksList)
      {
        const tasksListArr = JSON.parse(tasksList);
        tasksListArr.push({...action.payload});  
        window.localStorage.setItem('tasksList',JSON.stringify(tasksListArr));
      }
      else {
        window.localStorage.setItem(
            'tasksList',
            JSON.stringify([
              {
                ...action.payload,
              },
            ])
          );
        }
    },
    addTasksStatistic: (state,action) => 
    {
      state.tasksStatisticsList.push(action.payload);
      const tasksListStatistics = window.localStorage.getItem('tasksStatisticsList');
      if(tasksListStatistics)
      {
        const tasksStatisticListArr = JSON.parse(tasksListStatistics);
        tasksStatisticListArr.push({...action.payload});  
        window.localStorage.setItem('tasksStatisticsList',JSON.stringify(tasksStatisticListArr));
      }
      else {
        window.localStorage.setItem(
            'tasksStatisticsList',
            JSON.stringify([
              {
                ...action.payload,
              },
            ])
          );
        }
    },
    deleteTask: (state, action) => {
      const tasksList = window.localStorage.getItem('tasksList');
      if (tasksList) {
        const tasksListArr = JSON.parse(tasksList);
        tasksListArr.forEach((task:ITask, idx: number) => {
          if (task.id === action.payload) {
            tasksListArr.splice(idx, 1);
          }
        });
        window.localStorage.setItem('tasksList', JSON.stringify(tasksListArr));
        state.tasksList = tasksListArr;
      }
    },
    clearTasksList:(state) => 
    {
      state.tasksList = [];
      window.localStorage.removeItem('tasksList');
      
    },
    updateTask: (state, action) => {
      const tasksList = window.localStorage.getItem('tasksList');
      if (tasksList) {
        const tasksListArr = JSON.parse(tasksList);
        tasksListArr.forEach((task: ITask) => {
          if (task.id === action.payload.id) {
            task.title = action.payload.title;
          }
        });
        window.localStorage.setItem('tasksList', JSON.stringify(tasksListArr));
        state.tasksList = [...tasksListArr];
      }
    },
    updateTaskTime: (state, action) => {
      const tasksList = window.localStorage.getItem('tasksList');
      if (tasksList) {
        const tasksListArr = JSON.parse(tasksList);
        tasksListArr.forEach((task: ITask) => {
          if (task.id === action.payload.id) {
            task.taskTime--;
          }
        });
        window.localStorage.setItem('tasksList', JSON.stringify(tasksListArr));
        state.tasksList = [...tasksListArr];
      }
    },
    updateTaskStatus: (state, action) => {
      const tasksList = window.localStorage.getItem('tasksList');
      if (tasksList) {
        const tasksListArr = JSON.parse(tasksList);
        tasksListArr.forEach((task: ITask) => {
          if (task.id === action.payload.task.id) {
            task.status = action.payload.task.status;
          }
        });
        window.localStorage.setItem('tasksList', JSON.stringify(tasksListArr));
        state.tasksList = [...tasksListArr];
      }
    },
    updateTaskTimeSpent: (state, action) => {
      const tasksStatisticsList = window.localStorage.getItem('tasksStatisticsList');
      if (tasksStatisticsList) {
        const tasksStatisticsListArr = JSON.parse(tasksStatisticsList);
        tasksStatisticsListArr.forEach((task: ITaskStatistics) => {
          for (let item in action.payload) {
            if (task.day === action.payload[item].day) {
              task.taskTimeSpent++;
            }
          }
        });
        window.localStorage.setItem('tasksStatisticsList', JSON.stringify(tasksStatisticsListArr));
        state.tasksStatisticsList = [...tasksStatisticsListArr];
      }
    },
    addStopCount: (state, action) => {
      const tasksStatisticsList = window.localStorage.getItem('tasksStatisticsList');
      if (tasksStatisticsList) {
        const tasksStatisticsListArr = JSON.parse(tasksStatisticsList);
        tasksStatisticsListArr.forEach((task: ITaskStatistics) => {
          if (task.day === action.payload.task.day) {
            task.taskStops++;
          }
        });
        window.localStorage.setItem('tasksStatisticsList', JSON.stringify(tasksStatisticsListArr));
        state.tasksStatisticsList = [...tasksStatisticsListArr];
      }
    },
    increaseTaskTime: (state, action) => {
      const tasksList = window.localStorage.getItem('tasksList');
      if (tasksList) {
        const tasksListArr = JSON.parse(tasksList);
        tasksListArr.forEach((task: ITask) => {
          if (task.id === action.payload) {
            task.pomodorCount++;
          }
        });
        window.localStorage.setItem('tasksList', JSON.stringify(tasksListArr));
        state.tasksList = [...tasksListArr];
      }
    },
    updatePauseTimeSpent: (state, action) => {
      const tasksStatisticsList = window.localStorage.getItem('tasksStatisticsList');
      if (tasksStatisticsList) {
        const tasksStatisticsListArr = JSON.parse(tasksStatisticsList);
        tasksStatisticsListArr.forEach((task: ITaskStatistics) => {
          if (task.day === action.payload.day) {
            task.taskOnPauseTime++;
          }
        });
        window.localStorage.setItem('tasksStatisticsList', JSON.stringify(tasksStatisticsListArr));
        state.tasksStatisticsList = [...tasksStatisticsListArr];
      }
    },
    decreaseTaskTime: (state, action) => {
      const tasksList = window.localStorage.getItem('tasksList');
      if (tasksList) {
        const tasksListArr = JSON.parse(tasksList);
        tasksListArr.forEach((task: ITask) => {
          if (task.id === action.payload) {
            task.pomodorCount--;
          }
        });
        window.localStorage.setItem('tasksList', JSON.stringify(tasksListArr));
        state.tasksList = [...tasksListArr];
      }
    },
    resetTaskTime: (state, action) => {
      const tasksList = window.localStorage.getItem('tasksList');
      if (tasksList) {
        const tasksListArr = JSON.parse(tasksList);
        tasksListArr.forEach((task: ITask) => {
          if (task.id === action.payload.currentTaskId) {
            task.taskTime = 1500;
            task.status = '';
          }
        });
        window.localStorage.setItem('tasksList', JSON.stringify(tasksListArr));
        state.tasksList = [...tasksListArr];
      }
    },
    setTaskIsDone: (state, action) => {
      const tasksList = window.localStorage.getItem('tasksList');
      if (tasksList) {
        const tasksListArr = JSON.parse(tasksList);
        tasksListArr.forEach((task: ITask) => {
          if (task.id === action.payload.currentTaskId) {
            task.isDone = true;
            task.status = '';
          }
        });
        window.localStorage.setItem('tasksList', JSON.stringify(tasksListArr));
        state.tasksList = [...tasksListArr];
      }
    },

  }
})

export const { 
  addTask, 
  deleteTask, 
  clearTasksList, 
  updateTask, 
  increaseTaskTime, 
  decreaseTaskTime, 
  updateTaskTimeSpent,
  addTasksStatistic, 
  updateTaskTime,
  updateTaskStatus,
  resetTaskTime,
  addStopCount,
  updatePauseTimeSpent,
  setTaskIsDone
} = tasksSlice.actions;
export default tasksSlice.reducer;
