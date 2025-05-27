<template>
  <v-container class="home-view" fluid>
    <v-row>
      <v-col cols="12">
        <h1>HillyWeather v4</h1>
      </v-col>

      <v-col cols="12" md="6">
        <v-select
          v-model="selectedCountry"
          :items="['NL', 'DE', 'BE', 'FR', 'Global']"
          label="Search scope"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="search"
          label="Search city"
          @input="onSearchInput"
        />
      </v-col>

      <v-col cols="12" v-if="suggestions.length">
        <v-list>
          <v-list-item
            v-for="(city, index) in suggestions"
            :key="index"
            @click="selectCity(city)"
            class="city-suggestion"
          >
            {{ city.name }}{{ city.state ? ', ' + city.state : '' }},
            {{ city.country }}
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12" class="text-center" v-if="loading">
        <v-progress-circular indeterminate color="primary" />
      </v-col>

      <v-col cols="12" v-if="weatherData">
        <WeatherCard :cityName="selectedCityName" :data="weatherData" />
      </v-col>
    </v-row>

    <LocationConsentDialog
      v-model="showLocationConsent"
      @accept="grantConsent"
      @deny="denyConsent"
    />
  </v-container>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useWeatherSearch } from '@/composables/useWeatherSearch'
import { useGeolocationConsent } from '@/composables/useGeolocationConsent'
import WeatherCard from '@/components/WeatherCard.vue'
import LocationConsentDialog from '@/components/LocationConsentDialog.vue'

// Weather data + UI state
const {
  search,
  suggestions,
  selectedCountry,
  weatherData,
  selectedCityName,
  loading,
  fetchWeather,
  fetchCitySuggestions,
  useMyLocation,
} = useWeatherSearch()

// Consent dialog + flow control
const {
  showLocationConsent,
  initGeolocationFlow,
  grantConsent,
  denyConsent,
} = useGeolocationConsent(fetchWeather, useMyLocation)

onMounted(() => {
  initGeolocationFlow()
})

// Clear search if country changes
watch(selectedCountry, () => {
  search.value = ''
  suggestions.value = []
})

function onSearchInput() {
  fetchCitySuggestions(search.value)
}

function selectCity(city: { name: string; lat: number; lon: number }) {
  fetchWeather(String(city.lat), String(city.lon), city.name)
}
</script>

<style scoped src="./HomeView.scss"></style>
