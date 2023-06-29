
  import { format, addDays } from 'date-fns';

  export function subtractTime(date, time) {
    const currentDateFormatted = format(new Date(), 'yyyy/MM/dd');
    const currentDate = new Date();
    const nextDay = format(addDays(currentDate, 1), 'yyyy/MM/dd');
    const currentTime = new Date();
    const currentTimeFormatted = currentTime.toLocaleString('en-US', {
      timeZone: 'America/Sao_Paulo',
      hour12: false,
    });
  
    const [_, currentHour] = currentTimeFormatted.split(', ');
    const actualTime = currentHour.slice(0, 5);
  
    function calculateDateDifference(date) {
      const currentDateTime = new Date();
      const targetDateTime = new Date(date);
      const differenceInTime = targetDateTime.getTime() - currentDateTime.getTime();
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  
      return differenceInDays;
    }
  
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
  
      const formattedHour = hourDiff.toString().padStart(2, '0');
      const formattedMinute = minuteDiff.toString().padStart(2, '0');
  
      return `${formattedHour}:${formattedMinute}`;
    }
  
    function getTwoDigitHour(time) {
      const [hour] = time.split(':');
      const formattedHour = hour.padStart(2, '0').slice(-2);
      return formattedHour;
    }
  
    function extractLastTwoDigits(time) {
      const [hours, minutes] = time.split(':');
      const lastTwoDigits = minutes.slice(-2);
      return lastTwoDigits;
    }
  
    function compareHours(time1, time2) {
      const [hour1, minute1] = time1.split(':').map(Number);
      const [hour2, minute2] = time2.split(':').map(Number);
  
      if (hour1 > hour2) {
        return true;
      }
  
      if (hour1 === hour2 && minute1 > minute2) {
        return true;
      }
  
      return false;
    }
  
    if (currentDateFormatted === date) {
      if (compareHours(calculateHourDifference(time), '01:00') && compareHours('02:00', calculateHourDifference(time))) {
        return '1 hour ago';
      }
      if (compareHours(calculateHourDifference(time), '01:00')) {
        return extractLastTwoDigits(time) + ' minutes ago';
      }
      return getTwoDigitHour(calculateHourDifference(time)) + ' hours ago';
    }
  
    if (nextDay === date && compareHours(time, actualTime)) {
      if (compareHours(calculateHourDifference(time), '01:00') && compareHours('02:00', calculateHourDifference(time))) {
        return '1 hour ago';
      }
      if (compareHours(calculateHourDifference(time), '01:00')) {
        return extractLastTwoDigits(time) + ' minutes ago';
      }
      return getTwoDigitHour(calculateHourDifference(time)) + ' hours ago';
    }
  
    return calculateDateDifference(date) * -1 + ' days ago';
  }
  