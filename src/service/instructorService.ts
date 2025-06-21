// src/service/instructorService.ts
const API_BASE = 'http://localhost:3333/api/instructores'

export async function obtenerInstructores() {
  const res = await fetch(API_BASE)
  return await res.json()
}

export async function crearInstructor(data: any) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const errorData = await res.json()
    const customError = new Error('Error en crear instructor') as Error & {
      response?: { status: number; data: any }
    }
    customError.response = { status: res.status, data: errorData }
    throw customError
  }

  return await res.json()
}

export async function actualizarInstructor(id: number, data: any) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const errorData = await res.json()
    const customError = new Error('Error en actualizar instructor') as Error & {
      response?: { status: number; data: any }
    }
    customError.response = { status: res.status, data: errorData }
    throw customError
  }

  return await res.json()
}

export async function eliminarInstructor(id: number) {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
  return await res.json()
}

export async function toggleActivo(id: number) {
  const res = await fetch(`${API_BASE}/${id}/toggle-activo`, { method: 'PUT' })
  return await res.json()
}
