/* eslint-disable radix */
const moment = require('moment');

function timeController(hours) {
  const hoursResult = [];

  for (let i = 0; i < hours.length; i += 1) {
    const hourAdd = moment(hours[i], 'HH:mm').add(1, 'hours').format('HH:mm');
    const hourSubtract = moment(hours[i], 'HH:mm').subtract(1, 'hours').format('HH:mm');
    const hourLess = moment(hours[i + 1], 'HH:mm').format('HH:mm');
    const hourMore = moment(hours[i - 1], 'HH:mm').format('HH:mm');

    if (hourAdd === hourLess || hourSubtract === hourMore) {
      hoursResult.push(hours[i]);
    }
  }

  return hoursResult;
}

function timeBreakdown(start, end, breaks = undefined) {
  const hours = [];
  let startTime = moment(start, 'HH:mm').format('HH');
  let endTime = moment(end, 'HH:mm').format('HH');

  startTime = parseInt(startTime);
  endTime = parseInt(endTime);

  for (let hour = startTime; hour <= endTime; hour += 1) {
    hours.push(moment({ hour }).format('H:mm'));
  }

  if (breaks) {
    breaks.forEach((element) => {
      const startBreak = moment(element.start, 'HH:mm').format('HH:00');
      const endBreak = moment(element.end, 'HH:mm').format('HH:00');

      for (let i = 0; i <= hours.length; i += 1) {
        if (hours[i] === startBreak || hours[i] === endBreak) {
          hours.splice(i, 1);
          i -= 1;
        }
      }
    });
  }

  return hours;
}

module.exports = { timeController, timeBreakdown };
