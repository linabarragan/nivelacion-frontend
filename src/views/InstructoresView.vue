<template>
  <v-container>
    <h2 class="text-h5 font-weight-bold mb-4">Gestión de Instructores</h2>

    <InstructorFormulario
      :instructor-edit="instructorEdit"
      @guardar="guardar"
      @cancelar="cancelar"
    />

    <v-divider class="my-6" />

    <InstructorTabla
      :instructores="instructores"
      @editar="abrirFormulario"
      @eliminar="eliminar"
      @toggle="cambiarEstado"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import InstructorFormulario from '@/components/instructores/InstructorFormulario.vue'
import InstructorTabla from '@/components/instructores/InstructorTabla.vue'
import {
  obtenerInstructores,
  crearInstructor,
  actualizarInstructor,
  eliminarInstructor,
  toggleActivo,
} from '@/service/instructorService'

interface Instructor {
  id: number
  nombre_completo: string
  instrumento_principal: string
  activo: boolean
  createdAt?: string
  updatedAt?: string
}

const instructores = ref<Instructor[]>([])
const instructorEdit = ref<Instructor | null>(null)

// ✅ Cargar instructores con verificación visual
async function cargarInstructores() {
  try {
    const data = await obtenerInstructores()
    console.log('🟢 Instructores cargados:', data) // Verifica estructura
    instructores.value = data
  } catch (error) {
    console.error('🔴 Error al cargar instructores:', error)
  }
}

function abrirFormulario(instructor: Instructor) {
  instructorEdit.value = { ...instructor }
}

function cancelar() {
  instructorEdit.value = null
}

async function guardar(data: { nombre_completo: string; instrumento_principal: string }) {
  try {
    if (instructorEdit.value) {
      await actualizarInstructor(instructorEdit.value.id, data)
    } else {
      await crearInstructor(data)
    }
    instructorEdit.value = null
    await cargarInstructores()
  } catch (error) {
    console.error('🔴 Error al guardar instructor:', error)
  }
}

async function cambiarEstado(id: number) {
  try {
    await toggleActivo(id)
    await cargarInstructores()
  } catch (error) {
    console.error('🔴 Error al cambiar estado:', error)
  }
}

async function eliminar(id: number) {
  try {
    await eliminarInstructor(id)
    await cargarInstructores()
  } catch (error) {
    console.error('🔴 Error al eliminar instructor:', error)
  }
}

onMounted(() => {
  cargarInstructores()
})
</script>
