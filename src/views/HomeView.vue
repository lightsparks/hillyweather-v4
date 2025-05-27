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

    <v-container>
      <v-btn color="primary">I'm Vuetify!</v-btn>
    </v-container>

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
      <p><strong>Temperature:</strong> {{ Math.round(weatherData.current?.temp) }} °C</p>
      <p><strong>Feels Like:</strong> {{  Math.round(weatherData.current?.feels_like) }} °C</p>
      <p><strong>Condition:</strong> {{ weatherData.current?.weather[0]?.main }} {{ weatherIcon(weatherData.current?.weather[0]?.id) }}</p>
      <p><strong>Description:</strong> {{ weatherData.current?.weather[0]?.description }}</p>
      <p>
        <strong>Wind: </strong>
        <span
          class="wind-arrow"
          :style="{ transform: `rotate(${weatherData.current?.wind_deg ?? 0}deg)` }"
          aria-label="Wind direction"
        >↑
        </span>
        {{ toKmh(weatherData.current?.wind_speed) }},
        {{ windDirectionFromDegrees(weatherData.current?.wind_deg) }},
        {{ beaufortScale(weatherData.current?.wind_speed) }}
      </p>
      <p><strong>UV Index:</strong> {{ weatherData.current?.uvi }}</p>
      <p><strong>Humidity:</strong> {{ weatherData.current?.humidity }}%</p>
      <p><strong>Sunrise:</strong> {{ formatTime(weatherData.current?.sunrise) }}</p>
      <p><strong>Sunset:</strong> {{ formatTime(weatherData.current?.sunset) }}</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import './HomeView.scss'
import { useWeatherData } from './HomeView'
import {
  formatTime,
  weatherIcon
} from '@/utils/weatherFormat'
import {
  windDirectionFromDegrees,
  toKmh,
  beaufortScale
} from '@/utils/weatherFormat'

const {
  weatherData,
  loading,
  search,
  suggestions,
  selectedCountry,
  onSearchInput,
  selectCity,
  useMyLocation,
  clearWeatherCache,
  selectedCityName
} = useWeatherData()
</script>