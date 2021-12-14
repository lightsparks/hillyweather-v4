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
            <div>
                <img :src="this.day.icon" alt="icon" class="mx-auto" transition="scale-transition" width="140px" />
            </div>
            Current temperature: {{ this.day.tempNow }} &#176;C <br>
            Conditions: {{ this.day.condition }} <br>
            Max.temp: {{ this.day.maxTemp }} &#176;C <br>
            Min.temp: {{ this.day.minTemp }} &#176;C <br>

        </div>


    </div>

</template>

<script lang="ts" src="./HomeView.ts" />