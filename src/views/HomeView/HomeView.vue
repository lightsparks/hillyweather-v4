<template>

    <div v-cloak id="app">
        <div v-if="errorMessage">Sorry, but the following error occurred: {{ errorMessage }}</div>

        <div v-if="gettingLocation">
            Getting your location...
        </div>

        <div v-if="location">
            We have found your location at {{ this.latitude }}, {{ this.longitude }}
        </div>

        <div>
            Current temperature: TODO
        </div>


    </div>

</template>

<script lang="ts" src="./HomeView.ts" />