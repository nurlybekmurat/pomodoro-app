import { MouseEvent, useRef,} from 'react';
import styles from './statistics-chart.module.css';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  ChartOptions
} from 'chart.js';
import type { InteractionItem  } from 'chart.js';
import { Chart,  getElementAtEvent } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip
);

interface IStatisticsListProps {
  statisticsList: [],
  labels:  Array<string>,
  dataList:  Array<number>,
  setCurrentDay: (value: string | ((prevVar: string) => string)) => void;
}

export const StatisticsChart = ({ labels, dataList, setCurrentDay }: IStatisticsListProps) => {
  const data = {
    labels,
    responsive: true,
    datasets: [
        {
          data: dataList,
          backgroundColor: '#EA8A79',
        },
      ],
    };

  const options: ChartOptions  = {
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 50,
        ticks: {
          callback: function(value) {
            return value + 'мин';
          }
        }
      }
    }
  };

  const printElementAtEvent = (element: InteractionItem[]) => {
    if (!element.length) return;
    const { index } = element[0];
    setCurrentDay(data.labels[index]);
  };
  const chartRef = useRef<ChartJS>(null);
  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!chartRef.current) {
      return;
    }
    printElementAtEvent(getElementAtEvent(chartRef.current, event));
  }

  return (
    <div className={styles.wrapper}  >
      <Chart 
        ref={chartRef}
        type='bar'
        options={options} 
        data={data}
        onClick={onClick} 
      />
    </div>
  )
}