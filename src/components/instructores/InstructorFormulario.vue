<template>
  <v-card class="pa-4 mb-4" elevation="2">
    <v-card-title class="text-h6">
      {{ instructorEdit ? 'Editar Instructor' : 'Nuevo Instructor' }}
    </v-card-title>

    <v-card-text>
      <v-row dense>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Nombre completo"
            v-model="form.nombre_completo"
            @input="soloLetras"
            required
          />
        </v-col>

        <v-col cols="12" sm="6">
          <v-select
            label="Instrumentos"
            v-model="form.instrumento_ids"
            :items="instrumentos"
            item-title="nombre"
            item-value="id"
            multiple
            chips
            required
          />
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" @click="emitirGuardar">GUARDAR</v-btn>
      <v-btn text @click="limpiarFormulario">LIMPIAR</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch, reactive, onMounted } from 'vue'
import { obtenerInstrumentos } from '@/service/InstrumentoService'

const props = defineProps<{
  instructorEdit: {
    id?: number
    nombre_completo: string
    instrumento_ids: number[]
    instrumentos?: { id: number }[]
  } | null
}>()

const emit = defineEmits<{
  (e: 'guardar', data: { nombre_completo: string; instrumento_ids: number[] }): void
  (e: 'cancelar'): void
}>()

const form = reactive({
  nombre_completo: '',
  instrumento_ids: [] as number[],
})

const instrumentos = ref<{ id: number; nombre: string }[]>([])

onMounted(async () => {
  instrumentos.value = await obtenerInstrumentos()
})

watch(
  () => props.instructorEdit,
  (val) => {
    if (val) {
      form.nombre_completo = val.nombre_completo
      form.instrumento_ids = val.instrumentos?.map((i) => i.id) || []
    } else {
      form.nombre_completo = ''
      form.instrumento_ids = []
    }
  },
  { immediate: true },
)

function emitirGuardar() {
  emit('guardar', { ...form })
}

function limpiarFormulario() {
  form.nombre_completo = ''
  form.instrumento_ids = []
  emit('cancelar')
}

function soloLetras(e: Event) {
  const input = e.target as HTMLInputElement
  input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '')
  form.nombre_completo = input.value
}
</script>
