const findDirection = (windDegrees: number): number => {
  let degrees = (windDegrees * 16) / 360;

  degrees = Math.round(degrees);
  degrees = (degrees + 16) % 16;

  return degrees;
};

export default findDirection;
