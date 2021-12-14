<template>

    <div v-cloak id="app">

        {{ currentDate }}

        <div v-if="errorMessage">Sorry, but the following error occurred: {{ errorMessage }}</div>

        <div v-if="gettingLocation">
            Getting your location...
        </div>

        <div v-if="location">
            We have found your location at {{ this.latitude }}, {{ this.longitude }}
        </div>

        <div>
            Current temperature: {{ this.day.tempNow }}
        </div>


    </div>

</template>

<script lang="ts" src="./HomeView.ts" />