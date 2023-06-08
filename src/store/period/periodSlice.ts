import { createSlice } from "@reduxjs/toolkit";
import { getWeek } from "../../utils/utils";

// initialState as Default Value in Toolkit(slice)
const initialState = {
  periodList: {
    all: ['Прошедшая неделя','2 недели назад'],
    currentPeriod: 'Эта неделя',
    periodWeek: getWeek('Эта неделя'),
  },
  periodStats: [0]
};

export const periodSlice = createSlice({
  name:'period',
  initialState,
  reducers:{
    setPeriod: (state, action) => {
      const periodInitialAll = [...action.payload.all];
      const oldPeriod = action.payload.oldPeriod;
      const currentPeriod = action.payload.currentPeriod;
      const filteredPeriod = periodInitialAll.filter((item: any) => item !== action.payload.currentPeriod);
      filteredPeriod.push(oldPeriod);
      const newPeriod = {
        all: filteredPeriod,
        currentPeriod: currentPeriod,
        periodWeek: getWeek(currentPeriod),
      };
      state.periodList = {...newPeriod}
    },
    setStats: (state, action) => {
      state.periodStats = action.payload.stats;
    }
  }
})

export const { setPeriod, setStats } = periodSlice.actions;
export default periodSlice.reducer;