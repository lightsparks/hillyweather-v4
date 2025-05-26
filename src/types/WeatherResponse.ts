export interface WeatherResponse {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: CurrentWeather
  hourly: HourlyWeather[]
  daily: DailyWeather[]
}

export interface CurrentWeather {
  dt: number
  sunrise?: number
  sunset?: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  weather: WeatherDescription[]
}

export interface HourlyWeather {
  dt: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  pop: number
  weather: WeatherDescription[]
}

export interface DailyWeather {
  dt: number
  sunrise: number
  sunset: number
  moonrise: number
  moonset: number
  moon_phase: number
  temp: {
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
  }
  feels_like: {
    day: number
    night: number
    eve: number
    morn: number
  }
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  wind_gust?: number
  clouds: number
  pop: number
  uvi: number
  weather: WeatherDescription[]
}

export interface WeatherDescription {
  id: number
  main: string
  description: string
  icon: string
}
