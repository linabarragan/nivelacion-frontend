<template>
  <v-container class="instructores-fondo" fluid>
    <div class="fondo-overlay">
      <h2 class="text-h5 font-weight-bold mb-4">Gestión de Instructores</h2>

      <InstructorFormulario
        :instructor-edit="instructorEdit"
        :instrumentos="instrumentos"
        @guardar="guardar"
        @cancelar="cancelar"
        @error="manejarError"
      />

      <v-snackbar
        v-model="mostrarError"
        :timeout="5000"
        color="error"
        location="bottom right"
        multi-line
      >
        {{ errorMensaje }}
      </v-snackbar>

      <v-divider class="my-6" />

      <!-- Filtros -->
      <v-row class="mb-4" dense>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Buscar por nombre"
            v-model="filtroNombre"
            clearable
            density="comfortable"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            label="Filtrar por estado"
            :items="['todos', 'activos', 'inactivos']"
            v-model="filtroEstado"
            density="comfortable"
          />
        </v-col>
      </v-row>

      <v-divider class="my-6" />
      <InstructorTabla
        :instructores="instructores"
        :filtro-nombre="filtroNombre"
        :filtro-estado="filtroEstado"
        @editar="abrirFormulario"
        @eliminar="eliminar"
        @toggle="cambiarEstado"
      />
    </div>
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
import { obtenerInstrumentos } from '@/service/InstrumentoService'

// Tipos
interface Instrumento {
  id: number
  nombre: string
}

interface Instructor {
  id: number
  nombre_completo: string
  instrumentos: Instrumento[]
  activo: boolean
  createdAt?: string
  updatedAt?: string
}

const instructores = ref<Instructor[]>([])
const instrumentos = ref<Instrumento[]>([])
const instructorEdit = ref<Instructor | null>(null)

const errorMensaje = ref('')
const mostrarError = ref(false)

// Filtros
const filtroNombre = ref('')
const filtroEstado = ref<'todos' | 'activos' | 'inactivos'>('todos')

async function cargarInstructores() {
  try {
    instructores.value = await obtenerInstructores()
  } catch (error) {
    console.error('🔴 Error al cargar instructores:', error)
  }
}

async function cargarInstrumentos() {
  try {
    instrumentos.value = await obtenerInstrumentos()
  } catch (error) {
    console.error('🔴 Error al cargar instrumentos:', error)
  }
}

function abrirFormulario(instructor: Instructor) {
  instructorEdit.value = {
    ...instructor,
    nombre_completo: instructor.nombre_completo || instructor.nombreCompleto,
  }
}

function cancelar() {
  instructorEdit.value = null
}

defineEmits<{
  (e: 'guardar', data: any): Promise<void>
  (e: 'cancelar'): void
  (e: 'error', error: any): void
}>()

async function guardar(data: { nombre_completo: string; instrumento_ids: number[] }) {
  try {
    if (instructorEdit.value) {
      const res = await actualizarInstructor(instructorEdit.value.id, data)
      if (res.errors) throw res
    } else {
      const res = await crearInstructor(data)
      if (res.errors) throw res
    }

    instructorEdit.value = null
    await cargarInstructores()
    mostrarError.value = false
  } catch (error: any) {
    console.error('🔴 Error al guardar instructor:', error)

    if (Array.isArray(error.errors)) {
      const mensajes = error.errors.map((e: any) => e.message)
      errorMensaje.value = mensajes.join(', ')
    } else {
      errorMensaje.value =
        'Debes seleccionar al menos un instrumento y el nombre debe tener mínimo 3 caracteres.'
    }

    mostrarError.value = true
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

function manejarError(error: any) {
  console.error('🔴 Error recibido desde formulario:', error)

  if (error.response?.status === 400 && Array.isArray(error.response.data?.errors)) {
    const mensajes = error.response.data.errors.map((e: any) => e.message)
    errorMensaje.value = mensajes.join(', ')
  } else {
    errorMensaje.value = 'Ocurrió un error inesperado al guardar el instructor.'
  }

  mostrarError.value = true
}

onMounted(() => {
  cargarInstrumentos()
  cargarInstructores()
})
</script>

<style scoped>
.instructores-fondo {
  background-image: url('/src/assets/fondo-musical.png.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: repeat;
  filter: brightness(0.92);
  min-height: 100vh;
  padding-top: 2rem;
  position: relative;
}

.fondo-overlay {
  background-color: rgba(255, 255, 255, 0.95); /* Blanco semitransparente */
  padding: 2rem;
  border-radius: 16px;
}

.v-text-field,
.v-select {
  background-color: rgba(255, 255, 255, 0.85) !important;
  border-radius: 8px;
}
</style>
