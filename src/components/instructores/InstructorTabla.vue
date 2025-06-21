<template>
  <v-table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Instrumento</th>
        <th>Estado</th>
        <th class="text-center">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <!-- Mensaje cuando no hay instructores -->
      <tr v-if="instructores.length === 0">
        <td colspan="4" class="text-center">No hay instructores disponibles.</td>
      </tr>

      <!-- Fila de datos -->
      <tr v-else v-for="instructor in instructores" :key="instructor.id">
        <td>{{ instructor.nombre_completo || 'Sin nombre' }}</td>
        <td>{{ instructor.instrumento_principal || 'Sin instrumento' }}</td>
        <td>
          <v-chip :color="instructor.activo ? 'green' : 'grey'" dark>
            {{ instructor.activo ? 'Activo' : 'Inactivo' }}
          </v-chip>
        </td>
        <td class="text-center">
          <InstructorAcciones
            @editar="$emit('editar', instructor)"
            @toggle="$emit('toggle', instructor.id)"
            @eliminar="$emit('eliminar', instructor.id)"
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import InstructorAcciones from '@/components/instructores/InstructorAcciones.vue'

type Instructor = {
  id: number
  nombre_completo: string
  instrumento_principal: string
  activo: boolean
  createdAt?: string
  updatedAt?: string
}

defineProps<{
  instructores: Instructor[]
}>()

defineEmits<{
  (e: 'editar', instructor: Instructor): void
  (e: 'eliminar', id: number): void
  (e: 'toggle', id: number): void
}>()
</script>
