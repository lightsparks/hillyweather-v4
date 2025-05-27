<template>
  <v-card class="mt-4" color="primary" variant="tonal">
    <v-card-title>Weather for {{ cityName }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6">
          <p class="text-subtitle-1">
            <strong>Temperature:</strong>{{ Math.round(data.current.temp) }}°C
            <span v-if="Math.round(data.current.feels_like) !== Math.round(data.current.temp)">
              (feels like {{ Math.round(data.current.feels_like) }}°C)
            </span>
          </p>
          <p class="text-subtitle-1">
            <strong>Condition:</strong>
            {{ capitalizeFirst(data.current.weather[0].description) }}
          </p>
          <p class="text-subtitle-1">
            <strong>Wind:</strong>
            {{
              formatWind(
                data.current.wind_speed,
                data.current.wind_deg,
                data.current.wind_gust,
              )
            }}
            ({{ beaufortScale(data.current.wind_speed) }})
          </p>
        </v-col>
        <v-col cols="12" sm="6">
          <p class="text-subtitle-1">
            <strong>UV Index:</strong> {{ data.current.uvi }}
          </p>
          <p class="text-subtitle-1">
            <strong>Humidity:</strong> {{ data.current.humidity }}%
          </p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { WeatherResponse } from '@/types/WeatherResponse'
import { formatWind, beaufortScale } from '@/utils/weatherFormat'

defineProps<{
  cityName: string
  data: WeatherResponse
}>()

function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

</script>
