<template>
  <v-app>
    <AppBar />

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
import AppBar from '@/components/AppBar.vue'

const searchScope = ref<'nl' | 'global'>('nl')

provide('searchScope', searchScope)

const version = __APP_VERSION__
</script>
