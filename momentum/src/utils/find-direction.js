const findDirection = (windDdegrees) => {
  let degrees = (windDdegrees * 16) / 360;

  degrees = Math.round(degrees, 0);
  degrees = (degrees + 16) % 16;

  return degrees;
};

export default findDirection;
