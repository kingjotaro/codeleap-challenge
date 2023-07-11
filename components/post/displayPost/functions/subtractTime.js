import { format, addDays } from 'date-fns';

export function subtractTime(date, time) {
  const currentDateFormatted = format(new Date(), 'yyyy/MM/dd');
  const currentTime = new Date();
  const currentTimeFormatted = currentTime.toLocaleString('en-US', {
    timeZone: 'America/Sao_Paulo',
    hour12: false,
  });

  const [_, currentHour] = currentTimeFormatted.split(', ');
  
  function calculateHourDifference(time) {
    const [startHour, startMinute] = (time || '').split(':').map(Number);
    const [currentHour, currentMinute] = currentTimeFormatted
      .split(' ')[1]
      .split(':')
      .map(Number);

    let hourDiff = currentHour - startHour;
    let minuteDiff = currentMinute - startMinute;

    if (minuteDiff < 0) {
      hourDiff--;
      minuteDiff += 60;
    }

    if (hourDiff < 0) {
      hourDiff += 24;
    }

    const dayDiff = Math.floor(hourDiff / 24);
    hourDiff %= 24;

    const formattedHour = hourDiff.toString().padStart(2, '0');
    const formattedMinute = minuteDiff.toString().padStart(2, '0');

    if (dayDiff > 0) {
      return `${dayDiff} days ${formattedHour}:${formattedMinute}`;
    }

    return `${formattedHour}:${formattedMinute}`;
  }

  function calculateDateDifference(date) {
    const currentDateTime = new Date();
    const targetDateTime = new Date(date);
    const differenceInTime = targetDateTime.getTime() - currentDateTime.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays;
  }

  function getTwoDigitHour(time) {
    const [hour] = time.split(':');
    const formattedHour = hour.padStart(2, '0').slice(-2);
    return formattedHour;
  }


  if (currentDateFormatted === date) {
    const hourDiff = calculateHourDifference(time);
    console.log(hourDiff)
    if (getTwoDigitHour(hourDiff) === '00')  {
     
      return 'less than one hour ago';

    
      }

    if (getTwoDigitHour(hourDiff) === '01') {
        return '1 hour ago';
    }
    if (hourDiff === '01:00' || hourDiff === '01:00:00') {
      return '1 hour ago';
    }
    return getTwoDigitHour(hourDiff) + ' hours ago';
  }

 

  return calculateDateDifference(date) * -1 + ' days ago';
}

/* apenas eu e deus sabemos oq foi feito aqui */