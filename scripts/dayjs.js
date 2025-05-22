import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

/*
const today = dayjs();
const fiveAfterToday = today.add(5, 'days');
console.log(fiveAfterToday.format('MMM DD'));

const monthAfterToday = today.add(1, 'months');
console.log(monthAfterToday.format('MMM DD'));

const monthBeforeToday = today.subtract(1, 'months');
console.log(monthBeforeToday.format('MMM DD'));

console.log(today.format('dddd'));
*/

export function isWeekend(addDays) {
    const today = dayjs()
    const daysAfter = today.add(addDays, 'days').format('dddd');

    return daysAfter === 'Saturday' || daysAfter === 'Sunday';
}

console.log(isWeekend(2));
console.log(isWeekend(3));
console.log(isWeekend(4));
