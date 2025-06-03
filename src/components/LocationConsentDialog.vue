<template>
  <v-dialog
    :model-value="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    persistent
    max-width="500"
  >
    <v-card>
      <v-card-title class="text-h6">Use Your Location?</v-card-title>
      <v-card-text>
        Om nauwkeurig weer te geven, kan deze app uw huidige locatie gebruiken.
        Jouw Locatiegegevens worden niet opgeslagen of gedeeld.
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="$emit('deny')">Deny</v-btn>
        <v-btn color="primary" @click="$emit('accept')">Allow</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'accept'): void
  (e: 'deny'): void
}>()
</script>
