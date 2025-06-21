<template>
  <v-card class="pa-4 mb-4" elevation="2">
    <v-card-title class="text-h6">{{
      instructorEdit ? 'Editar Instructor' : 'Nuevo Instructor'
    }}</v-card-title>

    <v-card-text>
      <v-row dense>
        <v-col cols="12" sm="6">
          <v-text-field label="Nombre completo" v-model="form.nombre_completo" required />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Instrumento principal"
            v-model="form.instrumento_principal"
            required
          />
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" @click="emitirGuardar">GUARDAR</v-btn>
      <v-btn text @click="emit('cancelar')">CANCELAR</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue'

const props = defineProps<{
  instructorEdit: {
    nombre_completo: string
    instrumento_principal: string
  } | null
}>()

const emit = defineEmits<{
  (e: 'guardar', data: { nombre_completo: string; instrumento_principal: string }): void
  (e: 'cancelar'): void
}>()

const form = reactive({
  nombre_completo: '',
  instrumento_principal: '',
})

watch(
  () => props.instructorEdit,
  (val) => {
    if (val) {
      form.nombre_completo = val.nombre_completo
      form.instrumento_principal = val.instrumento_principal
    } else {
      form.nombre_completo = ''
      form.instrumento_principal = ''
    }
  },
  { immediate: true },
)

function emitirGuardar() {
  if (!form.nombre_completo || !form.instrumento_principal) return
  emit('guardar', { ...form })
  // ❌ No se limpia aquí. Se limpia con el watch cuando instructorEdit cambia en el padre.
}
</script>
