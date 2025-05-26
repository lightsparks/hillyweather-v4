<template>
  <div>
    <h1>Weather Overview</h1>

    <button @click="useMyLocation">📍 My Location</button>

    <div v-if="loading">Loading...</div>

    <div v-if="weatherData && !loading">
      <p><strong>Latitude:</strong> {{ weatherData.lat }}</p>
      <p><strong>Longitude:</strong> {{ weatherData.lon }}</p>
      <p><strong>Timezone:</strong> {{ weatherData.timezone }}</p>
      <p><strong>Temperature:</strong> {{ weatherData.current?.temp }} °C</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWeatherData } from './HomeView'

const { weatherData, loading, fetchWeather } = useWeatherData()

function useMyLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.')
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude.toString()
      const lon = position.coords.longitude.toString()
      fetchWeather(lat, lon)
    },
    (error) => {
      console.error('Geolocation error:', error)
      alert('Unable to retrieve your location.')
    },
  )
}
</script>
