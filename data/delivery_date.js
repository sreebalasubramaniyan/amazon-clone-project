const today = new Date();
function formatDate(date) {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}
function addDays(baseDate, days) {
  const d = new Date(baseDate);
  d.setDate(d.getDate() + days);
  return d;
}
export const day1 = formatDate(addDays(today, 7));
export const day2 = formatDate(addDays(today, 3));
export const day3 = formatDate(addDays(today, 1));
export const tdy = formatDate(today);
console.log(day1);
console.log(day2);
console.log(day3);
export const deliveryOption = [
    {date:day1,cost:0},
    {date:day2,cost:4.99},
    {date:day3,cost:9.99}
]

export function daysBetween(inputDateStr) {
  const today = new Date();
  
  // Add current year because input has no year
  const currentYear = today.getFullYear();
  const fullDateStr = `${inputDateStr}, ${currentYear}`;

  const inputDate = new Date(fullDateStr);

  // Remove time part (important)
  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  const diffMs = inputDate - today;
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  return diffDays;
}
