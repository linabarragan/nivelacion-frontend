<template>
  <v-table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Instrumentos</th>
        <th>Estado</th>
        <th class="text-center">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="instructoresFiltrados.length === 0">
        <td colspan="4" class="text-center">No hay instructores disponibles.</td>
      </tr>

      <tr v-else v-for="instructor in instructoresFiltrados" :key="instructor.id">
        <td>{{ instructor.nombreCompleto || 'Sin nombre' }}</td>

        <!-- Mostrar los instrumentos como texto separado por comas -->
        <td>
          <span v-if="instructor.instrumentos?.length">
            {{ instructor.instrumentos.map((i) => i.nombre).join(', ') }}
          </span>
          <span v-else>Sin instrumentos</span>
        </td>

        <td>
          <v-chip :color="instructor.activo ? 'green' : 'grey'" dark>
            {{ instructor.activo ? 'Activo' : 'Inactivo' }}
          </v-chip>
        </td>
        <td class="text-center">
          <InstructorAcciones
            :instructor="instructor"
            @editar="$emit('editar', $event)"
            @toggle="$emit('toggle', $event)"
            @eliminar="$emit('eliminar', $event)"
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import InstructorAcciones from '@/components/instructores/InstructorAcciones.vue'

type Instrumento = {
  id: number
  nombre: string
}

type Instructor = {
  id: number
  nombreCompleto: string
  instrumentos: Instrumento[]
  activo: boolean
  createdAt?: string
  updatedAt?: string
}

const props = defineProps<{
  instructores: Instructor[]
  filtroNombre: string
  filtroEstado: 'todos' | 'activos' | 'inactivos'
}>()

const emit = defineEmits<{
  (e: 'editar', instructor: Instructor): void
  (e: 'eliminar', id: number): void
  (e: 'toggle', id: number): void
}>()

const instructoresFiltrados = computed(() => {
  return props.instructores
    .filter((i) => i.nombreCompleto.toLowerCase().includes(props.filtroNombre.toLowerCase()))
    .filter((i) => {
      if (props.filtroEstado === 'activos') return i.activo
      if (props.filtroEstado === 'inactivos') return !i.activo
      return true
    })
})
</script>
