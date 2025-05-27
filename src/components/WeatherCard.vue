<template>
  <v-card class="mt-4 ntr-regular" color="primary" variant="tonal">
  <v-card-title>Het weer voor {{ cityName }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6">
          <p>
            <strong>Temperatuur:</strong>{{ Math.round(data.current.temp) }}°C
            <span v-if="Math.round(data.current.feels_like) !== Math.round(data.current.temp)">
              (feels like {{ Math.round(data.current.feels_like) }}°C)
            </span>
          </p>
          <p>
            <strong>Weerconditie:</strong>
            {{ translateWeatherDescription(data.current.weather[0].description) }}
          </p>
          <p>
            <strong>Wind:</strong>
            {{ beaufortScale(data.current.wind_speed) }}, {{
              formatWind(
                data.current.wind_speed,
                data.current.wind_deg,
                data.current.wind_gust,
              )
            }}
          </p>
        </v-col>
        <v-col cols="12" sm="6">
          <p>
            <strong>UV Index:</strong> {{ data.current.uvi }}
          </p>
          <p>
            <strong>Luchtvochtigheid:</strong> {{ data.current.humidity }}%
          </p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { WeatherResponse } from '@/types/WeatherResponse'
import { formatWind, beaufortScale, translateWeatherDescription } from '@/utils/weatherFormat'

defineProps<{
  cityName: string
  data: WeatherResponse
}>()

function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

</script>
