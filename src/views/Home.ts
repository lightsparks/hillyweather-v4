// src/views/Home.ts
import { ref, onMounted } from 'vue'

export function useWeatherData() {
    const weatherData = ref(null)

    const lat = import.meta.env.VITE_LAT
    const lon = import.meta.env.VITE_LON
    const exclude = import.meta.env.VITE_EXCLUDE
    const baseUrl = import.meta.env.VITE_FETCH_URL
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

    const url = baseUrl
            .replace('{lat}', lat)
            .replace('{lon}', lon)
            .replace('{part}', exclude)
        + apiKey

    onMounted(async () => {
        try {
            const res = await fetch(url)

            if (!res.ok) {
                console.error('Fetch failed with status:', res.status)
                return
            }

            weatherData.value = await res.json()
        } catch (err) {
            console.error('Failed to fetch weather data:', err)
        }
    })


    return { weatherData }
}
