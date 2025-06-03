<template>
  <v-card class="mt-4 ntr-regular" color="primary" variant="tonal">
    <v-card-title class="city-title">
      {{ cityName }}
      <div
        v-if="cityName?.includes('Huidige locatie') && resolvedCity"
        class="resolved-city"
      >
        ({{ resolvedCity }})
      </div>
    </v-card-title>

    <!-- Weather icon image -->
    <div class="weather-icon-wrapper">
      <img
        :src="`weather-icons/${data.current.weather[0].icon}.png`"
        :alt="data.current.weather[0].description"
        class="weather-icon"
      />
    </div>

    <v-card-text class="weather-description">
      {{ capitalizeFirst(translateWeatherDescription(data.current.weather[0].description)) }}
    </v-card-text>

    <v-card-text>
      <v-row justify="center" class="text-no-wrap">
        <v-col cols="12" sm="6" class="d-flex justify-space-between align-center">
          <span class="weather-data-label">Temperatuur: </span>
          <v-spacer></v-spacer>
          <span class="weather-data-value">
            {{ Math.round(data.current.temp) }}°C
            <span v-if="Math.round(data.current.feels_like) !== Math.round(data.current.temp)">
              (feels like {{ Math.round(data.current.feels_like) }}°C)
            </span>
          </span>
        </v-col>
      </v-row>
      <v-row justify="center" class="text-no-wrap">
        <v-col cols="12" sm="6" class="d-flex justify-space-between align-center">
          <span class="weather-data-label">Windkracht: </span>
          <v-spacer></v-spacer>
          <span class="weather-data-value">
            {{ windArrowFromDegrees(data.current.wind_deg) }}
            {{ windAbbrevFromDegrees(data.current.wind_deg) }}
            {{ beaufortNumber(data.current.wind_speed) }}
          </span>
        </v-col>
      </v-row>
      <v-row justify="center" class="text-no-wrap">
        <v-col cols="12" sm="6" class="d-flex justify-space-between align-center">
          <span class="weather-data-label">UV Index: </span>
          <v-spacer></v-spacer>
          <span class="weather-data-value">{{ data.current.uvi }}</span>
        </v-col>
      </v-row>
      <v-row justify="center" class="text-no-wrap">
        <v-col cols="12" sm="6" class="d-flex justify-space-between align-center">
          <span class="weather-data-label">Luchtvochtigheid: </span>
          <v-spacer></v-spacer>
          <span class="weather-data-value">{{ data.current.humidity }}%</span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { WeatherResponse } from '@/types/WeatherResponse'
import {
  translateWeatherDescription,
  windArrowFromDegrees,
  windAbbrevFromDegrees,
  beaufortNumber,
} from '@/utils/weatherFormat'

defineProps<{
  cityName: string | null
  data: WeatherResponse
  resolvedCity?: string | null
}>()

function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>
