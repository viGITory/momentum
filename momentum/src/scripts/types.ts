interface IWeatherResponse {
  cod: number;
  coord: {
    lat: number;
    lon: number;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  timezone: number;
  weather: [
    {
      id: number;
      description: string;
    }
  ];
  wind: {
    speed: number;
    deg: number;
  };
}

export = IWeatherResponse;
