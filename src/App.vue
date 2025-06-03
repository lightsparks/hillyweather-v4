<template>
  <v-app>
    <AppBar :version="version" />

    <v-main>
      <div class="app-wrapper">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import AppBar from '@/components/AppBar.vue'

const searchScope = ref<'nl' | 'global'>('nl')
provide('searchScope', searchScope)

const version = __APP_VERSION__
</script>