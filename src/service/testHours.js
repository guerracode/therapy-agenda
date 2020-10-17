const moment = require('moment');

const hours = [];

for (let hour = 8; hour < 12; hour += 1) {
  hours.push(moment({ hour }).format('H:mm'));
}

console.log(hours);

for(let i = 0; i < hours.length; i += 1) {
  // if()
}

const time = new Date();
console.log(time.getHours());

// let split = hours[0].split(':')[0];
// console.log(split);
