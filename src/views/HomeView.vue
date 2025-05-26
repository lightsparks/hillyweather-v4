<template>
  <div>
    <h1>Weather Overview</h1>

    <div>
      <label for="country">Search scope:</label>
      <select id="country" v-model="selectedCountry">
        <option value="NL">Netherlands NL</option>
        <option value="DE">Germany DE</option>
        <option value="BE">Belgium BE</option>
        <option value="FR">France FR</option>
        <option value="Global">Global 🌍</option>
      </select>
    </div>

    <div>
      <input
        v-model="search"
        @input="onSearchInput"
        placeholder="Search city"
      />
      <ul v-if="suggestions.length">
        <li
          v-for="(city, index) in suggestions"
          :key="index"
          @click="selectCity(city)"
          style="cursor: pointer"
        >
          {{ city.name }}{{ city.state ? ', ' + city.state : '' }}, {{ city.country }}
        </li>
      </ul>
    </div>

    <button @click="useMyLocation">📍 My Location</button>
    <button @click="clearWeatherCache">🧹 Clear Weather Cache</button>

    <div v-if="loading">Loading...</div>

    <div v-if="selectedCityName">
      <p><strong>Selected City:</strong> {{ selectedCityName }}</p>
    </div>

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

const {
  weatherData,
  loading,
  search,
  suggestions,
  selectedCountry,
  onSearchInput,
  selectCity,
  useMyLocation,
  clearWeatherCache, // ✅ include this
  selectedCityName    // ✅ include this
} = useWeatherData()
</script>
