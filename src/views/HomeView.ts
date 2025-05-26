import { ref, onMounted } from 'vue'
import type { WeatherResponse } from '../types/WeatherResponse'
import type { GeoCityResult } from '@/types/GeoCity'
import { debounce } from '@/utils/debounce'

const baseUrl = import.meta.env.VITE_FETCH_URL
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
const defaultLat = import.meta.env.VITE_LAT
const defaultLon = import.meta.env.VITE_LON
const exclude = import.meta.env.VITE_EXCLUDE

export function useWeatherData() {
  const weatherCache = new Map<string, WeatherResponse>()
  const weatherData = ref<WeatherResponse | null>(null)
  const selectedCityName = ref<string | null>(null)
  const loading = ref(false)

  const search = ref('')
  const suggestions = ref<
    {
      name: string
      lat: number
      lon: number
      country: string
      state?: string
    }[]
  >([])

  const selectedCountry = ref<'NL' | 'Global' | string>('NL')

  const lastFetchedAt = ref<Record<string, number>>({})

  async function fetchWeather(lat: string, lon: string) {
    const key = `${lat},${lon}`

    // ⏱️ Throttle recent requests (10 minutes)
    const now = Date.now()
    const last = lastFetchedAt.value[key]
    const TEN_MINUTES = 10 * 60 * 1000

    if (last && now - last < TEN_MINUTES) {
      console.log('Using throttled data for:', key)
      weatherData.value = weatherCache.get(key)!
      return
    }

    // ✅ Use cached data if available
    if (weatherCache.has(key)) {
      console.log('Using cached weather for:', key)
      weatherData.value = weatherCache.get(key)!
      return
    }

    const url =
      baseUrl
        .replace('{lat}', lat)
        .replace('{lon}', lon)
        .replace('{part}', exclude) + apiKey

    loading.value = true
    try {
      const res = await fetch(url)
      if (!res.ok) {
        console.error('Fetch failed:', res.status)
        return
      }
      const data = await res.json()
      weatherData.value = data
      weatherCache.set(key, data)
      lastFetchedAt.value[key] = now
    } catch (err) {
      console.error('Failed to fetch weather:', err)
    } finally {
      loading.value = false
    }
  }

  let lastSearchQuery = ''

  const debouncedSearch = debounce(async () => {
    if (search.value.length < 2) {
      suggestions.value = []
      return
    }

    let query = search.value
    if (selectedCountry.value !== 'Global') {
      query += `,${selectedCountry.value.toLowerCase()}`
    }

    // 🚫 Skip if it's the same as last search
    if (query === lastSearchQuery) {
      console.log('Skipping duplicate search:', query)
      return
    }
    lastSearchQuery = query

    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
    )
    const data: GeoCityResult[] = await res.json()

    suggestions.value = data.map((item) => ({
      name: item.name,
      lat: item.lat,
      lon: item.lon,
      state: item.state,
      country: item.country,
    }))
  }, 400)

  function onSearchInput() {
    debouncedSearch()
  }

  function selectCity(city: {
    name: string
    lat: number
    lon: number
    country: string
  }) {
    fetchWeather(city.lat.toString(), city.lon.toString())
    selectedCityName.value = `${city.name}, ${city.country}`
    search.value = ''
    suggestions.value = []
    localStorage.setItem(
      'lastSelectedCity',
      JSON.stringify({ lat: city.lat, lon: city.lon })
    )
  }

  function useMyLocation() {
    localStorage.removeItem('lastSelectedCity')
    selectedCityName.value = '📍 My Location'

    if (!navigator.geolocation) {
      alert('Geolocation not supported. Using fallback location.')
      selectedCityName.value = 'De Bilt, NL'
      fetchWeather(defaultLat, defaultLon)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeather(
          pos.coords.latitude.toString(),
          pos.coords.longitude.toString()
        )
      },
      (err) => {
        alert('Unable to retrieve your location. Using fallback location.')
        console.error('Geolocation error:', err)
        selectedCityName.value = 'De Bilt, NL'
        fetchWeather(defaultLat, defaultLon)
      }
    )
  }

  onMounted(() => {
    const saved = localStorage.getItem('lastSelectedCity')
    if (saved) {
      try {
        const { lat, lon } = JSON.parse(saved)
        fetchWeather(lat.toString(), lon.toString())
        return
      } catch {
        localStorage.removeItem('lastSelectedCity')
      }
    }
    useMyLocation()
  })

  function clearWeatherCache() {
    weatherCache.clear()
    lastFetchedAt.value = {}
    selectedCityName.value = null
    suggestions.value = []
    console.log('Weather cache cleared.')
  }

  return {
    weatherData,
    loading,
    search,
    suggestions,
    selectedCountry,
    onSearchInput,
    selectCity,
    useMyLocation,
    fetchWeather,
    selectedCityName,
    clearWeatherCache,
  }
}
