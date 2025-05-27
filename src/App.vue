<template>
  <v-app>
    <v-app-bar color="primary" density="comfortable">
      <div class="app-bar-icon-wrapper">
        <v-img
          src="/favicon-512x512.png"
          alt="App Icon"
          class="app-bar-icon"
          cover
        />
      </div>
      <v-app-bar-title class="app-bar-title">
        HillyWeather v4
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>