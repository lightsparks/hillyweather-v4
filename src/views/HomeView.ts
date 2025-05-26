import { ref } from 'vue'
import type { WeatherResponse } from '../types/WeatherResponse'

const baseUrl = import.meta.env.VITE_FETCH_URL
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
const defaultLat = import.meta.env.VITE_LAT
const defaultLon = import.meta.env.VITE_LON
const exclude = import.meta.env.VITE_EXCLUDE

export function useWeatherData() {
  const weatherData = ref<WeatherResponse | null>(null)
  const loading = ref(false)

  async function fetchWeather(lat: string, lon: string) {
    const url =
      baseUrl
        .replace('{lat}', lat)
        .replace('{lon}', lon)
        .replace('{part}', exclude) + apiKey

    loading.value = true

    try {
      const res = await fetch(url)
      if (!res.ok) {
        console.error('Fetch failed with status:', res.status)
        return
      }
      weatherData.value = await res.json()
    } catch (err) {
      console.error('Failed to fetch weather data:', err)
    } finally {
      loading.value = false
    }
  }

  // Use geolocation first, fallback to .env
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toString()
        const lon = position.coords.longitude.toString()
        fetchWeather(lat, lon)
      },
      () => {
        fetchWeather(defaultLat, defaultLon)
      },
    )
  } else {
    fetchWeather(defaultLat, defaultLon)
  }

  return {
    weatherData,
    loading,
    fetchWeather,
  }
}
