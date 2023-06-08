interface IStats {
  day: string;
  taskTimeSpent: number;
}

export function getTimeFromMins(mins: number) {
  let hours = Math.trunc(mins/60) >= 1 ? `${Math.trunc(mins/60)} час` : '';
  let minutes = mins % 60;
  return hours + ' ' + minutes + ' мин';
};

export function getSeconds(seconds: number) {
  let secondsConverted = seconds % 60;
  return secondsConverted < 9 ? `0${secondsConverted}` : secondsConverted;
}

export function getTimeFromSeconds(seconds: number) {
  if (seconds < 60) {
    return `${seconds} секунд`
  }
  let minutes = seconds / 60;
  return `${minutes} минут`;
};

export function getMinuteFromSeconds(seconds: number) {
  if (seconds < 60) {
    return `${seconds} с`
  }
  let minutes = seconds / 60;
  return `${minutes} м`;
};

export function getPomidorCount (count: number) {
  if (count === 1) {
    return `${count} помидор`;
  } else if (count > 1 && count < 5) {
    return `${count} помидора`;
  } else {
    return `${count} помидоров`;
  }  
}

export function getWeek(currentPeriod: string) {
  const curr = new Date(); 
  const labels: Array<string> = [];
  if (currentPeriod === 'Эта неделя') {
    for ( let i = 1; i < 8; i++ ) {
      let date = new Date(curr.setDate(curr.getDate() - curr.getDay() + i)).toLocaleDateString('ru-RU', {day: 'numeric', month: 'numeric', weekday: 'long'});
      labels.push(date);
    }
  } else if (currentPeriod === 'Прошедшая неделя') {
    for ( let i = 7; i > 0; i-- ) {
      let date = new Date(curr.setDate(curr.getDate() - curr.getDay() - i)).toLocaleDateString('ru-RU', {day: 'numeric', month: 'numeric', weekday: 'long'});
      labels.push(date);
    }
  } else if (currentPeriod === '2 недели назад') {
    for ( let i = 14; i > 7; i-- ) {
      let date = new Date(curr.setDate(curr.getDate() - curr.getDay() - i)).toLocaleDateString('ru-RU', {day: 'numeric', month: 'numeric', weekday: 'long'});
      labels.push(date);
    }
  }
  return labels;
}

export function getStats(periodWeek: Array<string>, statisticsList: Array<any>) {
  const dataList: Array<any> = [];
  periodWeek.forEach(label => {
    statisticsList.forEach((item : IStats) => {
      if(label === item.day) {
        dataList.push(item.taskTimeSpent / 60);
      } else {
        dataList.push(0);
      }
    })
  });
  return dataList;
}