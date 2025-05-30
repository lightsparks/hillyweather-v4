<template>
  <v-container class="home-view" fluid>
    <v-row>
      <v-col cols="12" md="6">
        <div class="search-field-wrapper">
          <v-select
            v-model="selectedCountry"
            rounded="xxl"
            :items="['NL', 'DE', 'BE', 'FR', 'Global']"
            label="Zoekgebied"
            @focus="showCountryDropdown = true"
            @blur="showCountryDropdown = false"
          />
        </div>
      </v-col>

      <v-col cols="12" md="6">
        <div class="search-field-wrapper">
          <v-text-field
            v-model="search"
            label="Zoek stad"
            @input="onSearchInput"
            @focus="showSuggestions = true"
          />

          <v-list
            v-if="showSuggestions && suggestions.length"
            class="suggestions-overlay"
          >
            <v-list-item
              v-for="(city, index) in suggestions"
              :key="index"
              @click="selectCity(city)"
              @mouseover="highlightedIndex = index"
              :class="{ highlighted: index === highlightedIndex }"
            >
              {{ city.name }}{{ city.state ? ', ' + city.state : '' }},
              {{ city.country }}
            </v-list-item>
          </v-list>
        </div>
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
import { ref } from 'vue'

const highlightedIndex = ref(-1)
const showSuggestions = ref(false)

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
const { showLocationConsent, initGeolocationFlow, grantConsent, denyConsent } =
  useGeolocationConsent(fetchWeather, useMyLocation)

onMounted(() => {
  initGeolocationFlow()
})

// Clear search if country changes
watch(selectedCountry, () => {
  search.value = ''
  suggestions.value = []
})

function selectCity(city: { name: string; lat: number; lon: number }) {
  fetchWeather(String(city.lat), String(city.lon), city.name)
  showSuggestions.value = false
  search.value = city.name
}

function onSearchInput() {
  fetchCitySuggestions(search.value)
  showSuggestions.value = true
}

</script>

<style scoped src="./HomeView.scss"></style>
