
<template>
  <v-app-bar app color="primary" dark>
    <div class="app-wrapper d-flex align-center justify-space-between">
      <div class="d-flex align-center">
        <div class="app-bar-icon-wrapper">
          <v-img
            src="/app-bar-icon.png"
            alt="App Icon"
            class="app-bar-icon"
            cover
            height="40"
            width="40"
          />
        </div>
        <v-app-bar-title class="app-bar-title">HillyWeather</v-app-bar-title>
      </div>

      <!-- right side: cog menu -->
      <v-menu offset-y>
        <template #activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-radio-group v-model="searchScope" column>
              <v-radio label="Alleen Nederland" value="nl" />
              <v-radio label="Wereldwijd" value="global" />
            </v-radio-group>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { inject } from 'vue'
const searchScope = inject<'nl' | 'global'>('searchScope', 'nl')
</script>
