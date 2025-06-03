<template>
  <!-- Wrap everything in a single v-container so that we can define rows/columns for responsive breakpoints. -->
  <v-container fluid class="pa-0">
    <!-- ========== ROW 1: Section A (location + date) ========== -->
    <v-row>
      <v-col cols="12">
        <v-card class="ma-3 pa-4">
          <v-card-title class="d-flex justify-space-between align-center">
            <div>
              {{ cityName }}
              <div
                v-if="cityName?.includes('Huidige locatie') && resolvedCity"
                class="resolved-city"
              >
                ({{ resolvedCity }})
              </div>
            </div>
            <div class="text-subtitle-1">{{ formatDate(data.current.dt) }}</div>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <!-- ========== ROW 2: Section B (left) and Section C (right) on md+; stacked on xs ========== -->
    <v-row>
      <!-- Section B: current icon + temperature + description -->
      <v-col cols="12" md="6">
        <v-card class="ma-3 pa-4">
          <v-row align="center" no-gutters>
            <v-col cols="auto">
              <img
                :src="`weather-icons/${data.current.weather[0].icon}.png`"
                :alt="data.current.weather[0].description"
                class="weather-icon"
              />
            </v-col>

            <v-col>
              <div class="text-h4">
                {{ Math.round(data.current.temp) }}°C
              </div>
              <div class="text-subtitle-1">
                {{
                  capitalizeFirst(
                    translateWeatherDescription(
                      data.current.weather[0].description
                    )
                  )
                }}
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <!-- Section C: current stats -->
      <v-col cols="12" md="6">
        <v-card class="ma-3 pa-4">
          <v-card-text>
            <!-- Temperature + feels like -->
            <v-row class="text-no-wrap">
              <v-col
                cols="12"
                sm="6"
                class="d-flex justify-space-between align-center"
              >
                <span class="weather-data-label">Temperatuur:</span>
                <span class="weather-data-value">
                  {{ Math.round(data.current.temp) }}°C
                  <span
                    v-if="
                      Math.round(data.current.feels_like) !==
                      Math.round(data.current.temp)
                    "
                  >
                    (Feels like {{ Math.round(data.current.feels_like) }}°C)
                  </span>
                </span>
              </v-col>
            </v-row>

            <!-- Wind -->
            <v-row class="text-no-wrap">
              <v-col
                cols="12"
                sm="6"
                class="d-flex justify-space-between align-center"
              >
                <span class="weather-data-label">Windkracht:</span>
                <span class="weather-data-value">
                  {{ windArrowFromDegrees(data.current.wind_deg) }}
                  {{ windAbbrevFromDegrees(data.current.wind_deg) }}
                  {{ beaufortNumber(data.current.wind_speed) }}
                </span>
              </v-col>
            </v-row>

            <!-- UV Index -->
            <v-row class="text-no-wrap">
              <v-col
                cols="12"
                sm="6"
                class="d-flex justify-space-between align-center"
              >
                <span class="weather-data-label">UV Index:</span>
                <span class="weather-data-value">{{ data.current.uvi }}</span>
              </v-col>
            </v-row>

            <!-- Humidity -->
            <v-row class="text-no-wrap">
              <v-col
                cols="12"
                sm="6"
                class="d-flex justify-space-between align-center"
              >
                <span class="weather-data-label">Luchtvochtigheid:</span>
                <span class="weather-data-value">
                  {{ data.current.humidity }}%
                </span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- ========== ROW 3: Section D (hourly) — hidden on xs, shown on md+ ========== -->
    <v-row>
      <v-col
        cols="12"
        class="d-none d-md-block"
      >
        <v-card class="ma-3 pa-4">
          <v-card-title class="text-h6">
            Weer per uur (volgende 24 uur)
          </v-card-title>
          <v-row no-gutters>
            <v-col
              v-for="hour in data.hourly.slice(0, 24)"
              :key="hour.dt"
              cols="auto"
              class="pa-2"
            >
              <v-card class="pa-3" outlined>
                <div class="text-subtitle-2">{{ formatHour(hour.dt) }}</div>
                <img
                  :src="`weather-icons/${hour.weather[0].icon}.png`"
                  :alt="hour.weather[0].description"
                  class="weather-icon-small"
                />
                <div class="text-body-1">
                  {{ Math.round(hour.temp) }}°C
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- ========== ROW 4: Section E (next 5 days) ========== -->
    <v-row>
      <v-col cols="12">
        <v-card class="ma-3 pa-4">
          <v-card-title class="text-h6">
            Weer per dag (volgende 5 dagen)
          </v-card-title>
          <v-row no-gutters>
            <v-col
              v-for="day in data.daily.slice(0, 5)"
              :key="day.dt"
              cols="auto"
              class="pa-2"
            >
              <v-card class="pa-3" outlined>
                <div class="text-subtitle-2">{{ formatDay(day.dt) }}</div>
                <img
                  :src="`weather-icons/${day.weather[0].icon}.png`"
                  :alt="day.weather[0].description"
                  class="weather-icon-small"
                />
                <div class="text-body-2">
                  Min: {{ Math.round(day.temp.min) }}°C
                </div>
                <div class="text-body-2">
                  Max: {{ Math.round(day.temp.max) }}°C
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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

function formatDate(unixTime: number): string {
  const d = new Date(unixTime * 1000)
  return d.toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatHour(unixTime: number): string {
  const d = new Date(unixTime * 1000)
  return d.toLocaleTimeString(undefined, {
    hour: 'numeric',
    hour12: true,
  })
}

function formatDay(unixTime: number): string {
  const d = new Date(unixTime * 1000)
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}
</script>

<style scoped>
.weather-icon {
  height: 100px;
  width: auto;
}
.weather-icon-small {
  height: 48px;
  width: auto;
}

.resolved-city {
  font-size: 0.875rem;
  opacity: 0.7;
  margin-top: 0.25rem;
}

/*
  Vuetify’s utility classes handle responsive hiding/showing:
    - d-none        → display: none
    - d-md-block    → display: block on md and up
  So Section D is hidden on xs/sm, shown on md/lg/xl.
*/
</style>
