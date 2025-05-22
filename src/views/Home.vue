<template>
  <div>
    <h1>Weather Overview</h1>
    <div v-if="weatherData">
      <p><strong>Latitude:</strong> {{ weatherData.lat }}</p>
      <p><strong>Longitude:</strong> {{ weatherData.lon }}</p>
      <p><strong>Timezone:</strong> {{ weatherData.timezone }}</p>
      <p><strong>Temperature:</strong> {{ weatherData.current.temp }} °C</p>
    </div>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { useWeatherData } from './Home'

const { weatherData } = useWeatherData()
</script>
