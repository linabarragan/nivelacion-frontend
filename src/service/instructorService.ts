const API_BASE = 'http://localhost:3333/api/instructores'

export async function obtenerInstructores() {
  const res = await fetch(API_BASE)
  return await res.json()
}

export async function crearInstructor(payload: {
  nombre_completo: string
  instrumento_principal: string
}) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return await res.json()
}

export async function actualizarInstructor(
  id: number,
  payload: Partial<{
    nombre_completo: string
    instrumento_principal: string
    activo: boolean
  }>,
) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return await res.json()
}

export async function eliminarInstructor(id: number) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  })
  return await res.json()
}

export async function toggleActivo(id: number) {
  const res = await fetch(`${API_BASE}/${id}/toggle-activo`, {
    method: 'PUT',
  })
  return await res.json()
}
