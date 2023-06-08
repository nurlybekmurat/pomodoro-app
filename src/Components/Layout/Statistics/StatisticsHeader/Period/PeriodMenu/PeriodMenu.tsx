import { setPeriod } from '../../../../../../store/period/periodSlice';
import { useAppDispatch } from '../../../../../../store/store';
import styles from './period-menu.module.css';

interface IPeriodMenu {
  periodList: {
    all: string[],
    currentPeriod: string;
    periodWeek: string[]
  };
}

export const PeriodMenu = ({ periodList } : IPeriodMenu) => {
  const dispatch = useAppDispatch();


  function optionHandler(option: string) {
    dispatch(setPeriod({
      ...periodList,
      currentPeriod: option,
      oldPeriod:periodList.currentPeriod
    }));
  }
  
  return (
    <ul className={styles.menu}>
      {
        periodList.all.map(option => (
          <li 
            className={styles.menuItem} 
            onClick={() => {optionHandler(option)}}
            key={option}
          >
            { option }
          </li>
        ))
      }
    </ul>
  )
}

