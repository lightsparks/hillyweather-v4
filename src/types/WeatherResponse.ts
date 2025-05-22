export interface WeatherResponse {
  lat: number
  lon: number
  timezone: string
  current: {
    temp: number
    // Add other fields if needed later
  }
}
