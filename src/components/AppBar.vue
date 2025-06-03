<template>
  <v-app-bar app color="primary" dark>
    <div class="app-wrapper d-flex align-center justify-space-between">
      <!-- Left side: icon + title + version -->
      <div class="d-flex align-center">
        <div class="app-bar-icon-wrapper">
          <v-img
            src="app-bar-icon.png"
            alt="App Icon"
            class="app-bar-icon"
            cover
            height="40"
            width="40"
          />
        </div>

        <!-- Title + version container -->
        <div class="title-version-container">
          <!-- Main app name -->
          <span class="app-bar-title">HillyWeather-v4</span>
          <!-- Smaller version text -->
          <span class="app-bar-version">version {{ version }}</span>
        </div>
      </div>

      <!-- Right side: gear menu -->
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
import { inject, defineProps } from 'vue'

const searchScope = inject<'nl' | 'global'>('searchScope', 'nl')

const { version } = defineProps<{ version: string }>()


</script>

<style scoped>
.app-bar-icon-wrapper {
  display: flex;
  align-items: center;
  margin-right: 12px;
  margin-inline-start: 20px;
}
.app-bar-icon {
  height: 40px;
  width: auto;
  object-fit: contain;
}
.app-bar-title {
  color: white;
  font-size: 2rem;
  font-weight: 600;
  white-space: nowrap;
}

.title-version-container {
  display: flex;
  align-items: baseline;
  margin-top: 0.5rem;
}

.app-bar-version {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  margin-left: 0.5rem;
  white-space: nowrap;
}

/* Responsive tweaks (optional): shrink version text slightly on very small screens */
@media (max-width: 600px) {
  .app-bar-title {
    font-size: 1.75rem;
  }
  .app-bar-version {
    font-size: 0.75rem;
  }
}
</style>
