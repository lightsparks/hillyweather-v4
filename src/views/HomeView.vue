<!-- HomeView.vue -->
<template>
  <v-container class="home-view" fluid>
    <!-- Search Area -->
    <div class="search-area">
      <v-row>
        <v-col cols="12">
          <div class="search-field-wrapper">
            <v-text-field
              v-model="search"
              label="Zoek locatie"
              @input="onSearchInput"
              @focus="showSuggestions = true"
              variant="solo-filled"
              rounded
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
      </v-row>
    </div>

    <!-- WeatherCard fills remaining space -->
    <div class="weather-area" v-if="weatherData">
      <WeatherCard
        :cityName="selectedCityName"
        :resolvedCity="resolvedCityName"
        :data="weatherData"
      />
    </div>

    <!-- Location consent popup -->
    <LocationConsentDialog
      v-model="showLocationConsent"
      @accept="grantConsent"
      @deny="denyConsent"
    />
  </v-container>
</template>

<script setup lang="ts">
import { watch, onMounted, ref } from 'vue'
import { useWeatherSearch } from '@/composables/useWeatherSearch'
import { useGeolocationConsent } from '@/composables/useGeolocationConsent'
import WeatherCard from '@/components/WeatherCard.vue'
import LocationConsentDialog from '@/components/LocationConsentDialog.vue'

const highlightedIndex = ref(-1)
const showSuggestions = ref(false)

const {
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
} = useWeatherSearch()

const { showLocationConsent, initGeolocationFlow, grantConsent, denyConsent } =
  useGeolocationConsent(fetchWeather, useMyLocation)

onMounted(initGeolocationFlow)

watch(selectedCountry, () => {
  search.value = ''
  suggestions.value = []
})

/**
 * Accept `city` with possibly‐nullable fields,
 * guard against null, then call fetchWeather.
 */
function selectCity(city: {
  name: string | null
  lat: number | null
  lon: number | null
  country: string
  state?: string
}) {
  // If any required piece is null, bail out
  if (!city.name || city.lat == null || city.lon == null) {
    return
  }

  // Now TypeScript knows these aren’t null
  fetchWeather(String(city.lat), String(city.lon), city.name)
  showSuggestions.value = false
  search.value = city.name
}

function onSearchInput() {
  fetchCitySuggestions(search.value)
  showSuggestions.value = true
}
</script>
