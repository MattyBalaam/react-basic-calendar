import DateFns from 'date-fns';

const DAYS_IN_WEEK = 7;
const START_DAY = 1;
const FULL_DAY = 'dddd';
const FULL_MONTH = 'MMMM';
const MONTHS_IN_YEAR = 12;

const getAllDaysOfWeek = ( 
  startDay = START_DAY, 
  format = FULL_DAY,
  daysInWeek = DAYS_IN_WEEK 
) => {
  const today = DateFns.startOfToday();
  const startOfWeek = DateFns.startOfWeek(today, { weekStartsOn: startDay });
  const getFormated = day => DateFns.format(day, format);
  return Array.from({length: daysInWeek }, (x,i) => {
    return getFormated(DateFns.addDays(startOfWeek, i));
  });
}

const getAllMonthsOfYear = ( format = FULL_MONTH ) => {
  const getFormated = day => DateFns.format(day, format);
  return Array.from({length: MONTHS_IN_YEAR }, (x,i) => {
    return getFormated(new Date(1970, i, 1) );
  });
}

const getDisplayDates = (startOfMonth, daysInWeek = DAYS_IN_WEEK) => {
  const firstDayOfMonth = DateFns.getDay(startOfMonth);
  const startOverflow = (firstDayOfMonth - 1 + daysInWeek) % daysInWeek ;
  const firstDisplayDay = DateFns.isMonday(firstDayOfMonth) ? 
    startOfMonth 
    : DateFns.subDays(startOfMonth, startOverflow );
  const daysInMonth = DateFns.getDaysInMonth(startOfMonth);
  const daysUntilEndOfMonth = startOverflow + daysInMonth - 1;
  const endOverflow = daysInWeek - (daysUntilEndOfMonth % daysInWeek) - 1;
  const lastDisplayDay = DateFns.addDays(firstDisplayDay, daysUntilEndOfMonth + endOverflow);
  return DateFns.eachDay(firstDisplayDay, lastDisplayDay).map(date => {
    return {
      date: date,
      isOverflow: !DateFns.isSameMonth(startOfMonth, date)
    }
  })
}

const getDisplayDatesFromParams = ({year, month}) => {
  return getDisplayDates( new Date(year, month -1, 1, 12) ); //need to account for BST
}

const getTodaysDateParams = () => ({
  year: getCurrentYear(),
  month: getCurrentMonth() + 1 //urls are not index
})

const getCurrentYear = () => {
  return DateFns.getYear(new Date());
}

const getCurrentMonth= () => {
  return DateFns.getMonth(new Date());
}

const getFormattedMonth = month => {
  return DateFns.format(new Date(1970, month - 1, 1), FULL_MONTH );
}

const get20yearsEachWay = () => {
  return Array.from({length: 20 }, (x,i) => getCurrentYear() - 10 + i );
}

export {
  getAllDaysOfWeek,
  getAllMonthsOfYear,
  getDisplayDates,
  getDisplayDatesFromParams,
  get20yearsEachWay,
  getTodaysDateParams,
  getFormattedMonth
}