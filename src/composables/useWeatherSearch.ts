import { ref, Ref } from 'vue'
import type { WeatherResponse } from '@/types/WeatherResponse'
import type { GeoCityResult } from '@/types/GeoCity'
import { debounce } from '@/utils/debounce'

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
const exclude = import.meta.env.VITE_OPENWEATHER_EXCLUDE
const baseUrl = import.meta.env.VITE_OPENWEATHER_BASE
const CURRENT_LOCATION_LABEL = 'Huidige locatie'


const fallbackLat = import.meta.env.VITE_FALLBACK_LAT
const fallbackLon = import.meta.env.VITE_FALLBACK_LON
const fallbackCity = import.meta.env.VITE_FALLBACK_CITY || 'Fallback City'
const fallbackCountry = import.meta.env.VITE_FALLBACK_COUNTRY || ''

export function useWeatherSearch() {
  const weatherCache = new Map<string, WeatherResponse>()
  const weatherData = ref<WeatherResponse | null>(null)
  const selectedCityName = ref<string | null>(null)
  const resolvedCityName = ref<string | null>(null)

  const loading = ref(false)

  const search: Ref<string> = ref('')
  const suggestions = ref<GeoCityResult[]>([])
  const selectedCountry = ref<'NL' | 'Global' | string>('NL')
  const lastFetchedAt = ref<Record<string, number>>({})

  async function fetchWeather(lat: string, lon: string, cityName: string) {
    const cacheKey = `${lat},${lon}`
    if (weatherCache.has(cacheKey)) {
      weatherData.value = weatherCache.get(cacheKey) || null
      selectedCityName.value = cityName
      return
    }

    loading.value = true
    try {
      const url = new URL(baseUrl)
      url.searchParams.set('lat', lat)
      url.searchParams.set('lon', lon)
      url.searchParams.set('exclude', exclude)
      url.searchParams.set('units', 'metric')
      url.searchParams.set('appid', apiKey)

      const response = await fetch(url.toString())
      const data: WeatherResponse = await response.json()
      weatherCache.set(cacheKey, data)
      weatherData.value = data
      selectedCityName.value = cityName
      lastFetchedAt.value[cacheKey] = Date.now()
    } catch (err) {
      console.error('Failed to fetch weather:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchCitySuggestions = debounce(async (query: string) => {
    if (!query || query.length < 2) return

    try {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        query
      )}&limit=5&appid=${apiKey}`

      const res = await fetch(url)
      const json: GeoCityResult[] = await res.json()

      suggestions.value = json.map((entry) => ({
        name: entry.name,
        lat: entry.lat,
        lon: entry.lon,
        country: entry.country,
        state: entry.state,
      }))
    } catch (err) {
      console.error('Failed to fetch city suggestions:', err)
    }
  }, 300)

  async function resolveCityName(lat: string, lon: string): Promise<string> {
    try {
      const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
      const res = await fetch(url)
      const json: GeoCityResult[] = await res.json()

      if (json.length) {
        const city = json[0]
        return `${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}`
      }
    } catch (err) {
      console.warn('Failed to reverse geocode:', err)
    }

    return `${fallbackCity}, ${fallbackCountry}`
  }

  function useMyLocation() {
    // …geolocation supported
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = String(position.coords.latitude)
        const lon = String(position.coords.longitude)

        // first set the resolved name
        const cityName = await resolveCityName(lat, lon)
        resolvedCityName.value = cityName

        // then fetch with the _plain_ label
        fetchWeather(lat, lon, CURRENT_LOCATION_LABEL)
      },
      async (error) => {
        console.warn('⚠️ Geolocation error:', error)

        const cityName = await resolveCityName(fallbackLat, fallbackLon)
        resolvedCityName.value = cityName

        fetchWeather(fallbackLat, fallbackLon, CURRENT_LOCATION_LABEL)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )

    // fallback timeout
    setTimeout(async () => {
      if (!resolvedCityName.value) {
        console.warn('🕒 Manual fallback triggered')
        const cityName = await resolveCityName(fallbackLat, fallbackLon)
        resolvedCityName.value = cityName
        fetchWeather(fallbackLat, fallbackLon, CURRENT_LOCATION_LABEL)
      }
    }, 6000)
  }


  return {
    search,
    suggestions,
    selectedCountry,
    weatherData,
    selectedCityName,
    resolvedCityName,
    loading,
    fetchWeather,
    fetchCitySuggestions,
    useMyLocation,
  }

}
