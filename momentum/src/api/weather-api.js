export default async function getWeather(city) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=a8122fbe52b443584fbcba6f23095ca1&units=metric`;

  const weatherRes = await fetch(weatherUrl);
  const weatherData = await weatherRes.json();

  return weatherData;
}
