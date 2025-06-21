const API_URL = 'http://localhost:3333/api/instrumentos'

export async function obtenerInstrumentos() {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Error al obtener los instrumentos')
  }
  return await response.json()
}
