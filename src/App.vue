<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="app-bar-icon-wrapper">
        <v-img
          src="/favicon-512x512.png"
          alt="App Icon"
          class="app-bar-icon"
          cover
        />
      </div>
      <v-app-bar-title>HillyWeather</v-app-bar-title>

      <v-menu offset-y>
        <template #activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <!-- Now `searchScope` is a Ref, so `v-model` will work correctly. -->
            <v-radio-group v-model="searchScope" column>
              <v-radio label="Alleen Nederland" value="nl" />
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

/**
 * Instead of using `inject` here, create a reactive `Ref` with a default of 'nl'.
 * That way, the radio group will have "Nederland" selected on first load.
 */
const searchScope = ref<'nl' | 'global'>('nl')

/**
 * Provide the reactive reference so that any child component can `inject('searchScope')`
 * and get the same Ref instance.
 */
provide('searchScope', searchScope)

const version = __APP_VERSION__
</script>

<style scoped>
.footer-container {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}
</style>
