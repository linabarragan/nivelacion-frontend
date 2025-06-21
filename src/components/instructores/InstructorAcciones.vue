<template>
  <div class="d-flex justify-center">
    <v-btn icon @click="$emit('editar')">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn icon @click="$emit('toggle')">
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
    <v-btn icon color="red" @click="$emit('eliminar')">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'editar'): void
  (e: 'eliminar'): void
  (e: 'toggle'): void
}>()
</script>
