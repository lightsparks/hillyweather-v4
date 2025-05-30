<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>HillyWeather</v-toolbar-title>

      <!-- Settings Gear Icon -->
      <v-menu offset-y>
        <template #activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-radio-group v-model="searchScope" column>
              <v-radio label="Nederland" value="nl" />
              <v-radio label="Wereldwijd" value="global" />
            </v-radio-group>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>


    <v-main>
      <div class="app-wrapper">
        <router-view />
      </div>
    </v-main>

    <v-footer app padless>
      <v-container fluid class="footer-container text-center">
        Versie {{ version }}
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import { inject } from 'vue'

const searchScope = inject<'nl' | 'global'>('searchScope', 'nl')
const version = __APP_VERSION__

provide('searchScope', searchScope)

</script>

<style scoped>
.footer-container {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}
</style>