const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const dateConverter = value => {
  const date = Number(value.slice(5, 7));
  let day = value.slice(8, value.length);

  const selectedDate = `${day[0] === '0' ? day[1] : day} of ${monthNames[date - 1]}`;

  return selectedDate;
};
