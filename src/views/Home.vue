<template>
  <div>
    <h1>Weather JSON</h1>
    <pre>{{ weatherData }}</pre>
  </div>
</template>

<script setup lang="ts">
import { useWeatherData } from './Home'

const { weatherData } = useWeatherData()
</script>
