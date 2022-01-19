const getDayOfWeek = (date: Date): number => {
  let day = date.getDay();

  if (day === 0) day = 7;

  return day - 1;
};

export default getDayOfWeek;
