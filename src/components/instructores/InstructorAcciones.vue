<script setup lang="ts">
defineProps<{
  instructor: {
    id: number
    nombre_completo: string
    instrumentos: any[]
    activo: boolean
  }
}>()

defineEmits<{
  (e: 'editar', instructor: any): void
  (e: 'eliminar', id: number): void
  (e: 'toggle', id: number): void
}>()
</script>

<template>
  <div class="d-flex justify-center">
    <!-- Botón editar: solo si está activo -->
    <v-btn icon :disabled="!instructor.activo" @click="$emit('editar', instructor)">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>

    <!-- Botón cambiar estado -->
    <v-btn icon @click="$emit('toggle', instructor.id)">
      <v-icon>mdi-refresh</v-icon>
    </v-btn>

    <!-- Botón eliminar: solo si está inactivo -->
    <v-btn icon color="red" :disabled="instructor.activo" @click="$emit('eliminar', instructor.id)">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </div>
</template>
